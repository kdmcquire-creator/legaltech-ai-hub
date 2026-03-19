/**
 * Cloudflare Worker scheduled event handler.
 *
 * Uses a single cron trigger ("0 * /6 * * *") to stay within the free-plan
 * limit of 5 cron triggers per account. Dispatches tasks based on current
 * day/time:
 *
 *   Every run (4x daily):
 *     - /api/cron/crawl-news
 *     - /api/cron/check-emails
 *
 *   Wednesday 12:00 UTC run only (~10 AM ET):
 *     - /api/cron/send-newsletter
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

async function callRoute(env: Env, route: string, authToken: string): Promise<void> {
  const url = `https://legaltech-ai-hub.com${route}`;
  console.log(`Cron → ${route}`);
  try {
    const res = await env.WORKER_SELF_REFERENCE.fetch(url, {
      headers: { "x-cron-secret": authToken },
    });
    const body = await res.text();
    console.log(`${route} response ${res.status}: ${body}`);
  } catch (err) {
    console.error(`${route} failed:`, err);
  }
}

export default {
  async scheduled(
    controller: ScheduledController,
    env: Env,
    ctx: ExecutionContext
  ) {
    const authToken = env.CRON_SECRET || env.ADMIN_API_KEY;
    if (!authToken) {
      console.error("No CRON_SECRET or ADMIN_API_KEY configured");
      return;
    }

    const now = new Date(controller.scheduledTime);
    const utcHour = now.getUTCHours();
    const utcDay = now.getUTCDay(); // 0=Sun, 3=Wed

    // These run every 6 hours (4x daily)
    const tasks: Promise<void>[] = [
      callRoute(env, "/api/cron/crawl-news", authToken),
      callRoute(env, "/api/cron/check-emails", authToken),
    ];

    // Newsletter: Wednesday at 12:00 UTC (closest 6-hour slot to 15:00 UTC / 10 AM ET)
    if (utcDay === 3 && utcHour === 12) {
      tasks.push(callRoute(env, "/api/cron/send-newsletter", authToken));
    }

    ctx.waitUntil(Promise.all(tasks));
  },
};
