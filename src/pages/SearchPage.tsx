import React, { useState, useEffect } from 'react';
import { Search, Coins, BookOpen, Newspaper, ArrowUpRight } from 'lucide-react';
import { ArticleItem, EarningGuideItem, CoinData } from '../lib/db';
import { formatUsd } from '../lib/market-calculator';
import { ViewCounter } from '../components/common/ViewCounter';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface SearchPageProps {
  initialQuery?: string;
  articles: ArticleItem[];
  guides: EarningGuideItem[];
  coins: CoinData[];
  onNavigate: (path: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({
  initialQuery = '',
  articles,
  guides,
  coins,
  onNavigate,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'ALL' | 'COINS' | 'GUIDES' | 'ARTICLES'>('ALL');

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const q = query.toLowerCase().trim();

  const matchingCoins = q
    ? coins.filter(
        (c) => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
      )
    : [];

  const matchingGuides = q
    ? guides.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.provider.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q)
      )
    : [];

  const matchingArticles = q
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const totalResults = matchingCoins.length + matchingGuides.length + matchingArticles.length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Search Header */}
      <div className="max-w-2xl space-y-4">
        <h1 className="text-3xl font-extrabold text-[#202033] tracking-tight">
          Search Directory & Market
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search crypto assets, earning guides, and news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl neu-inset focus:outline-none focus:ring-2 focus:ring-[#6C3BDB] text-sm text-slate-800"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/60 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
            activeTab === 'ALL' ? 'neu-btn-primary' : 'neu-btn text-slate-700'
          }`}
        >
          All Results ({totalResults})
        </button>
        <button
          onClick={() => setActiveTab('COINS')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
            activeTab === 'COINS' ? 'neu-btn-primary' : 'neu-btn text-slate-700'
          }`}
        >
          Coins ({matchingCoins.length})
        </button>
        <button
          onClick={() => setActiveTab('GUIDES')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
            activeTab === 'GUIDES' ? 'neu-btn-primary' : 'neu-btn text-slate-700'
          }`}
        >
          Earning Guides ({matchingGuides.length})
        </button>
        <button
          onClick={() => setActiveTab('ARTICLES')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
            activeTab === 'ARTICLES' ? 'neu-btn-primary' : 'neu-btn text-slate-700'
          }`}
        >
          Articles & News ({matchingArticles.length})
        </button>
      </div>

      {/* Results content */}
      {!q ? (
        <div className="neu-inset p-12 rounded-3xl text-center text-slate-500 text-sm">
          Type a search term above (e.g., "USDT", "Binance", "Faucet", "Security") to explore matching items.
        </div>
      ) : totalResults === 0 ? (
        <div className="neu-inset p-12 rounded-3xl text-center space-y-2">
          <p className="font-semibold text-slate-700">No matching results found for "{query}".</p>
          <p className="text-xs text-slate-500">Try searching for broader keywords like "Bitcoin", "Tron", or "Learn".</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Matching Coins */}
          {(activeTab === 'ALL' || activeTab === 'COINS') && matchingCoins.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Coins className="w-4 h-4 text-[#6C3BDB]" />
                Cryptocurrency Assets ({matchingCoins.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {matchingCoins.map((coin) => (
                  <div
                    key={coin.id}
                    onClick={() => onNavigate(`/coin/${coin.id}`)}
                    className="neu-raised-card p-4 rounded-xl cursor-pointer flex items-center justify-between hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full" />
                      <div>
                        <div className="font-bold text-xs text-slate-900">{coin.name}</div>
                        <span className="text-[11px] font-mono text-slate-500">{coin.symbol}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-xs text-slate-900">{formatUsd(coin.currentPrice)}</span>
                      <span className="block text-[10px] text-[#6C3BDB] font-semibold">View Coin</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matching Guides */}
          {(activeTab === 'ALL' || activeTab === 'GUIDES') && matchingGuides.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#6C3BDB]" />
                Earning Guides ({matchingGuides.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchingGuides.map((guide) => (
                  <div
                    key={guide.id}
                    onClick={() => onNavigate('/earn-usdt')}
                    className="neu-raised-card p-5 rounded-xl cursor-pointer hover:-translate-y-0.5 transition-transform"
                  >
                    <span className="text-[11px] font-bold text-[#6C3BDB] block mb-1">{guide.category}</span>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">{guide.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{guide.description}</p>
                    <div className="mt-3 pt-2 border-t border-slate-200/50 flex justify-between text-xs text-slate-500">
                      <span>Provider: <strong>{guide.provider}</strong></span>
                      <span className="text-[#6C3BDB] font-semibold">Reward: {guide.rewardRange}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matching Articles */}
          {(activeTab === 'ALL' || activeTab === 'ARTICLES') && matchingArticles.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-[#6C3BDB]" />
                Articles & News ({matchingArticles.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchingArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => onNavigate(article.type === 'NEWS' ? `/crypto-news/${article.slug}` : `/blog/${article.slug}`)}
                    className="neu-raised-card p-5 rounded-xl cursor-pointer hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="flex justify-between items-center text-[11px] text-slate-500 mb-1.5">
                      <span className="font-bold text-[#6C3BDB]">{article.categoryName}</span>
                      <ViewCounter slug={article.slug} />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">{article.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{article.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Monetag Ad */}
      <MonetagSlot slotType="banner" />
    </div>
  );
};
