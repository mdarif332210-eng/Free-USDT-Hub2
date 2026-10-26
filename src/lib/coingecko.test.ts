import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeApiKey } from './coingecko';

test('sanitizeApiKey strips unicode characters > 255 (like word joiner 8288)', () => {
  // Character 8288 (\u2060) at end of string
  const dirtyKey = 'CG-demo-key-123\u2060';
  const clean = sanitizeApiKey(dirtyKey);
  assert.equal(clean, 'CG-demo-key-123');
});

test('sanitizeApiKey rejects full URL mistakenly passed as API key', () => {
  const urlKey = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd\u2060';
  assert.equal(sanitizeApiKey(urlKey), null);
});

test('sanitizeApiKey rejects placeholder and empty strings', () => {
  assert.equal(sanitizeApiKey(''), null);
  assert.equal(sanitizeApiKey('replace_with_real_key'), null);
  assert.equal(sanitizeApiKey(undefined), null);
});

test('sanitizeApiKey preserves valid clean CoinGecko keys', () => {
  assert.equal(sanitizeApiKey('CG-a8f9b2c3d4e5f6'), 'CG-a8f9b2c3d4e5f6');
});
