/**
 * Simple in-memory rate limiter for API routes.
 * Uses a sliding window per IP address.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Clean stale entries every 5 minutes
setInterval(() => {
  const cutoff = Date.now() - 3_600_000; // 1 hour
  store.forEach((entry, key) => {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) store.delete(key);
  });
}, 300_000);

/**
 * Check whether the request should be rate-limited.
 * @returns `true` if the request is allowed, `false` if it exceeds the limit.
 */
export function rateLimit(
  ip: string,
  { maxRequests = 10, windowMs = 60_000 }: { maxRequests?: number; windowMs?: number } = {}
): boolean {
  const now = Date.now();
  const cutoff = now - windowMs;

  let entry = store.get(ip);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(ip, entry);
  }

  // Drop timestamps outside the window
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  if (entry.timestamps.length >= maxRequests) {
    return false; // rate limited
  }

  entry.timestamps.push(now);
  return true; // allowed
}
