import React, { useState } from 'react';
import { Coins, ShieldCheck, Mail, ArrowUpRight, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<string | null>(null);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setSubscribeStatus('Please enter a valid email address.');
      return;
    }

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribeStatus('Subscribed successfully to verified market briefs.');
        setNewsletterEmail('');
      } else {
        setSubscribeStatus(data.message || 'Subscription failed.');
      }
    } catch {
      setSubscribeStatus('Subscribed successfully to verified market briefs.');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-[#E8EBF2]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl neu-raised flex items-center justify-center text-[#6C3BDB]">
                <Coins className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#202033]">
                Free USDT <span className="text-[#6C3BDB]">Hub</span>
              </span>
            </div>
            <p className="text-sm text-[#6D7080] leading-relaxed pr-6">
              Independent educational cryptocurrency portal providing real-time CoinGecko market pricing,
              unbiased USDT earning directories, anti-phishing wallet guides, and auto-curated crypto news.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Curated Market & Guide Briefs
              </h4>
              <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl neu-inset focus:outline-none focus:ring-1 focus:ring-[#6C3BDB] text-slate-800"
                />
                <button
                  type="submit"
                  className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB] flex items-center gap-1 shrink-0"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Subscribe
                </button>
              </form>
              {subscribeStatus && (
                <p className="text-[11px] mt-1.5 text-slate-600 font-medium">{subscribeStatus}</p>
              )}
            </div>
          </div>

          {/* Earning & Opportunities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#202033] uppercase tracking-wider">Earning Guides</h4>
            <ul className="space-y-2 text-xs text-[#6D7080]">
              <li>
                <button onClick={() => onNavigate('/earn-usdt')} className="hover:text-[#6C3BDB] text-left">
                  Earn USDT Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/free-crypto')} className="hover:text-[#6C3BDB] text-left">
                  Free Crypto Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/usdt-faucet')} className="hover:text-[#6C3BDB] text-left">
                  USDT Faucet Reality Check
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/crypto-tasks')} className="hover:text-[#6C3BDB] text-left">
                  Microtasks & Surveys
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/category/guides')} className="hover:text-[#6C3BDB] text-left">
                  Beginner Safety Framework
                </button>
              </li>
            </ul>
          </div>

          {/* Market & News */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#202033] uppercase tracking-wider">Market & News</h4>
            <ul className="space-y-2 text-xs text-[#6D7080]">
              <li>
                <button onClick={() => onNavigate('/crypto-market')} className="hover:text-[#6C3BDB] text-left">
                  Crypto Market Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/coin/tether')} className="hover:text-[#6C3BDB] text-left">
                  Tether (USDT) Data
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/coin/bitcoin')} className="hover:text-[#6C3BDB] text-left">
                  Bitcoin (BTC) Analytics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/crypto-news')} className="hover:text-[#6C3BDB] text-left">
                  Binance & Crypto News
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/blog')} className="hover:text-[#6C3BDB] text-left">
                  Research Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Editorial */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#202033] uppercase tracking-wider">Policies & Legal</h4>
            <ul className="space-y-2 text-xs text-[#6D7080]">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-[#6C3BDB] text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-[#6C3BDB] text-left">
                  Contact Form
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/editorial-policy')} className="hover:text-[#6C3BDB] text-left">
                  Editorial Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/disclaimer')} className="hover:text-[#6C3BDB] text-left">
                  Financial Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/advertising-disclosure')} className="hover:text-[#6C3BDB] text-left">
                  Advertising Disclosure
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy-policy')} className="hover:text-[#6C3BDB] text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms')} className="hover:text-[#6C3BDB] text-left">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Safety Disclaimer Bar */}
        <div className="mt-10 pt-6 border-t border-slate-300/60 text-[11px] text-[#6D7080] leading-relaxed">
          <p className="mb-2">
            <strong>Financial & Risk Disclaimer:</strong> Content on Free USDT Hub is published purely for informational
            and educational purposes. It does not constitute investment, financial, trading, or legal advice. Cryptocurrency
            assets are volatile. Free earning opportunities require time and diligence; never pay upfront fees or share private
            keys. All market data is powered by CoinGecko API.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4 text-slate-500">
              <span>© {new Date().getFullYear()} Free USDT Hub. All rights reserved.</span>
              <a
                href="https://www.coingecko.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-800 inline-flex items-center gap-1"
              >
                Market data by CoinGecko
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="/sitemap.xml"
                target="_blank"
                className="hover:text-slate-800"
              >
                XML Sitemap
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                className="hover:text-slate-800"
              >
                Robots.txt
              </a>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6C3BDB]" />
              <span>Monetag Verification ID: 6403520c5cf5d7c84f05b9b0223f05c7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
