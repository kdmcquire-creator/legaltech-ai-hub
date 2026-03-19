/**
 * Cloudflare Worker scheduled event handler.
 *
 * Maps cron triggers (defined in wrangler.jsonc) to the corresponding
 * Next.js API routes by making internal fetch calls via the worker's
 * own WORKER_SELF_REFERENCE service binding.
 *
 * Cron schedule:
 *   "0 15 * * 3"   → /api/cron/send-newsletter  (Wed 10 AM ET)
 *   "0 12 * * *"   → /api/cron/crawl-news        (Daily noon UTC)
 *   "0 * /6 * * *" → /api/cron/check-emails       (Every 6 hours)
 */

// Cloudflare Worker types (inline to avoid @cloudflare/workers-types dependency)
interface ScheduledController {
  cron: string;
  scheduledTime: number;
  noRetry: () => void;
}

interface ExecutionContext {
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
}

interface Env {
  WORKER_SELF_REFERENCE: { fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response> };
  CRON_SECRET?: string;
  ADMIN_API_KEY?: string;
}

const CRON_ROUTES: Record<string, string> = {
  "0 15 * * 3": "/api/cron/send-newsletter",
  "0 12 * * *": "/api/cron/crawl-news",
  "0 */6 * * *": "/api/cron/check-emails",
};

export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ) {
    const route = CRON_ROUTES[controller.cron];
    if (!route) {
      console.error(`Unknown cron schedule: ${controller.cron}`);
      return;
    }

    const authToken = env.CRON_SECRET || env.ADMIN_API_KEY;
    if (!authToken) {
      console.error("No CRON_SECRET or ADMIN_API_KEY configured");
      return;
    }

    const url = `https://legaltech-ai-hub.com${route}`;
    console.log(`Cron [${controller.cron}] → ${route}`);

    try {
      const res = await env.WORKER_SELF_REFERENCE.fetch(url, {
        headers: {
          "x-cron-secret": authToken,
        },
      });

      const body = await res.text();
      console.log(`Cron [${controller.cron}] response ${res.status}: ${body}`);
    } catch (err) {
      console.error(`Cron [${controller.cron}] failed:`, err);
    }
  },
};
