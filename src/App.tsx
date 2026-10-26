import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { EarnUsdtPage } from './pages/EarnUsdtPage';
import { FreeCryptoPage } from './pages/FreeCryptoPage';
import { UsdtFaucetPage } from './pages/UsdtFaucetPage';
import { CryptoTasksPage } from './pages/CryptoTasksPage';
import { CryptoMarketPage } from './pages/CryptoMarketPage';
import { CoinDetailPage } from './pages/CoinDetailPage';
import { CryptoNewsPage } from './pages/CryptoNewsPage';
import { BlogPage } from './pages/BlogPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPages';
import { NotFoundPage } from './pages/NotFoundPage';
import { updatePageSeo } from './lib/seo';
import {
  db,
  CoinData,
  ArticleItem,
  EarningGuideItem,
  INITIAL_COINS,
  INITIAL_EARNING_GUIDES,
  INITIAL_BLOG_ARTICLES,
  INITIAL_NEWS_ARTICLES,
} from './lib/db';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [coins, setCoins] = useState<CoinData[]>(INITIAL_COINS);
  const [lastMarketUpdate, setLastMarketUpdate] = useState<string>(new Date().toISOString());
  const [isRefreshingMarket, setIsRefreshingMarket] = useState<boolean>(false);

  const [guides, setGuides] = useState<EarningGuideItem[]>(() => db.getEarningGuides());
  const [articles, setArticles] = useState<ArticleItem[]>(() => db.getArticles());

  const blogArticles: ArticleItem[] = articles.filter((a) => a.type === 'BLOG');
  const newsArticles: ArticleItem[] = articles.filter((a) => a.type === 'NEWS');

  const refreshContent = async () => {
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (data.success && Array.isArray(data.articles)) {
        setArticles(data.articles);
      } else {
        setArticles([...db.getArticles()]);
      }
    } catch {
      setArticles([...db.getArticles()]);
    }
    setGuides([...db.getEarningGuides()]);
  };

  // Handle URL changes & back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith('http') || path.endsWith('.xml') || path.endsWith('.txt')) {
      window.location.href = path;
      return;
    }
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch live CoinGecko market data from server proxy
  const fetchMarketData = async () => {
    setIsRefreshingMarket(true);
    try {
      const res = await fetch('/api/market');
      const data = await res.json();
      if (data.success && Array.isArray(data.coins) && data.coins.length > 0) {
        setCoins(data.coins);
        setLastMarketUpdate(data.lastUpdated || new Date().toISOString());
      }
    } catch (err) {
      console.warn('Market fetch error, using local cached data', err);
    } finally {
      setIsRefreshingMarket(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    // Auto-refresh market data every 90 seconds
    const interval = setInterval(fetchMarketData, 90 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Update dynamic document title, meta description, keywords, OpenGraph, and Twitter tags
  useEffect(() => {
    let title = 'Free USDT Hub — Crypto Market, Earning Guides & Real-Time Insights';
    let description = 'Discover verified ways to earn free USDT, explore live CoinGecko crypto market prices, read auto-curated Binance earning news, and master crypto wallet security.';
    let keywords = 'Free USDT, earn USDT, crypto earning guides, Binance Earn, USDT faucet, crypto tasks, crypto market live, CoinGecko prices, crypto airdrops, Tether rewards';
    let ogType: 'website' | 'article' = 'website';

    if (currentPath === '/earn-usdt') {
      title = 'Earn USDT & Crypto Rewards Directory — Free USDT Hub';
      description = 'Browse 100% verified cryptocurrency earning opportunities, exchange learn & earn modules, microtasks, and sponsor faucets with documented withdrawal minimums.';
      keywords = 'earn USDT, free USDT directory, Binance Learn and Earn, crypto rewards, legit crypto tasks, earn crypto free, USDT airdrops';
    } else if (currentPath === '/free-crypto') {
      title = 'Free Crypto Guide: Reality Check & Safety — Free USDT Hub';
      description = 'Learn how free crypto promotional programs operate economically, calculate real hourly yields, and isolate burner wallets from smart-contract drainers.';
      keywords = 'free crypto guide, how to get free crypto, crypto earning safety, avoid crypto scams, burner wallet setup, web3 security';
    } else if (currentPath === '/usdt-faucet') {
      title = 'USDT Faucet Reality Check & Micropayments — Free USDT Hub';
      description = 'Realistic breakdown of USDT faucets, micropayment aggregators, batch gas mechanics, and warnings against fraudulent upfront deposit faucets.';
      keywords = 'USDT faucet, Tether faucet, free USDT claims, FaucetPay USDT, crypto micropayments, faucet reality check, free bitcoin faucet';
    } else if (currentPath === '/crypto-tasks') {
      title = 'Crypto Tasks & Micro-Earning Directory — Free USDT Hub';
      description = 'Compare verified crypto survey providers, app testers, and bounty programs by average completion time, payout range, and withdrawal rules.';
      keywords = 'crypto tasks, crypto surveys, micro earning crypto, paid crypto bounties, earn USDT surveys, freecash crypto';
    } else if (currentPath === '/crypto-market') {
      title = 'Cryptocurrency Market Overview & Live Prices — Free USDT Hub';
      description = 'Track real-time CoinGecko market prices, 24-hour volume, rankings, market cap distribution, and 7-day sparkline charts for major crypto assets.';
      keywords = 'crypto market live, cryptocurrency prices, CoinGecko crypto rates, Bitcoin price, Ethereum price, Tether USDT cap, crypto market cap';
    } else if (currentPath.startsWith('/coin/')) {
      const coinId = currentPath.replace('/coin/', '').split('?')[0];
      const coin = coins.find((c) => c.id.toLowerCase() === coinId.toLowerCase() || c.symbol.toLowerCase() === coinId.toLowerCase());
      if (coin) {
        title = `${coin.name} (${coin.symbol}) Price, Chart & Metrics — Free USDT Hub`;
        description = `Live price, 24-hour range, market valuation, 7-day trend chart, and circulating supply metrics for ${coin.name} (${coin.symbol}).`;
        keywords = `${coin.name} price, ${coin.symbol} live chart, ${coin.name} market cap, ${coin.symbol} supply, CoinGecko ${coin.name}, ${coin.symbol} USDT`;
      }
    } else if (currentPath === '/crypto-news') {
      title = 'Crypto News Wire & Binance Disclosures — Free USDT Hub';
      description = 'Live auto-posted cryptocurrency news wire, official Binance earning campaigns, airdrop distributions, and market disclosures updated every 15 minutes.';
      keywords = 'crypto news, Binance news wire, Binance announcements, Binance earn news, crypto airdrop news, crypto market analysis, crypto breaking news';
    } else if (currentPath.startsWith('/crypto-news/')) {
      const slug = currentPath.replace('/crypto-news/', '').split('?')[0];
      const article = articles.find((a) => a.slug === slug);
      if (article) {
        title = `${article.title} — Free USDT Hub`;
        description = article.summary;
        keywords = `${article.tags.join(', ')}, Binance news, crypto announcement, Free USDT Hub`;
        ogType = 'article';
      }
    } else if (currentPath === '/blog') {
      title = 'Cryptocurrency Research & OpSec Blog — Free USDT Hub';
      description = 'In-depth research on stablecoin reserve mechanics, wallet isolation security, phishing defenses, and reward economics.';
      keywords = 'crypto research, stablecoin analysis, wallet security guide, anti-phishing crypto, smart contract safety, crypto blog';
    } else if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').split('?')[0];
      const article = articles.find((a) => a.slug === slug);
      if (article) {
        title = `${article.title} — Free USDT Hub`;
        description = article.summary;
        keywords = `${article.tags.join(', ')}, crypto research, Free USDT Hub blog`;
        ogType = 'article';
      }
    } else if (currentPath.startsWith('/category/')) {
      const cat = currentPath.replace('/category/', '').split('?')[0];
      title = `${cat.toUpperCase()} Articles & News Archive — Free USDT Hub`;
      description = `Explore all published guides, news releases, and research articles in the ${cat} topic category.`;
      keywords = `${cat}, crypto category, crypto topics, Free USDT Hub archive`;
    } else if (currentPath.startsWith('/search')) {
      title = 'Search Directory & Market — Free USDT Hub';
      description = 'Search across cryptocurrency assets, verified earning guides, research blog posts, and Binance news.';
      keywords = 'crypto search, find coins, search earning guides, crypto search engine';
    } else if (currentPath === '/about') {
      title = 'About Us & Editorial Standards — Free USDT Hub';
      description = 'Learn about Free USDT Hub, our independent research mission, anti-scam charter, and transparent editorial policies.';
      keywords = 'about Free USDT Hub, crypto research team, editorial standards, non-custodial research';
    } else if (currentPath === '/contact') {
      title = 'Contact Editorial Desk — Free USDT Hub';
      description = 'Get in touch with the Free USDT Hub editorial and audit desk for verification inquiries, feedback, or ad compliance.';
      keywords = 'contact Free USDT Hub, crypto audit submission, report crypto scam, editorial inquiry';
    } else if (currentPath === '/privacy-policy') {
      title = 'Privacy Policy — Free USDT Hub';
      description = 'Our privacy policy detailing anonymous data handling, Monetag advertising cookies, and visitor rights.';
      keywords = 'privacy policy, data protection, Monetag advertising disclosure, cookie policy';
    } else if (currentPath === '/terms') {
      title = 'Terms of Service — Free USDT Hub';
      description = 'Terms of service and user agreement for accessing Free USDT Hub educational content.';
      keywords = 'terms of service, legal disclaimers, user agreement';
    } else if (currentPath === '/disclaimer') {
      title = 'Financial & Risk Disclaimer — Free USDT Hub';
      description = 'Cryptocurrency risk disclosure: Free USDT Hub provides educational material, not financial or investment advice.';
      keywords = 'financial disclaimer, cryptocurrency risk warning, no financial advice';
    } else if (currentPath === '/editorial-policy') {
      title = 'Editorial Policy — Free USDT Hub';
      description = 'Editorial standards, primary source verification methods, and strict audit criteria for crypto opportunities.';
      keywords = 'editorial policy, fact checking crypto, earning guide verification standards';
    } else if (currentPath === '/advertising-disclosure') {
      title = 'Advertising Disclosure — Free USDT Hub';
      description = 'Advertising disclosure: Monetag publisher verification, non-intrusive ad standards, and independence of market data.';
      keywords = 'advertising disclosure, Monetag publisher verification, sponsored content';
    }

    updatePageSeo({
      title,
      description,
      keywords,
      ogType,
    });
  }, [currentPath, coins, articles]);

  // Route Dispatcher
  const renderRoute = () => {
    // 1. Homepage: "/"
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          coins={coins}
          guides={guides}
          blogArticles={blogArticles}
          newsArticles={newsArticles}
          onNavigate={navigate}
        />
      );
    }

    // 2. "/earn-usdt"
    if (currentPath === '/earn-usdt') {
      return <EarnUsdtPage guides={guides} onNavigate={navigate} />;
    }

    // 3. "/free-crypto"
    if (currentPath === '/free-crypto') {
      return <FreeCryptoPage onNavigate={navigate} />;
    }

    // 4. "/usdt-faucet"
    if (currentPath === '/usdt-faucet') {
      return <UsdtFaucetPage guides={guides} onNavigate={navigate} />;
    }

    // 5. "/crypto-tasks"
    if (currentPath === '/crypto-tasks') {
      return <CryptoTasksPage guides={guides} onNavigate={navigate} />;
    }

    // 6. "/crypto-market"
    if (currentPath === '/crypto-market') {
      return (
        <CryptoMarketPage
          coins={coins}
          lastUpdated={lastMarketUpdate}
          isRefreshing={isRefreshingMarket}
          onRefresh={fetchMarketData}
          onNavigate={navigate}
        />
      );
    }

    // 7. "/coin/[id]"
    if (currentPath.startsWith('/coin/')) {
      const coinId = currentPath.replace('/coin/', '').split('?')[0];
      return <CoinDetailPage coinId={coinId} coins={coins} onNavigate={navigate} />;
    }

    // 8. "/crypto-news"
    if (currentPath === '/crypto-news') {
      return (
        <CryptoNewsPage
          newsArticles={newsArticles}
          onNavigate={navigate}
          onRefreshNews={refreshContent}
        />
      );
    }

    // 9. "/crypto-news/[slug]"
    if (currentPath.startsWith('/crypto-news/')) {
      const slug = currentPath.replace('/crypto-news/', '').split('?')[0];
      return <ArticleDetailPage slug={slug} articles={articles} onNavigate={navigate} />;
    }

    // 10. "/blog"
    if (currentPath === '/blog') {
      return <BlogPage articles={articles} onNavigate={navigate} />;
    }

    // 11. "/blog/[slug]"
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').split('?')[0];
      return <ArticleDetailPage slug={slug} articles={articles} onNavigate={navigate} />;
    }

    // 12. "/category/[slug]"
    if (currentPath.startsWith('/category/')) {
      const categorySlug = currentPath.replace('/category/', '').split('?')[0];
      return <CategoryPage categorySlug={categorySlug} articles={articles} onNavigate={navigate} />;
    }

    // 13. "/search"
    if (currentPath.startsWith('/search')) {
      const params = new URLSearchParams(window.location.search);
      const initialQuery = params.get('q') || '';
      return (
        <SearchPage
          initialQuery={initialQuery}
          articles={articles}
          guides={guides}
          coins={coins}
          onNavigate={navigate}
        />
      );
    }

    // 14. "/about"
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // 15. "/contact"
    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // 16. "/privacy-policy"
    if (currentPath === '/privacy-policy') {
      return <PolicyPage policyType="privacy" onNavigate={navigate} />;
    }

    // 17. "/terms"
    if (currentPath === '/terms') {
      return <PolicyPage policyType="terms" onNavigate={navigate} />;
    }

    // 18. "/disclaimer"
    if (currentPath === '/disclaimer') {
      return <PolicyPage policyType="disclaimer" onNavigate={navigate} />;
    }

    // 19. "/editorial-policy"
    if (currentPath === '/editorial-policy') {
      return <PolicyPage policyType="editorial" onNavigate={navigate} />;
    }

    // 20. "/advertising-disclosure"
    if (currentPath === '/advertising-disclosure') {
      return <PolicyPage policyType="advertising" onNavigate={navigate} />;
    }

    // 404 Fallback
    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EEF0F5] text-[#202033]">
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        coins={coins}
        lastUpdated={lastMarketUpdate}
        onRefreshMarket={fetchMarketData}
        isRefreshing={isRefreshingMarket}
      />
      <main className="flex-1">{renderRoute()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
