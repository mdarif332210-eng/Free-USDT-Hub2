import test from 'node:test';
import assert from 'node:assert/strict';
import { isEarningAnnouncement, classifyBinanceAnnouncement } from './news-importer';

test('isEarningAnnouncement detects earning and rewards keywords correctly', () => {
  assert.equal(isEarningAnnouncement('Trade Axis Robotics and Share $200K Worth of Rewards', 93), true);
  assert.equal(isEarningAnnouncement('Earn LAYER With Retroactive BNB Simple Earn Subscriptions', 128), true);
  assert.equal(isEarningAnnouncement('Binance Megadrop: Subscribe to BNB to Earn New Tokens', 49), true);
  assert.equal(isEarningAnnouncement('Binance Will Support Filecoin Network Upgrade', 157), false);
});

test('classifyBinanceAnnouncement assigns correct categories and tags', () => {
  const earningItem = {
    title: 'Halloween Pumpkin Frenzy: Trade, Earn and Invite Friends to Share a $1.7M Prize Pool',
    catalogId: 93,
    catalogName: 'Latest Activities',
  };
  const classification = classifyBinanceAnnouncement(earningItem.title, earningItem.catalogId, earningItem.catalogName);

  assert.equal(classification.categorySlug, 'binance-earn');
  assert.equal(classification.categoryName, 'Binance Earn & Rewards');
  assert.equal(classification.isEarning, true);
  assert.ok(classification.tags.includes('Binance Earn'));
});
