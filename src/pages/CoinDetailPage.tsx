import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  Coins,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { CoinData } from '../lib/db';
import { formatUsd, formatPercent, formatCompactUsd } from '../lib/market-calculator';
import { CoinChart } from '../components/market/CoinChart';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface CoinDetailPageProps {
  coinId: string;
  coins: CoinData[];
  onNavigate: (path: string) => void;
}

export const CoinDetailPage: React.FC<CoinDetailPageProps> = ({ coinId, coins, onNavigate }) => {
  const coin = coins.find(
    (c) => c.id.toLowerCase() === coinId.toLowerCase() || c.symbol.toLowerCase() === coinId.toLowerCase()
  );

  if (!coin) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Cryptocurrency Not Found</h1>
        <p className="text-xs text-slate-600">The requested cryptocurrency asset was not found in our directory.</p>
        <button
          onClick={() => onNavigate('/crypto-market')}
          className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB]"
        >
          Return to Market Overview
        </button>
      </div>
    );
  }

  const isPositive = coin.priceChange24h >= 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('/crypto-market')}
          className="neu-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Market Overview
        </button>
      </div>

      {/* Coin Title & Price Header */}
      <div className="neu-raised-card p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200/60">
          <div className="flex items-center gap-4">
            <img
              src={coin.image}
              alt={coin.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full bg-white p-1 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202033] tracking-tight">{coin.name}</h1>
                <span className="font-bold text-sm text-slate-500 uppercase font-mono">{coin.symbol}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                  Rank #{coin.marketCapRank}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Verified CoinGecko Asset Profile</p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-[#202033]">
              {formatUsd(coin.currentPrice)}
            </div>
            <div
              className={`font-mono text-xs font-semibold tabular-nums inline-flex items-center mt-1 ${
                isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
              {formatPercent(coin.priceChange24h)} (24h)
            </div>
          </div>
        </div>

        {/* 7-Day Chart */}
        <div className="pt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">7-Day Price Trend</span>
            <span className="text-[11px] font-mono text-slate-500">Sparkline Resolution: 20 ticks</span>
          </div>
          <div className="bg-white/60 p-4 rounded-2xl border border-slate-200/60">
            <CoinChart data={coin.sparkline} isPositive={isPositive} height={140} showAxes={true} />
          </div>
        </div>
      </div>

      {/* Market Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="neu-raised-card p-5 rounded-2xl">
          <span className="text-xs text-slate-500 block mb-1">Market Capitalization</span>
          <span className="text-lg font-bold font-mono tabular-nums text-slate-900">
            {formatCompactUsd(coin.marketCap)}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">Full market valuation</span>
        </div>

        <div className="neu-raised-card p-5 rounded-2xl">
          <span className="text-xs text-slate-500 block mb-1">24h Trading Volume</span>
          <span className="text-lg font-bold font-mono tabular-nums text-slate-900">
            {formatCompactUsd(coin.totalVolume)}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">Global exchange turnover</span>
        </div>

        <div className="neu-raised-card p-5 rounded-2xl">
          <span className="text-xs text-slate-500 block mb-1">24h High / Low</span>
          <div className="text-sm font-bold font-mono tabular-nums text-slate-900">
            <span className="text-emerald-700">{formatUsd(coin.high24h)}</span> /{' '}
            <span className="text-rose-700">{formatUsd(coin.low24h)}</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Day price range</span>
        </div>

        <div className="neu-raised-card p-5 rounded-2xl">
          <span className="text-xs text-slate-500 block mb-1">Circulating Supply</span>
          <span className="text-sm font-bold font-mono tabular-nums text-slate-900 truncate block">
            {coin.circulatingSupply.toLocaleString()} {coin.symbol}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            {coin.totalSupply ? `Max: ${coin.totalSupply.toLocaleString()}` : 'Unlimited / Dynamic'}
          </span>
        </div>
      </div>

      {/* Asset Description & Safety Notes */}
      <div className="neu-raised-card p-6 sm:p-8 rounded-3xl space-y-4">
        <h2 className="text-xl font-bold text-[#202033]">
          About {coin.name} ({coin.symbol})
        </h2>
        <p className="text-xs sm:text-sm text-[#6D7080] leading-relaxed">
          {coin.name} is a digital cryptocurrency asset tracked globally. Prices and metrics are refreshed from
          CoinGecko's institutional crypto endpoints. Always verify smart contract token addresses before interacting
          with decentralized exchanges or transferring funds to prevent copycat address poisoning.
        </p>

        {coin.symbol === 'USDT' && (
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-200 text-xs text-slate-700 space-y-2 mt-4">
            <strong className="text-purple-900 font-semibold block flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#6C3BDB]" />
              USDT Specific Transfer Guidelines:
            </strong>
            <p className="leading-relaxed">
              When receiving or sending Tether (USDT), confirm whether your counterparty uses <strong>Tron (TRC-20)</strong>,
              <strong>Ethereum (ERC-20)</strong>, <strong>Solana (SPL)</strong>, or <strong>Polygon (EVM)</strong>. Sending
              USDT across mismatched networks will result in permanent loss of funds.
            </p>
          </div>
        )}

        <div className="pt-4 flex flex-wrap items-center gap-4 text-xs">
          <a
            href={`https://www.coingecko.com/en/coins/${coin.id}`}
            target="_blank"
            rel="noreferrer"
            className="neu-btn px-4 py-2 rounded-xl text-[#6C3BDB] font-semibold flex items-center gap-1"
          >
            Official CoinGecko Profile <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => onNavigate('/earn-usdt')}
            className="neu-btn-primary px-4 py-2 rounded-xl font-semibold flex items-center gap-1"
          >
            Find Earning Guides for {coin.symbol}
          </button>
        </div>
      </div>

      {/* Monetag Ad */}
      <MonetagSlot slotType="banner" />
    </div>
  );
};
