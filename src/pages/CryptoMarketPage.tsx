import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Search,
  RefreshCw,
  ArrowUpDown,
  Coins,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { CoinData } from '../lib/db';
import { formatUsd, formatPercent, formatCompactUsd } from '../lib/market-calculator';
import { CoinChart } from '../components/market/CoinChart';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface CryptoMarketPageProps {
  coins: CoinData[];
  lastUpdated: string;
  isRefreshing: boolean;
  onRefresh: () => void;
  onNavigate: (path: string) => void;
}

type SortField = 'rank' | 'name' | 'price' | 'change' | 'marketCap' | 'volume';
type SortOrder = 'asc' | 'desc';

export const CryptoMarketPage: React.FC<CryptoMarketPageProps> = ({
  coins,
  lastUpdated,
  isRefreshing,
  onRefresh,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'rank' || field === 'name' ? 'asc' : 'desc');
    }
  };

  const filteredCoins = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'rank':
        comparison = a.marketCapRank - b.marketCapRank;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.currentPrice - b.currentPrice;
        break;
      case 'change':
        comparison = a.priceChange24h - b.priceChange24h;
        break;
      case 'marketCap':
        comparison = a.marketCap - b.marketCap;
        break;
      case 'volume':
        comparison = a.totalVolume - b.totalVolume;
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB] mb-2">
            <Coins className="w-4 h-4" />
            <span>CoinGecko Live Crypto Market Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
            Cryptocurrency Market Capitalization & Volume
          </h1>
          <p className="text-xs sm:text-sm text-[#6D7080] mt-1">
            Real-time market prices, trading volume, 24-hour fluctuations, and 7-day sparklines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs text-slate-500">
            <span className="block">Last Updated</span>
            <span className="font-mono tabular-nums text-slate-700">
              {new Date(lastUpdated).toLocaleTimeString()}
            </span>
          </div>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="neu-btn p-2.5 rounded-xl text-slate-700 hover:text-[#6C3BDB]"
            title="Refresh CoinGecko market rates"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#6C3BDB]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search coin name or symbol (e.g. USDT, BTC)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl neu-inset focus:outline-none focus:ring-1 focus:ring-[#6C3BDB] text-slate-800"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 self-end sm:self-auto">
          <span>Displaying <strong>{sortedCoins.length}</strong> assets</span>
          <span>·</span>
          <span>Currency: <strong>USD</strong></span>
        </div>
      </div>

      {/* Market Table */}
      <div className="neu-raised-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 text-slate-500 uppercase text-[10px] tracking-wider bg-white/40">
                <th
                  onClick={() => handleSort('rank')}
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-800 select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>#</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('name')}
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-800 select-none"
                >
                  <div className="flex items-center gap-1">
                    <span>Asset</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('price')}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-slate-800 select-none"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('change')}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-slate-800 select-none"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>24h Change</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('volume')}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-slate-800 select-none hidden md:table-cell"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>24h Volume</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('marketCap')}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-slate-800 select-none"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Market Cap</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-center hidden lg:table-cell w-36">7D Trend</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 text-slate-800 font-medium">
              {sortedCoins.map((coin) => {
                const isPositive = coin.priceChange24h >= 0;
                return (
                  <tr
                    key={coin.id}
                    onClick={() => onNavigate(`/coin/${coin.id}`)}
                    className="hover:bg-white/60 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-4 font-mono tabular-nums text-slate-500">
                      {coin.marketCapRank}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full bg-white p-0.5"
                        />
                        <div>
                          <div className="font-bold text-slate-900 leading-tight">{coin.name}</div>
                          <span className="font-semibold text-[11px] text-slate-500 uppercase">{coin.symbol}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-mono tabular-nums font-bold text-slate-900">
                      {formatUsd(coin.currentPrice)}
                    </td>
                    <td className="py-4 px-4 text-right font-mono tabular-nums">
                      <span
                        className={`inline-flex items-center text-xs font-semibold ${
                          isPositive ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {isPositive ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                        {formatPercent(coin.priceChange24h)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-mono tabular-nums text-slate-700 hidden md:table-cell">
                      {formatCompactUsd(coin.totalVolume)}
                    </td>
                    <td className="py-4 px-4 text-right font-mono tabular-nums text-slate-900 font-semibold">
                      {formatCompactUsd(coin.marketCap)}
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <CoinChart data={coin.sparkline} isPositive={isPositive} height={35} />
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(`/coin/${coin.id}`);
                        }}
                        className="neu-btn px-2.5 py-1 rounded-lg text-[11px] font-semibold text-[#6C3BDB] hover:bg-slate-200"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monetag Ad */}
      <MonetagSlot slotType="banner" />
    </div>
  );
};
