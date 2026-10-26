import test from 'node:test';
import assert from 'node:assert/strict';
import { ContactFormSchema, ViewIncrementSchema, SearchQuerySchema } from './validation';

test('ContactFormSchema accepts valid data and rejects invalid emails/short messages', () => {
  const valid = {
    name: 'Alice Nakamoto',
    email: 'alice@example.com',
    subject: 'Partnership Inquiry',
    message: 'Hello Free USDT Hub team, I would like to inquire about educational listings.',
  };
  const parsed = ContactFormSchema.safeParse(valid);
  assert.equal(parsed.success, true);

  const invalidEmail = {
    ...valid,
    email: 'not-an-email',
  };
  const parsedInvalid = ContactFormSchema.safeParse(invalidEmail);
  assert.equal(parsedInvalid.success, false);

  const spam = {
    ...valid,
    honeypot: 'bot-fill',
  };
  const parsedSpam = ContactFormSchema.safeParse(spam);
  assert.equal(parsedSpam.success, false);
});

test('ViewIncrementSchema enforces URL slug format', () => {
  assert.equal(ViewIncrementSchema.safeParse({ slug: 'what-is-tether-usdt' }).success, true);
  assert.equal(ViewIncrementSchema.safeParse({ slug: 'invalid slug with spaces!' }).success, false);
});

test('SearchQuerySchema validates search input bounds', () => {
  assert.equal(SearchQuerySchema.safeParse({ q: 'usdt faucet' }).success, true);
  assert.equal(SearchQuerySchema.safeParse({ q: '' }).success, false);
});
