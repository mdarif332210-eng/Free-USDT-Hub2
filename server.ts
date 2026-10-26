import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './src/lib/db';
import { fetchCoinGeckoMarketData } from './src/lib/coingecko';
import { ContactFormSchema, NewsletterSchema, ViewIncrementSchema } from './src/lib/validation';
import { contactRateLimiter, viewRateLimiter } from './src/lib/rate-limit';
import { syncBinanceAnnouncements, initBackgroundAutoPoster, getAutoSyncStatus } from './src/lib/news-importer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

// API: Market Data Proxy
app.get('/api/market', async (req, res) => {
  try {
    const apiKey = process.env.COINGECKO_API_KEY;
    const result = await fetchCoinGeckoMarketData(apiKey);
    // Update local cache in DB
    db.updateCoins(result.coins);

    res.json({
      success: true,
      coins: result.coins,
      isLive: result.isLive,
      source: result.source,
      lastUpdated: result.lastUpdated,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cryptocurrency market data',
      coins: db.getCoins(),
      lastUpdated: db.getLastMarketUpdate(),
    });
  }
});

// API: Individual Coin Detail
app.get('/api/market/coins/:id', (req, res) => {
  const coin = db.getCoinById(req.params.id);
  if (!coin) {
    return res.status(404).json({ success: false, message: 'Coin not found in directory' });
  }
  res.json({ success: true, coin });
});

// API: View Counter (GET & POST)
app.get('/api/posts/:slug/views', (req, res) => {
  const views = db.getViews(req.params.slug);
  res.json({ success: true, slug: req.params.slug, views });
});

app.post('/api/posts/:slug/views', (req, res) => {
  const { slug } = req.params;
  const validation = ViewIncrementSchema.safeParse({ slug });
  if (!validation.success) {
    return res.status(400).json({ success: false, errors: validation.error.format() });
  }

  // Filter bots by User-Agent
  const userAgent = req.headers['user-agent'] || '';
  const isBot = /bot|crawl|spider|slurp|facebookexternalhit|bingbot/i.test(userAgent);

  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  const clientIdentifier = `${ip}-${userAgent.slice(0, 50)}`;

  if (isBot) {
    return res.json({ success: true, views: db.getViews(slug), counted: false });
  }

  if (!viewRateLimiter.canCountView(slug, clientIdentifier)) {
    // Throttled (already viewed within 10 minutes)
    return res.json({ success: true, views: db.getViews(slug), counted: false });
  }

  const newCount = db.incrementView(slug);
  res.json({ success: true, slug, views: newCount, counted: true });
});

// API: Contact Form Submission
app.post('/api/contact', (req, res) => {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
  const rateCheck = contactRateLimiter.check(ip);

  if (!rateCheck.allowed) {
    return res.status(429).json({
      success: false,
      message: 'Too many messages submitted from this connection. Please wait a minute before trying again.',
    });
  }

  const result = ContactFormSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input. Please correct highlighted fields.',
      errors: result.error.flatten().fieldErrors,
    });
  }

  const record = db.addContactMessage({
    name: result.data.name,
    email: result.data.email,
    subject: result.data.subject,
    message: result.data.message,
    ipAddress: ip,
  });

  res.json({
    success: true,
    message: 'Thank you for reaching out. Your message has been received by the Free USDT Hub editorial desk.',
    id: record.id,
  });
});

// API: Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
  const result = NewsletterSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  res.json({
    success: true,
    message: 'You have been successfully subscribed to Free USDT Hub market & guide updates.',
  });
});

// API: News Listing & Filtering
app.get('/api/news', (req, res) => {
  const category = (req.query.category as string) || '';
  const type = (req.query.type as 'BLOG' | 'NEWS' | 'GUIDE') || undefined;

  let articles = db.getArticles(type);
  if (category && category !== 'All') {
    articles = articles.filter(
      (a) => a.categorySlug.toLowerCase() === category.toLowerCase() || a.categoryName.toLowerCase() === category.toLowerCase()
    );
  }
  res.json({ success: true, articles });
});

// API: Auto-Sync Status
app.get('/api/news/auto-sync-status', (req, res) => {
  res.json({ success: true, status: getAutoSyncStatus() });
});

// API: News Sync Trigger
app.post('/api/news/sync', async (req, res) => {
  try {
    const syncResult = await syncBinanceAnnouncements();
    res.json({ success: true, result: syncResult, status: getAutoSyncStatus() });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message || 'Failed to sync news' });
  }
});

// API: Monetag Configuration
app.get('/api/settings/monetag', (req, res) => {
  res.json({ success: true, config: db.getMonetagConfig() });
});

app.post('/api/settings/monetag', (req, res) => {
  const updated = db.updateMonetagConfig(req.body);
  res.json({ success: true, config: updated });
});

// Dynamic Sitemap: /sitemap.xml
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = process.env.APP_URL || `http://localhost:${PORT}`;
  const staticRoutes = [
    '',
    '/earn-usdt',
    '/free-crypto',
    '/usdt-faucet',
    '/crypto-tasks',
    '/crypto-market',
    '/crypto-news',
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/editorial-policy',
    '/advertising-disclosure',
  ];

  const articles = db.getArticles().filter((a) => a.status === 'PUBLISHED');
  const coins = db.getCoins();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static URLs
  for (const route of staticRoutes) {
    xml += `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  }

  // Articles & News URLs
  for (const a of articles) {
    const pathPrefix = a.type === 'NEWS' ? '/crypto-news' : '/blog';
    xml += `  <url>\n    <loc>${baseUrl}${pathPrefix}/${a.slug}</loc>\n    <lastmod>${a.publishedAt.split('T')[0]}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  }

  // Coins URLs
  for (const c of coins) {
    xml += `  <url>\n    <loc>${baseUrl}/coin/${c.id}</loc>\n    <changefreq>hourly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  }

  xml += `</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// Robots: /robots.txt
app.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.APP_URL || `http://localhost:${PORT}`;
  const robots = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  // Initialize automatic background poster for Binance earning news & announcements (every 15 mins)
  initBackgroundAutoPoster(15 * 60 * 1000);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Free USDT Hub] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
