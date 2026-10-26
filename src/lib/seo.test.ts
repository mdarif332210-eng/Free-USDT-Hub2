import test from 'node:test';
import assert from 'node:assert/strict';
import { PageSeoMetadata } from './seo';

test('PageSeoMetadata structure validates correctly', () => {
  const meta: PageSeoMetadata = {
    title: 'Free USDT Hub — Crypto Market',
    description: 'Explore live CoinGecko crypto market prices and verified earning guides.',
    keywords: 'Free USDT, earn USDT, crypto faucet, Binance Earn',
    canonicalUrl: 'https://freeusdthub.com/earn-usdt',
    ogType: 'website',
  };

  assert.ok(meta.title.includes('Free USDT Hub'));
  assert.ok(meta.description.includes('CoinGecko'));
  assert.ok(meta.keywords.includes('Binance Earn'));
  assert.equal(meta.ogType, 'website');
});
