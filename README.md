# Free USDT Hub — Production Deployment & Architecture Guide

**Free USDT Hub** is a full-stack cryptocurrency intelligence and verified earning portal. It combines real-time CoinGecko market data, an audited directory of USDT earning opportunities (faucets, microtasks, learn & earn), auto-curated crypto news, MySQL database schema, dynamic XML sitemaps, and official Monetag ad integration.

---

## 1. Technology Architecture

- **Frontend**: React 19 + TypeScript + Tailwind CSS (v4) with custom Neumorphic styling tokens (`#EEF0F5`, `#6C3BDB`, soft white cards, inset and raised shadows).
- **Backend**: Node.js + Express API server (`server.ts`) with Vite middleware in development and static asset serving in production.
- **Database**: MySQL 8.0+ / MariaDB 10.5+ with Prisma ORM schema (`prisma/schema.prisma`) and raw migration script (`prisma/migrations/0001_init/migration.sql`).
- **Cryptocurrency API**: Server-side CoinGecko proxy with in-memory caching and resilient fallbacks (never exposes API keys to client-side code).
- **Monetag Integration**: Native meta verification (`6403520c5cf5d7c84f05b9b0223f05c7`) and reusable `MonetagSlot` container components for compliant banner, native, and in-page push formats.
- **View Counting**: Atomic view counter with IP/User-Agent sliding-window rate limiting, bot filtering, and 10-minute repeat throttle per article.

---

## 2. Environment Configuration

Create a `.env` file in the root directory based on `.env.example`:

```bash
# Server & App URL
PORT=3000
APP_URL=https://freeusdthub.com

# Production MySQL Database
DATABASE_URL="mysql://db_user:StrongPassword123!@127.0.0.1:3306/free_usdt_hub"

# CoinGecko API (Optional Pro/Demo Key)
COINGECKO_API_KEY="your_coingecko_api_key_here"

# Monetag Verification
MONETAG_VERIFICATION_TAG="6403520c5cf5d7c84f05b9b0223f05c7"
```

---

## 3. Database Setup (MySQL)

### Step 1: Create Database
In MySQL shell or phpMyAdmin:
```sql
CREATE DATABASE free_usdt_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Step 2: Apply Migrations
You can apply the schema using Prisma:
```bash
npx prisma migrate deploy
```
Or execute the included raw SQL script directly in MySQL:
```bash
mysql -u db_user -p free_usdt_hub < prisma/migrations/0001_init/migration.sql
```

The schema provisions tables for:
- `articles`, `categories`, `tags`, `article_tags`
- `post_views` (atomic pageview counters)
- `coins`, `coin_market_cache`, `coin_snapshots`
- `news_sources`, `news_import_logs`
- `site_settings`, `seo_metadata`
- `contact_messages`, `newsletter_subscribers`, `audit_logs`

---

## 4. Monetag Publisher Verification & Setup

1. **Verification Meta Tag**: Already active in `<head>`:
   ```html
   <meta name="monetag" content="6403520c5cf5d7c84f05b9b0223f05c7" />
   ```
2. **Dashboard Verification**: Log in to your Monetag publisher dashboard, navigate to **Sites** -> **Add Site**, enter your domain, and click **Verify Meta Tag**.
3. **Ad Zones**: Once verified, create your desired ad zones (In-Page Push, OnClick Popunder, Vignette Banner).
4. **Inserting Scripts**: Provide zone IDs via `/api/settings/monetag` or place the official script tag into `index.html`.

---

## 5. Deployment Guide (Hostinger / VPS / Cloud Run)

### Requirements
- Node.js 20.x or 22.x LTS
- MySQL 8.0+ or MariaDB 10.5+
- Nginx reverse proxy with SSL (Let's Encrypt)

### Hostinger VPS / Ubuntu Node.js Setup
```bash
# 1. Clone repository
git clone https://github.com/your-username/free-usdt-hub.git /var/www/free-usdt-hub
cd /var/www/free-usdt-hub

# 2. Install dependencies
npm install

# 3. Build frontend bundle
npm run build

# 4. Start production server with PM2
npm install -g pm2
pm2 start server.ts --name "free-usdt-hub" --interpreter tsx -- --env production
pm2 save
pm2 startup
```

### Nginx Reverse Proxy Configuration
```nginx
server {
    listen 80;
    server_name freeusdthub.com www.freeusdthub.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name freeusdthub.com www.freeusdthub.com;

    ssl_certificate /etc/letsencrypt/live/freeusdthub.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/freeusdthub.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 6. Complete Route Map (All 22 Routes)

| Route | Description |
|---|---|
| `/` | Homepage (Hero, Live Market, Earning Guides, News, Blog, FAQ) |
| `/earn-usdt` | Verified Earning Opportunities Directory with category filters |
| `/free-crypto` | Free Crypto Educational Guide & Safety Charter |
| `/usdt-faucet` | Faucet Reality Check & Micropayment Architecture |
| `/crypto-tasks` | Task-Based Rewards & Micro-Survey Yield Matrix |
| `/crypto-market` | Cryptocurrency Market Overview with CoinGecko live data |
| `/coin/:id` | Individual Coin Detail (7-day chart, supply, highs/lows) |
| `/crypto-news` | Crypto News Listing & Binance official announcement sync |
| `/crypto-news/:slug` | Individual News Article with View Counter |
| `/blog` | Editorial Research & Wallet Security Blog |
| `/blog/:slug` | Individual Research Article with View Counter |
| `/category/:slug` | Category Archive |
| `/search` | Multi-Entity Search (Coins, Guides, Articles) |
| `/about` | About Free USDT Hub & Mission Statement |
| `/contact` | Working Public Contact Form (with Zod validation & anti-spam) |
| `/privacy-policy` | Privacy Policy (GDPR, Cookies & Monetag compliance) |
| `/terms` | Terms of Service |
| `/disclaimer` | Crypto & Financial Risk Disclaimer |
| `/editorial-policy` | Standards of Journalism & Guide Audit Criteria |
| `/advertising-disclosure` | Advertising Disclosure & Monetag Verification Statement |
| `/sitemap.xml` | Dynamic XML Sitemap (served automatically) |
| `/robots.txt` | Search Engine Crawling Directives |
