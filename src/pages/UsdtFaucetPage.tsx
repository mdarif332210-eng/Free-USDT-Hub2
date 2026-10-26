import React from 'react';
import { Coins, AlertTriangle, ShieldCheck, HelpCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { EarningGuideItem } from '../lib/db';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface UsdtFaucetPageProps {
  guides: EarningGuideItem[];
  onNavigate: (path: string) => void;
}

export const UsdtFaucetPage: React.FC<UsdtFaucetPageProps> = ({ guides, onNavigate }) => {
  const faucetGuides = guides.filter((g) => g.category === 'Faucet');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB]">
          <Coins className="w-4 h-4" />
          <span>Mechanics & Reality Check</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
          USDT Faucet Guide: How Micro-Earnings Actually Work
        </h1>
        <p className="text-sm sm:text-base text-[#6D7080] leading-relaxed">
          An honest examination of cryptocurrency faucets, how micropayment networks handle micro-transactions,
          realistic yield expectations, and how to stay safe from malware and deposit extortion.
        </p>
      </div>

      {/* Critical Reality Check Box */}
      <div className="neu-raised-card p-6 sm:p-8 rounded-3xl border border-amber-200/60 bg-[#F4F6FA]">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#202033]">
              The Mathematical Reality of Modern Faucets
            </h2>
            <p className="text-xs sm:text-sm text-[#6D7080] leading-relaxed">
              When Gavin Andresen created the first Bitcoin faucet in 2010, it gave away 5 BTC per visitor because Bitcoin had negligible market value. Today, 1 USDT is worth exactly $1.00 USD.
              Legitimate modern faucets dispense between <strong>0.0005 USDT and 0.02 USDT</strong> per claim session, funded by advertising banners.
            </p>
            <p className="text-xs font-semibold text-rose-700">
              🚨 WARNING: Any website claiming to pay "50 USDT per hour" or "100 USDT daily from a free faucet" is a fraudulent phishing site or advance-fee scam.
            </p>
          </div>
        </div>
      </div>

      {/* How Micropayments Work */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#202033] tracking-tight">
          How Microwallet Networks Function (e.g. FaucetPay)
        </h2>
        <p className="text-xs sm:text-sm text-[#6D7080] leading-relaxed">
          Because Ethereum and Tron on-chain gas fees range from $0.50 to $8.00 per transaction, it is economically impossible for a faucet to send $0.002 directly to your personal wallet.
          To solve this, the ecosystem uses <strong>off-chain micropayment aggregators</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="neu-inset p-5 rounded-2xl space-y-2">
            <span className="text-xs font-mono font-bold text-[#6C3BDB]">Stage 1</span>
            <h3 className="font-bold text-sm text-[#202033]">Micro-Claims Aggregation</h3>
            <p className="text-xs text-[#6D7080] leading-relaxed">
              You complete a CAPTCHA or view a sponsor page. The faucet instantly credits your off-chain microwallet ledger balance with zero network fees.
            </p>
          </div>

          <div className="neu-inset p-5 rounded-2xl space-y-2">
            <span className="text-xs font-mono font-bold text-[#6C3BDB]">Stage 2</span>
            <h3 className="font-bold text-sm text-[#202033]">Threshold Accumulation</h3>
            <p className="text-xs text-[#6D7080] leading-relaxed">
              You accumulate fractions from multiple verified faucets until you reach the minimum withdrawal threshold (typically 0.50 to 2.00 USDT).
            </p>
          </div>

          <div className="neu-inset p-5 rounded-2xl space-y-2">
            <span className="text-xs font-mono font-bold text-[#6C3BDB]">Stage 3</span>
            <h3 className="font-bold text-sm text-[#202033]">Batched On-Chain Payout</h3>
            <p className="text-xs text-[#6D7080] leading-relaxed">
              The aggregator batches hundreds of user withdrawals into a single blockchain transaction, minimizing gas overhead before sending to your cold wallet.
            </p>
          </div>
        </div>
      </div>

      {/* Verified Faucet Directory */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#202033] tracking-tight">
            Verified Faucets & Micropayment Directories
          </h2>
          <span className="text-xs text-[#6C3BDB] font-semibold">{faucetGuides.length} Audited Services</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faucetGuides.map((guide) => (
            <div key={guide.id} className="neu-raised-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs text-[#6D7080] mb-2">
                  <span className="font-semibold text-[#6C3BDB]">{guide.provider}</span>
                  <span className="text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px] font-medium">
                    Verified {guide.lastVerifiedDate}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#202033] mb-2">{guide.title}</h3>
                <p className="text-xs text-[#6D7080] leading-relaxed mb-4">{guide.description}</p>

                <div className="bg-white/70 p-3 rounded-xl border border-slate-200/50 text-xs space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Typical Reward:</span>
                    <span className="font-semibold text-purple-700">{guide.rewardRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Withdrawal Min:</span>
                    <span className="font-semibold text-slate-800">{guide.withdrawalThreshold}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <a
                  href={guide.officialSource}
                  target="_blank"
                  rel="noreferrer"
                  className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB] flex items-center gap-1.5"
                >
                  Visit Official Provider <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monetag Ad */}
      <MonetagSlot slotType="banner" />

      {/* Next Step */}
      <div className="neu-inset p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-[#202033]">Prefer higher rewards than faucets?</h3>
          <p className="text-xs text-[#6D7080] mt-1">
            Explore task-based directories or official exchange Learn & Earn programs with higher hourly returns.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/crypto-tasks')}
          className="neu-btn-primary px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5"
        >
          View Task Directory <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
