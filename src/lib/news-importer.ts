/**
 * Crypto News and Binance Official Announcements Auto-Poster & Importer.
 * Automatically ingests, classifies, and posts official Binance earning news,
 * rewards, airdrops, and activities with full attribution and deduplication.
 */

import { ArticleItem, EarningGuideItem, db } from './db';

export interface NewsSyncResult {
  source: string;
  itemsFound: number;
  itemsImported: number;
  earningNewsImported: number;
  duplicatesSkipped: number;
  timestamp: string;
}

export interface AutoSyncStatus {
  isActive: boolean;
  intervalMinutes: number;
  lastSyncTime: string | null;
  totalImported: number;
  totalEarningNews: number;
  lastBatchImported: number;
  statusMessage: string;
}

let syncState: AutoSyncStatus = {
  isActive: true,
  intervalMinutes: 15,
  lastSyncTime: null,
  totalImported: 0,
  totalEarningNews: 0,
  lastBatchImported: 0,
  statusMessage: 'Auto-sync active (Every 15 minutes)',
};

const EARNING_KEYWORDS = [
  'earn',
  'reward',
  'airdrop',
  'prize',
  'pool',
  'simple earn',
  'launchpool',
  'megadrop',
  'competition',
  'voucher',
  'giveaway',
  'learn & earn',
  'staking',
  'cashback',
  'usdt',
  'bonus',
  'frenzy',
];

export function isEarningAnnouncement(title: string, catalogId?: number): boolean {
  if (catalogId === 93 || catalogId === 128) {
    // 93 = Latest Activities, 128 = Crypto Airdrop in Binance CMS
    return true;
  }
  const lower = title.toLowerCase();
  return EARNING_KEYWORDS.some((kw) => lower.includes(kw));
}

export function classifyBinanceAnnouncement(
  title: string,
  catalogId?: number,
  catalogName?: string
): {
  categorySlug: string;
  categoryName: string;
  isEarning: boolean;
  tags: string[];
} {
  const isEarning = isEarningAnnouncement(title, catalogId);

  if (isEarning) {
    return {
      categorySlug: 'binance-earn',
      categoryName: 'Binance Earn & Rewards',
      isEarning: true,
      tags: ['Binance Earn', 'Rewards', 'Airdrops', 'Promotions'],
    };
  }

  if (catalogId === 48 || title.toLowerCase().includes('listing')) {
    return {
      categorySlug: 'new-listings',
      categoryName: 'New Listings',
      isEarning: false,
      tags: ['Binance', 'Listings', 'Crypto Market'],
    };
  }

  return {
    categorySlug: 'exchange-announcements',
    categoryName: 'Exchange Announcements',
    isEarning: false,
    tags: ['Binance', 'Announcements', 'Compliance'],
  };
}

export function getAutoSyncStatus(): AutoSyncStatus {
  return { ...syncState };
}

