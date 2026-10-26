import React from 'react';
import { BookOpen, ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, Coins } from 'lucide-react';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface FreeCryptoPageProps {
  onNavigate: (path: string) => void;
}

export const FreeCryptoPage: React.FC<FreeCryptoPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB]">
          <BookOpen className="w-4 h-4" />
          <span>Educational Foundation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
          The Realistic Guide to Free Cryptocurrency & USDT
        </h1>
        <p className="text-sm sm:text-base text-[#6D7080] leading-relaxed">
          How legitimate digital asset incentives work, where marketing budgets originate, and how to protect
          your identity and wallet from predatory online scams.
        </p>
      </div>

      {/* Featured Educational Callout */}
      <div className="neu-raised-card p-8 rounded-3xl space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#202033]">
          1. The Economic Source of "Free" Crypto
        </h2>
        <p className="text-sm text-[#6D7080] leading-relaxed">
          Cryptocurrency is not created out of thin air. In legitimate ecosystems, reward tokens represent a
          transfer of value funded by marketing and community growth budgets. Understanding where the funds come
          from is the number one method to separate real opportunities from Ponzi schemes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200/60 space-y-2">
            <h3 className="font-bold text-sm text-[#202033]">Exchange Acquisition Budgets</h3>
            <p className="text-xs text-[#6D7080] leading-relaxed">
              Regulated exchanges (like Coinbase and Binance) allocate tens of millions of dollars to acquire identity-verified customers through "Learn & Earn" educational modules.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200/60 space-y-2">
            <h3 className="font-bold text-sm text-[#202033]">Ad-Funded Micro-Sharing</h3>
            <p className="text-xs text-[#6D7080] leading-relaxed">
              Faucets and survey portals display advertisements or collect consumer demographic data. They return 10%–30% of their net revenue to users in fractional cryptocurrency units.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/70 border border-slate-200/60 space-y-2">
            <h3 className="font-bold text-sm text-[#202033]">Protocol Bootstrap Grants</h3>
            <p className="text-xs text-[#6D7080] leading-relaxed">
              New layer-1 and layer-2 blockchains incentivize testnet validators and real stress-testers with token grants to discover code bugs before public mainnet launches.
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Security Protocol */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#202033] tracking-tight">
          2. The 4-Step Safety Protocol Before Claiming Any Reward
        </h2>

        <div className="space-y-4">
          <div className="neu-raised-card p-6 rounded-2xl flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center font-bold text-[#6C3BDB] shrink-0 text-sm">
              01
            </div>
            <div>
              <h3 className="font-bold text-base text-[#202033] mb-1">Create an Isolated "Burner" Wallet</h3>
              <p className="text-xs sm:text-sm text-[#6D7080] leading-relaxed">
                Never connect a wallet containing your life savings, long-term Bitcoin, or Ethereum to an earning platform. Install a separate browser profile with a dedicated hot wallet containing zero capital. If a malicious smart contract exploit occurs, your primary assets remain untouchable.
              </p>
            </div>
          </div>

          <div className="neu-raised-card p-6 rounded-2xl flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center font-bold text-[#6C3BDB] shrink-0 text-sm">
              02
            </div>
            <div>
              <h3 className="font-bold text-base text-[#202033] mb-1">Audit Signature Requests (Beware of Permit2 & Approvals)</h3>
              <p className="text-xs sm:text-sm text-[#6D7080] leading-relaxed">
                Legitimate airdrops or claim sites will only ask for a simple transaction to claim, or a plaintext message signature for authentication. If a prompt requests "Set Approval For All", "Permit", or an unlimited allowance of your tokens, cancel immediately.
              </p>
            </div>
          </div>

          <div className="neu-raised-card p-6 rounded-2xl flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center font-bold text-[#6C3BDB] shrink-0 text-sm">
              03
            </div>
            <div>
              <h3 className="font-bold text-base text-[#202033] mb-1">Calculate Realistic Hourly Yield</h3>
              <p className="text-xs sm:text-sm text-[#6D7080] leading-relaxed">
                Spending 4 hours clicking faucets for 0.08 USDT is an effective hourly wage of $0.02. Use our directory to prioritize high-value educational modules (Learn & Earn) and developer bounties rather than low-yield CAPTCHA farms.
              </p>
            </div>
          </div>

          <div className="neu-raised-card p-6 rounded-2xl flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl neu-inset flex items-center justify-center font-bold text-[#6C3BDB] shrink-0 text-sm">
              04
            </div>
            <div>
              <h3 className="font-bold text-base text-[#202033] mb-1">Understand Tax Liabilities</h3>
              <p className="text-xs sm:text-sm text-[#6D7080] leading-relaxed">
                In most jurisdictions (including the United States, United Kingdom, and European Union), cryptocurrency received from airdrops, mining, staking, or tasks is classified as ordinary taxable income at the fair market value on the day received. Keep accurate accounting logs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monetag Ad */}
      <MonetagSlot slotType="banner" />

      {/* Navigation CTA */}
      <div className="neu-inset p-8 rounded-3xl text-center space-y-4">
        <h3 className="text-xl font-bold text-[#202033]">Ready to explore verified opportunities?</h3>
        <p className="text-xs sm:text-sm text-[#6D7080] max-w-xl mx-auto">
          Explore our audited directory of legitimate faucet providers, microtasks, and Learn & Earn portals.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('/earn-usdt')}
            className="neu-btn-primary px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            Browse Verified Directory <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('/usdt-faucet')}
            className="neu-btn px-6 py-3 rounded-xl text-xs font-bold text-slate-800"
          >
            Faucet Reality Check
          </button>
        </div>
      </div>
    </div>
  );
};
