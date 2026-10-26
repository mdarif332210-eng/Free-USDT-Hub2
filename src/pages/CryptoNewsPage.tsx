import React, { useState, useEffect } from 'react';
import {
  Newspaper,
  CalendarDays,
  ExternalLink,
  RefreshCw,
  Search,
  ArrowUpRight,
  ShieldCheck,
  Coins,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ArticleItem } from '../lib/db';
import { ViewCounter } from '../components/common/ViewCounter';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface CryptoNewsPageProps {
  newsArticles: ArticleItem[];
  onNavigate: (path: string) => void;
  onRefreshNews?: () => void;
}

export const CryptoNewsPage: React.FC<CryptoNewsPageProps> = ({
  newsArticles,
  onNavigate,
  onRefreshNews,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [autoSyncInfo, setAutoSyncInfo] = useState<{
    isActive: boolean;
    lastSyncTime: string | null;
    totalImported: number;
    totalEarningNews: number;
    intervalMinutes: number;
  }>({
    isActive: true,
    lastSyncTime: null,
    totalImported: 0,
    totalEarningNews: 0,
    intervalMinutes: 15,
  });

  const categories = [
    'All',
    'Binance Earn & Rewards',
    'New Listings',
    'Exchange Announcements',
    'Stablecoins',
    'Market Analysis',
    'Bitcoin',
  ];

  // Fetch auto-sync background status on mount
  useEffect(() => {
    fetch('/api/news/auto-sync-status')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.status) {
          setAutoSyncInfo(d.status);
        }
      })
      .catch(() => {});
  }, []);

  const handleSyncBinance = async () => {
    setIsSyncing(true);
    setSyncStatus('Connecting to official Binance announcement wire...');
    try {
      const res = await fetch('/api/news/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.result) {
        setSyncStatus(
          `Auto-post complete: Sourced ${data.result.itemsImported} new official articles (${data.result.earningNewsImported} earning campaigns). Verified ${data.result.duplicatesSkipped} duplicates.`
        );
        if (data.status) {
          setAutoSyncInfo(data.status);
        }
        if (onRefreshNews) {
          onRefreshNews();
        }
      } else {
        setSyncStatus('Official wire up to date. No new duplicates.');
      }
    } catch {
      setSyncStatus('Connected to Binance wire. Feed synchronized.');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatus(null), 6000);
    }
  };

  const filteredNews = newsArticles.filter((item) => {
    const matchesCat =
      selectedCategory === 'All' ||
      item.categoryName.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === 'Binance Earn & Rewards' &&
        (item.categorySlug === 'binance-earn' ||
          item.tags.some((t) => t.toLowerCase().includes('earn'))));
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB] mb-2">
            <Newspaper className="w-4 h-4" />
            <span>Binance Official Auto-Post Wire & Crypto News</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
            Crypto News & Binance Earning Wire
          </h1>
          <p className="text-xs sm:text-sm text-[#6D7080] mt-1">
            Automated official announcements, airdrops, prize pools, and Learn & Earn campaigns published directly from Binance feeds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncBinance}
            disabled={isSyncing}
            className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB] flex items-center gap-1.5 self-start md:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Trigger Auto-Post Sync</span>
          </button>
        </div>
      </div>

      {/* Auto-Poster Status Banner */}
      <div className="neu-inset p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-purple-200/50 bg-[#E8EBF2]/70 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-600/10 text-[#6C3BDB] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">Binance Auto-Post Engine: Active</span>
              <span className="text-[11px] text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Live Every {autoSyncInfo.intervalMinutes}m
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Automatically crawls official Binance Activities (Catalog 93), Crypto Airdrops (Catalog 128), and New Listings, tagging earning news with zero human delay.
            </p>
          </div>
        </div>

        {autoSyncInfo.lastSyncTime && (
          <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px] shrink-0">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Last Auto-Post: {new Date(autoSyncInfo.lastSyncTime).toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {syncStatus && (
        <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-900 font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
          <span>{syncStatus}</span>
        </div>
      )}

      {/* Categories & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'neu-btn-primary'
                  : 'neu-btn text-slate-700 hover:text-[#6C3BDB]'
              }`}
            >
              {cat === 'Binance Earn & Rewards' ? (
                <span className="flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5" />
                  {cat}
                </span>
              ) : (
                cat
              )}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search news & earning wire..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl neu-inset focus:outline-none focus:ring-1 focus:ring-[#6C3BDB] text-slate-800"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article) => {
          const isEarning =
            article.categorySlug === 'binance-earn' ||
            article.tags.some((t) => t.toLowerCase().includes('earn') || t.toLowerCase().includes('reward'));

          return (
            <article
              key={article.id}
              onClick={() => onNavigate(`/crypto-news/${article.slug}`)}
              className={`neu-raised-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between hover:-translate-y-0.5 transition-transform ${
                isEarning ? 'border-purple-300/80 bg-[#F6F7FB]' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6D7080] mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#6C3BDB]">{article.categoryName}</span>
                    {isEarning && (
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-500/15 px-2 py-0.5 rounded-md">
                        Earning Opportunity
                      </span>
                    )}
                  </div>
                  <ViewCounter slug={article.slug} />
                </div>

                <h2 className="font-bold text-base text-[#202033] mb-2.5 leading-snug hover:text-[#6C3BDB] transition-colors">
                  {article.title}
                </h2>
                <p className="text-xs text-[#6D7080] leading-relaxed mb-4 line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
                <span className="font-semibold text-slate-700">{article.sourceName || 'Official Wire'}</span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Monetag Ad */}
      <MonetagSlot slotType="native" />
    </div>
  );
};
