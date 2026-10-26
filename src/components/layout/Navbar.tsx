import React, { useState } from 'react';
import { Coins, Search, Menu, X, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { CoinData } from '../../lib/db';
import { formatUsd, formatPercent } from '../../lib/market-calculator';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  coins: CoinData[];
  lastUpdated: string;
  onRefreshMarket: () => void;
  isRefreshing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  coins,
  lastUpdated,
  onRefreshMarket,
  isRefreshing,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Earn USDT', path: '/earn-usdt' },
    { label: 'Crypto Market', path: '/crypto-market' },
    { label: 'Crypto News', path: '/crypto-news' },
    { label: 'Guides', path: '/free-crypto' },
    { label: 'Blog', path: '/blog' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const tickerCoins = coins.slice(0, 5);

  return (
    <header className="sticky top-0 z-50 bg-[#EEF0F5]/90 backdrop-blur-md border-b border-slate-200/70">
      {/* Top Crypto Ticker Bar */}
      <div className="bg-[#E4E7EE] border-b border-slate-200/60 px-4 py-1 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Ticker items */}
          <div className="flex items-center gap-4 overflow-x-auto py-0.5 no-scrollbar">
            {tickerCoins.map((coin) => {
              const isPositive = coin.priceChange24h >= 0;
              return (
                <button
                  key={coin.id}
                  onClick={() => onNavigate(`/coin/${coin.id}`)}
                  className="flex items-center gap-1.5 shrink-0 hover:text-[#6C3BDB] transition-colors focus:outline-none"
                  title={`View ${coin.name} details`}
                >
                  <span className="font-semibold text-slate-800">{coin.symbol}</span>
                  <span className="font-mono tabular-nums text-slate-700">{formatUsd(coin.currentPrice)}</span>
                  <span
                    className={`font-mono tabular-nums flex items-center text-[11px] ${
                      isPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 inline mr-0.5" />
                    ) : (
                      <TrendingDown className="w-3 h-3 inline mr-0.5" />
                    )}
                    {formatPercent(coin.priceChange24h)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Refresh & Last Updated Timestamp */}
          <div className="hidden sm:flex items-center gap-2 shrink-0 text-slate-500 text-[11px]">
            <span>Updated: {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <button
              onClick={onRefreshMarket}
              disabled={isRefreshing}
              className="p-1 rounded-md hover:bg-slate-300/60 transition-colors focus:outline-none"
              title="Refresh CoinGecko Market Data"
              aria-label="Refresh market data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#6C3BDB]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Navigation conforming strictly to 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <button
          onClick={() => {
            onNavigate('/');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 text-left focus:outline-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl neu-raised flex items-center justify-center text-[#6C3BDB]">
            <Coins className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#202033] whitespace-nowrap">
            Free USDT <span className="text-[#6C3BDB]">Hub</span>
          </span>
        </button>

        {/* Zone 2: Navigation Links (single line, clean text with subtle hover) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`whitespace-nowrap transition-colors py-1 relative focus:outline-none ${
                  isActive ? 'text-[#6C3BDB] font-semibold' : 'hover:text-[#202033]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6C3BDB] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search affordance + 1 primary CTA */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search crypto & guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-52 pl-9 pr-3 py-1.5 text-xs rounded-xl neu-inset focus:outline-none focus:ring-1 focus:ring-[#6C3BDB] text-slate-800 placeholder-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
          </form>

          <button
            onClick={() => onNavigate('/crypto-market')}
            className="neu-btn-primary px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap"
          >
            Live Market
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl neu-raised text-slate-700 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#EEF0F5] border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search crypto & guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl neu-inset focus:outline-none focus:ring-1 focus:ring-[#6C3BDB]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </form>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  onNavigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentPath === link.path
                    ? 'bg-[#6C3BDB]/10 text-[#6C3BDB]'
                    : 'text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                onNavigate('/crypto-market');
                setMobileMenuOpen(false);
              }}
              className="w-full neu-btn-primary py-2.5 rounded-xl text-xs font-semibold text-center"
            >
              Explore Live Market
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
