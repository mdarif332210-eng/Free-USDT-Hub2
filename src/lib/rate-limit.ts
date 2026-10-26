/**
 * In-memory sliding-window rate limiter and visit throttle.
 * Prevents view counter inflation and contact form spam.
 */

interface RateLimitRecord {
  timestamps: number[];
}

export class SlidingWindowRateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  public check(key: string): { allowed: boolean; remaining: number; resetMs: number } {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    let record = this.records.get(key);
    if (!record) {
      record = { timestamps: [] };
      this.records.set(key, record);
    }

    // Filter out expired timestamps
    record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

    if (record.timestamps.length >= this.maxRequests) {
      const oldest = record.timestamps[0];
      const resetMs = oldest + this.windowMs - now;
      return { allowed: false, remaining: 0, resetMs: Math.max(0, resetMs) };
    }

    record.timestamps.push(now);
    return {
      allowed: true,
      remaining: this.maxRequests - record.timestamps.length,
      resetMs: this.windowMs,
    };
  }

  public reset(key: string): void {
    this.records.delete(key);
  }
}

/**
 * Visit throttle map for views counter:
 * Only allows 1 view per IP/User-Agent per post slug every 10 minutes.
 */
export class PostViewThrottler {
  private recentViews = new Map<string, number>();
  private throttleWindowMs: number;

  constructor(throttleWindowMs: number = 10 * 60 * 1000) {
    this.throttleWindowMs = throttleWindowMs;
  }

  public canCountView(slug: string, identifier: string): boolean {
    const key = `${slug}:${identifier}`;
    const now = Date.now();
    const last = this.recentViews.get(key);

    if (last && now - last < this.throttleWindowMs) {
      return false; // Throttled
    }

    this.recentViews.set(key, now);
    // Cleanup old keys periodically
    if (this.recentViews.size > 10000) {
      for (const [k, time] of this.recentViews.entries()) {
        if (now - time > this.throttleWindowMs) {
          this.recentViews.delete(k);
        }
      }
    }
    return true;
  }
}

export const contactRateLimiter = new SlidingWindowRateLimiter(60000, 5); // 5 messages per minute max
export const viewRateLimiter = new PostViewThrottler(10 * 60 * 1000); // 1 view per 10 mins per post
