import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface ClickEvent {
  slug: string;
  destination: string;
  referrer: string | null;
  userAgent: string | null;
  timestamp: string;
  ip: string | null;
}

interface WorkerEnv {
  AFFILIATE_CLICKS: KVNamespace;
}

export function logAffiliateClick(event: ClickEvent): void {
  console.log(JSON.stringify({ type: "affiliate_click", site: "lt", ...event }));
}

export async function persistAffiliateClick(event: ClickEvent): Promise<void> {
  try {
    const { env } = getCloudflareContext<WorkerEnv>();
    const date = event.timestamp.slice(0, 10);
    const key = `lt:${date}:${event.slug}:${Date.now()}`;
    await env.AFFILIATE_CLICKS.put(key, JSON.stringify(event), {
      expirationTtl: 7776000, // 90 days
    });
  } catch {
    // KV unavailable in local dev — already logged via console
  }
}

// Client-side GA4 event helpers
// These are used in client components to push events to the dataLayer

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

// Pre-defined event helpers
export function trackAffiliateClick(
  toolSlug: string,
  source: string
): void {
  trackEvent("affiliate_click", {
    tool_slug: toolSlug,
    click_source: source,
  });
}

export function trackToolView(toolSlug: string, category: string): void {
  trackEvent("tool_view", {
    tool_slug: toolSlug,
    tool_category: category,
  });
}

export function trackCategoryBrowse(categorySlug: string): void {
  trackEvent("category_browse", {
    category_slug: categorySlug,
  });
}

export function trackNewsletterSignup(source: string): void {
  trackEvent("newsletter_signup", {
    signup_source: source,
  });
}

// Legaltech-specific event helpers
export function trackCaseStudyView(slug: string): void {
  trackEvent("case_study_view", {
    case_study_slug: slug,
  });
}

export function trackGuideView(slug: string): void {
  trackEvent("guide_view", {
    guide_slug: slug,
  });
}

export function trackGlossaryView(term: string): void {
  trackEvent("glossary_view", {
    glossary_term: term,
  });
}
