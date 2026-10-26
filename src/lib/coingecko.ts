/**
 * CoinGecko Market Data Client with Caching, Timeouts, and Resilient Fallbacks.
 * Never exposes API keys to client-side code.
 */

import { CoinData, INITIAL_COINS } from './db';

interface CacheEntry {
  data: CoinData[];
  timestamp: number;
}

const CACHE_TTL_MS = 60 * 1000; // 1-minute server-side cache window
let memoryCache: CacheEntry | null = null;

export function sanitizeApiKey(key?: string): string | null {
  if (!key) return null;
  // Strip any non-ASCII character, control character, or invisible word joiner (e.g. unicode 8288 / \u2060)
  const cleaned = key.replace(/[^\x20-\x7E]/g, '').trim();

  // If empty, placeholder, or mistakenly set to a full URL, do not use as header
  if (
    !cleaned ||
    cleaned === 'replace_with_real_key' ||
    cleaned.startsWith('http://') ||
    cleaned.startsWith('https://')
  ) {
    return null;
  }
  return cleaned;
}

export async function fetchCoinGeckoMarketData(apiKey?: string): Promise<{
  coins: CoinData[];
  isLive: boolean;
  lastUpdated: string;
  source: 'live' | 'cache' | 'fallback';
}> {
  const now = Date.now();

  // 1. Check valid memory cache
  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return {
      coins: memoryCache.data,
      isLive: true,
      lastUpdated: new Date(memoryCache.timestamp).toISOString(),
      source: 'cache',
    };
  }

  // 2. Fetch fresh data from CoinGecko API
  const ids = 'bitcoin,ethereum,tether,binancecoin,solana,ripple,dogecoin,cardano,avalanche-2,tron,polkadot,chainlink';
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h`;

  try {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'User-Agent': 'FreeUSDTHub/1.0',
    };

    const cleanKey = sanitizeApiKey(apiKey);
    if (cleanKey) {
      if (cleanKey.startsWith('CG-')) {
        headers['x-cg-demo-api-key'] = cleanKey;
      } else {
        headers['x-cg-pro-api-key'] = cleanKey;
      }
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(url, {
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[CoinGecko] API responded with status ${res.status}`);
      // Fallback to cache or initial seed
      if (memoryCache) {
        return {
          coins: memoryCache.data,
          isLive: false,
          lastUpdated: new Date(memoryCache.timestamp).toISOString(),
          source: 'cache',
        };
      }
      return {
        coins: INITIAL_COINS,
        isLive: false,
        lastUpdated: new Date().toISOString(),
        source: 'fallback',
      };
    }

    const rawData = await res.json();
    if (Array.isArray(rawData) && rawData.length > 0) {
      const parsedCoins: CoinData[] = rawData.map((item: any) => ({
        id: item.id,
        symbol: (item.symbol || '').toUpperCase(),
        name: item.name,
        image: item.image,
        marketCapRank: item.market_cap_rank || 0,
        currentPrice: item.current_price || 0,
        priceChange24h: item.price_change_percentage_24h || 0,
        marketCap: item.market_cap || 0,
        totalVolume: item.total_volume || 0,
        high24h: item.high_24h || item.current_price,
        low24h: item.low_24h || item.current_price,
        circulatingSupply: item.circulating_supply || 0,
        totalSupply: item.total_supply || null,
        sparkline: item.sparkline_in_7d?.price ? item.sparkline_in_7d.price.slice(-20) : [],
        lastUpdated: item.last_updated || new Date().toISOString(),
      }));

      memoryCache = {
        data: parsedCoins,
        timestamp: now,
      };

      return {
        coins: parsedCoins,
        isLive: true,
        lastUpdated: new Date(now).toISOString(),
        source: 'live',
      };
    }
  } catch (err: any) {
    console.warn('[CoinGecko] Fetch error:', err.message || err);
  }

  // Graceful fallback
  if (memoryCache) {
    return {
      coins: memoryCache.data,
      isLive: false,
      lastUpdated: new Date(memoryCache.timestamp).toISOString(),
      source: 'cache',
    };
  }

  return {
    coins: INITIAL_COINS,
    isLive: false,
    lastUpdated: new Date().toISOString(),
    source: 'fallback',
  };
}
