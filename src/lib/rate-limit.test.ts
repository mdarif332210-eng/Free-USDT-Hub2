import test from 'node:test';
import assert from 'node:assert/strict';
import { SlidingWindowRateLimiter, PostViewThrottler } from './rate-limit';

test('SlidingWindowRateLimiter limits after exceeding max requests', () => {
  const limiter = new SlidingWindowRateLimiter(1000, 3);
  const ip = '192.168.1.1';

  assert.equal(limiter.check(ip).allowed, true);
  assert.equal(limiter.check(ip).allowed, true);
  assert.equal(limiter.check(ip).allowed, true);
  // 4th request must be blocked
  assert.equal(limiter.check(ip).allowed, false);
});

test('PostViewThrottler throttles repeat view increments for same slug & user', () => {
  const throttler = new PostViewThrottler(5000); // 5 sec window
  const slug = 'what-is-usdt';
  const user = 'user-token-abc';

  // First view is counted
  assert.equal(throttler.canCountView(slug, user), true);
  // Second immediate view is throttled
  assert.equal(throttler.canCountView(slug, user), false);
  // Different slug is allowed
  assert.equal(throttler.canCountView('crypto-faucet-guide', user), true);
});
