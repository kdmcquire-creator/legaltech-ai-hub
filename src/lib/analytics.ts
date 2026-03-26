// Click tracking data stored in flat-file JSON pattern
// On Cloudflare Workers, this will use KV or a simple JSON approach
// For now, log to console (visible in Cloudflare Workers logs)

export interface ClickEvent {
  slug: string;
  destination: string;
  referrer: string | null;
  userAgent: string | null;
  timestamp: string;
  ip: string | null;
}

export function logAffiliateClick(event: ClickEvent): void {
  // In production on Cloudflare Workers, this would write to KV or D1
  // For now, structured logging that Cloudflare captures
  console.log(
    JSON.stringify({
      type: "affiliate_click",
      ...event,
    })
  );
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
