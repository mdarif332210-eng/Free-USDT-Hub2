import test from 'node:test';
import assert from 'node:assert/strict';
import { formatUsd, formatCompactUsd, formatPercent, formatViews, sanitizeHtmlText } from './market-calculator';

test('formatUsd formats regular and fractional crypto prices correctly', () => {
  assert.equal(formatUsd(64500.5), '$64,500.50');
  assert.equal(formatUsd(0.9998, 4), '$0.9998');
  assert.equal(formatUsd(0.000045, 6), '$0.000045');
  assert.equal(formatUsd(null), '$0.00');
});

test('formatCompactUsd formats billions and millions correctly', () => {
  assert.equal(formatCompactUsd(1200000000000), '$1.20T');
  assert.equal(formatCompactUsd(85400000000), '$85.40B');
  assert.equal(formatCompactUsd(15000000), '$15.00M');
  assert.equal(formatCompactUsd(0), '$0');
});

test('formatPercent handles positive, negative, and zero values with correct signs', () => {
  assert.equal(formatPercent(4.256), '+4.26%');
  assert.equal(formatPercent(-2.1), '-2.10%');
  assert.equal(formatPercent(0), '0.00%');
  assert.equal(formatPercent(null), '0.00%');
});

test('formatViews generates correct singular, plural and compact view counts', () => {
  assert.equal(formatViews(0), '0 views');
  assert.equal(formatViews(1), '1 view');
  assert.equal(formatViews(1420), '1.4K views');
  assert.equal(formatViews(2500000), '2.5M views');
});

test('sanitizeHtmlText escapes critical XSS characters', () => {
  const unsafe = '<script>alert("test") & </script>';
  const safe = sanitizeHtmlText(unsafe);
  assert.equal(safe.includes('<script>'), false);
  assert.equal(safe.includes('&lt;script&gt;'), true);
});
