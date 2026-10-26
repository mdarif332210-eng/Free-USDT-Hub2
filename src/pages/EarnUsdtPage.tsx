import React, { useState } from 'react';
import {
  Coins,
  ShieldCheck,
  Search,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { EarningGuideItem } from '../lib/db';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface EarnUsdtPageProps {
  guides: EarningGuideItem[];
  onNavigate: (path: string) => void;
}

export const EarnUsdtPage: React.FC<EarnUsdtPageProps> = ({ guides, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Learn & Earn', 'Faucet', 'Microtasks', 'Airdrops'];

  const filteredGuides = guides.filter((guide) => {
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB]">
          <Coins className="w-4 h-4" />
          <span>Editorially Verified Crypto Opportunities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
          Earn USDT & Crypto Rewards Directory
        </h1>
        <p className="text-sm sm:text-base text-[#6D7080] leading-relaxed">
          Comprehensive directory of verified ways to earn USDT and digital assets without paying upfront deposits.
          Every listing is independently checked for eligibility, withdrawal minimums, fees, and operational risks.
        </p>
      </div>

      {/* Safety Notice Banner */}
      <div className="neu-inset p-5 rounded-2xl border border-purple-200/60 bg-[#E8EBF2]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#6C3BDB] shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 leading-relaxed">
            <strong className="text-slate-900 block font-semibold mb-0.5">Zero Upfront Investment Rule:</strong>
            Never pay registration fees, gas advance payments, or VIP tier upgrades to unlock earnings.
            Free USDT Hub never promotes guaranteed return schemes or unverified contracts.
          </div>
        </div>
        <button
          onClick={() => onNavigate('/free-crypto')}
          className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB] shrink-0 whitespace-nowrap"
        >
          Read Safety Charter
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'neu-btn-primary'
                  : 'neu-btn text-slate-700 hover:text-[#6C3BDB]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search providers or rewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl neu-inset focus:outline-none focus:ring-1 focus:ring-[#6C3BDB] text-slate-800"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Directory Cards Grid */}
      {filteredGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="neu-raised-card p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6D7080] mb-3">
                  <span className="font-bold text-[#6C3BDB]">{guide.category}</span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {guide.status}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#202033] mb-2 leading-snug">{guide.title}</h3>
                <p className="text-xs text-[#6D7080] leading-relaxed mb-4">{guide.description}</p>

                {/* Structured Specs Matrix */}
                <div className="space-y-2 text-xs text-slate-700 bg-white/70 p-3.5 rounded-xl border border-slate-200/60 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Provider:</span>
                    <span className="font-semibold text-slate-900">{guide.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reward:</span>
                    <span className="font-semibold text-purple-700">{guide.rewardRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Eligibility:</span>
                    <span className="text-slate-800 text-right truncate max-w-[160px]">{guide.eligibility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Withdrawal Min:</span>
                    <span className="font-semibold text-slate-900">{guide.withdrawalThreshold}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fees:</span>
                    <span className="text-slate-700 text-right truncate max-w-[160px]">{guide.fees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Last Verified:</span>
                    <span className="font-mono text-slate-600 text-[11px]">{guide.lastVerifiedDate}</span>
                  </div>
                </div>

                {/* Risk Callout */}
                <div className="flex items-start gap-2 text-[11px] text-amber-800 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <p>{guide.riskInformation}</p>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-200/60 flex items-center justify-between">
                <a
                  href={guide.officialSource}
                  target="_blank"
                  rel="noreferrer"
                  className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB] flex items-center gap-1.5"
                >
                  Visit Official Source
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-[11px] text-slate-500 font-mono">No Ref Link</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="neu-inset p-10 rounded-2xl text-center space-y-3">
          <p className="text-slate-700 font-medium text-sm">No earning opportunities match your current filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Monetag Ad Placement */}
      <MonetagSlot slotType="native" />
    </div>
  );
};