export async function syncBinanceAnnouncements(): Promise<NewsSyncResult> {
  const sourceName = 'Binance Official';
  const feedUrl =
    'https://www.binance.com/bapi/composite/v1/public/cms/article/list/query?type=1&pageSize=20&pageNo=1';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    const res = await fetch(feedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'FreeUSDTHubNewsBot/1.0',
        Accept: 'application/json',
      },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const catalogs = data?.data?.catalogs || [];
      let totalFound = 0;
      let importedCount = 0;
      let earningCount = 0;
      let dupCount = 0;

      for (const catalog of catalogs) {
        const articles = catalog.articles || [];
        totalFound += articles.length;

        for (const item of articles) {
          if (!item.title || !item.code) continue;
          const slug = `binance-${item.code}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
          const existing = db.getArticleBySlug(slug);

          if (existing) {
            dupCount++;
            continue;
          }

          const classification = classifyBinanceAnnouncement(
            item.title,
            catalog.catalogId,
            catalog.catalogName
          );

          const publishedIso = item.releaseDate
            ? new Date(item.releaseDate).toISOString()
            : new Date().toISOString();

          const announcementUrl = `https://www.binance.com/en/support/announcement/${item.code}`;

          // Format clean, informative editorial content
          const content = `${item.title}

Official announcement published by ${sourceName} under catalog: "${catalog.catalogName || 'General'}".

### Key Announcement Details
- **Subject**: ${item.title}
- **Category**: ${classification.categoryName}
- **Verification**: Sourced directly from official Binance CMS Feed.
- **Original Document**: Direct access available at the verified source link below.

${
  classification.isEarning
    ? `### Earning & Participation Guidance
This official promotion or activity offers verified reward mechanisms (e.g., prize pool allocations, Simple Earn APR boosts, or retroactive airdrop allocations). 
Always verify participation terms, eligible jurisdictions, and KYC requirements on the official Binance announcement page before entering.`
    : `### Compliance & Security Notice
Ensure you are accessing verified Binance domains. Free USDT Hub never asks for your private keys, account credentials, or advance fees.`
}

Source: ${sourceName} Announcements Feed. Original reporting preserved with direct attribution.`;

          const newArticle: ArticleItem = {
            id: `binance-${item.code}`,
            slug,
            title: item.title,
            summary: item.title,
            content,
            featuredImage: classification.isEarning
              ? '/src/assets/images/earning_guide_usdt_1793018439870.jpg'
              : '/src/assets/images/market_analytics_mesh_1793018440388.jpg',
            type: 'NEWS',
            status: 'PUBLISHED',
            categorySlug: classification.categorySlug,
            categoryName: classification.categoryName,
            authorName: 'Binance News Desk',
            publishedAt: publishedIso,
            sourceUrl: announcementUrl,
            sourceName,
            tags: classification.tags,
          };

          // Auto-post into articles store
          const all = db.getArticles();
          all.unshift(newArticle);
          importedCount++;

          if (classification.isEarning) {
            earningCount++;
            // If it's a major reward/earning campaign, also bridge into Earning Guides
            const guideSlug = `binance-earn-${item.code}`.slice(0, 80);
            if (!db.getGuideBySlug(guideSlug)) {
              const newGuide: EarningGuideItem = {
                id: `guide-auto-${item.code}`,
                slug: guideSlug,
                title: item.title,
                provider: 'Binance Official',
                description: `Official Binance reward activity: ${item.title}. Verified directly from Binance announcement wire.`,
                rewardType: 'USDT / Token Rewards / Prize Pool',
                rewardRange: 'Varies by campaign terms',
                eligibility: 'KYC Verified Binance Accounts in eligible jurisdictions',
                supportedCountries: 'Global (Subject to regional exchange restrictions)',
                withdrawalThreshold: 'Direct account credit',
                fees: 'Zero fee for promotional reward distribution',
                officialSource: announcementUrl,
                lastVerifiedDate: publishedIso.split('T')[0],
                riskInformation: 'Promotional reward pools are finite. Check official campaign end date.',
                status: 'Active',
                category: item.title.toLowerCase().includes('airdrop') ? 'Airdrops' : 'Learn & Earn',
              };
              const guides = db.getEarningGuides();
              guides.unshift(newGuide);
            }
          }
        }
      }

      // Update sync state
      syncState = {
        ...syncState,
        lastSyncTime: new Date().toISOString(),
        totalImported: syncState.totalImported + importedCount,
        totalEarningNews: syncState.totalEarningNews + earningCount,
        lastBatchImported: importedCount,
        statusMessage: `Auto-sync active: ${importedCount} newly posted (${earningCount} earning campaigns). Next check in 15 mins.`,
      };

      return {
        source: sourceName,
        itemsFound: totalFound,
        itemsImported: importedCount,
        earningNewsImported: earningCount,
        duplicatesSkipped: dupCount,
        timestamp: syncState.lastSyncTime,
      };
    }
  } catch (err: any) {
    console.warn('[NewsImporter] Binance feed sync error:', err.message || err);
    syncState.statusMessage = 'Sync error, retrying on next cycle.';
  }

  return {
    source: sourceName,
    itemsFound: 0,
    itemsImported: 0,
    earningNewsImported: 0,
    duplicatesSkipped: 0,
    timestamp: new Date().toISOString(),
  };
}

let autoSyncTimer: NodeJS.Timeout | null = null;

export function initBackgroundAutoPoster(intervalMs: number = 15 * 60 * 1000): void {
  if (autoSyncTimer) return;

  // Run immediate sync on start
  syncBinanceAnnouncements().then((res) => {
    console.log(
      `[AutoPoster] Initial Binance sync completed: ${res.itemsImported} imported (${res.earningNewsImported} earning news).`
    );
  });

  // Schedule recurring sync
  autoSyncTimer = setInterval(async () => {
    try {
      const res = await syncBinanceAnnouncements();
      console.log(
        `[AutoPoster] Scheduled Binance sync: ${res.itemsImported} imported (${res.earningNewsImported} earning news).`
      );
    } catch (err) {
      console.error('[AutoPoster] Background sync error:', err);
    }
  }, intervalMs);
}
