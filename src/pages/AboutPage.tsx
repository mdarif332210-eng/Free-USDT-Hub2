import React from 'react';
import { Coins, ShieldCheck, BookOpen, Target, CheckCircle2 } from 'lucide-react';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB]">
          <ShieldCheck className="w-4 h-4" />
          <span>Independent Editorial Standard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
          About Free USDT Hub
        </h1>
        <p className="text-base text-[#6D7080] leading-relaxed">
          Free USDT Hub was created to cut through the predatory marketing, deceptive airdrop scams,
          and fake "passive income" promises that flood the cryptocurrency world.
        </p>
      </div>

      {/* Mission & Principles */}
      <div className="neu-raised-card p-8 sm:p-10 rounded-3xl space-y-6">
        <h2 className="text-2xl font-bold text-[#202033]">Our Core Mission</h2>
        <p className="text-sm text-[#6D7080] leading-relaxed">
          Our editorial team provides transparent, audited guides explaining how legitimate promotional crypto incentives work,
          how stablecoins like Tether (USDT) function under the hood, and how users can interact safely with decentralized
          protocols without falling prey to phishing drainers or paying upfront advance-fee scams.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Zero Registration Barrier</span>
            </div>
            <p className="text-xs text-[#6D7080] leading-relaxed">
              We never require users to create accounts, provide passwords, or connect their wallets to read our content. Free USDT Hub is 100% public.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Real Market Data</span>
            </div>
            <p className="text-xs text-[#6D7080] leading-relaxed">
              All prices and historical metrics are retrieved from the CoinGecko API. We never fabricate numbers or display misleading chart curves.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified Disclosures</span>
            </div>
            <p className="text-xs text-[#6D7080] leading-relaxed">
              Every earning guide lists documented fees, withdrawal thresholds, and real risk warnings so visitors can evaluate actual hourly yield.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Official Monetag Compliance</span>
            </div>
            <p className="text-xs text-[#6D7080] leading-relaxed">
              We participate in the Monetag advertising network using strict verification tags and non-deceptive placements.
            </p>
          </div>
        </div>
      </div>

      {/* Monetag Ad */}
      <MonetagSlot slotType="banner" />

      {/* Quick Links */}
      <div className="neu-inset p-8 rounded-3xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Have questions or want to submit an opportunity for verification?</h3>
          <p className="text-xs text-slate-600">Contact our editorial desk or review our transparent policies.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/contact')}
            className="neu-btn-primary px-4 py-2 rounded-xl text-xs font-semibold"
          >
            Contact Desk
          </button>
          <button
            onClick={() => onNavigate('/editorial-policy')}
            className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-slate-700"
          >
            Editorial Policy
          </button>
        </div>
      </div>
    </div>
  );
};
