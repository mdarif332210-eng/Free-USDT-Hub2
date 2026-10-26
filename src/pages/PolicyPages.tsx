import React from 'react';
import { ShieldCheck, FileText, AlertTriangle, Info, BookOpen } from 'lucide-react';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface PolicyPageProps {
  policyType: 'privacy' | 'terms' | 'disclaimer' | 'editorial' | 'advertising';
  onNavigate: (path: string) => void;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ policyType, onNavigate }) => {
  const renderContent = () => {
    switch (policyType) {
      case 'privacy':
        return (
          <>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB]">
              <ShieldCheck className="w-4 h-4" />
              <span>Privacy & Data Protection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-slate-500">Effective Date: October 2026 · Version 1.2</p>

            <div className="neu-raised-card p-6 sm:p-8 rounded-3xl space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h2 className="text-lg font-bold text-[#202033]">1. Information We Collect</h2>
              <p>
                Free USDT Hub operates as an open informational platform. We do not require visitors to create accounts,
                disclose private keys, connect Web3 wallets, or provide financial credentials.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Voluntary Contact Information:</strong> Name and email submitted through our public contact form for customer support.</li>
                <li><strong>Approximate Analytics:</strong> Anonymized HTTP headers, client IP addresses (truncated), and user-agent strings used for rate-limiting and bot filtering on view counters.</li>
              </ul>

              <h2 className="text-lg font-bold text-[#202033]">2. Cookies and Advertising Partners</h2>
              <p>
                We collaborate with authorized third-party advertising networks, including <strong>Monetag</strong>.
                These third-party vendors may use cookies, web beacons, and device identifiers to serve non-intrusive advertisements based on visits to this and other websites.
                Users may opt out of personalized advertising by visiting the Network Advertising Initiative (NAI) opt-out page or adjusting browser cookie preferences.
              </p>

              <h2 className="text-lg font-bold text-[#202033]">3. Third-Party Data Integrations</h2>
              <p>
                Our cryptocurrency market prices are retrieved from the CoinGecko API. Server-side caching is employed to prevent direct client tracking by external data vendors.
              </p>

              <h2 className="text-lg font-bold text-[#202033]">4. Contact Our Data Controller</h2>
              <p>
                If you have questions about our data practices or request data deletion, contact us through our{' '}
                <button onClick={() => onNavigate('/contact')} className="text-[#6C3BDB] font-semibold underline">
                  Contact Form
                </button>.
              </p>
            </div>
          </>
        );

      case 'terms':
        return (
          <>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB]">
              <FileText className="w-4 h-4" />
              <span>Terms of Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs font-mono text-slate-500">Effective Date: October 2026</p>

            <div className="neu-raised-card p-6 sm:p-8 rounded-3xl space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h2 className="text-lg font-bold text-[#202033]">1. Agreement to Terms</h2>
              <p>
                By accessing and using Free USDT Hub (freeusdthub.com), you acknowledge and agree to be bound by these Terms of Service.
                If you do not agree to these terms, please discontinue use of this website immediately.
              </p>

              <h2 className="text-lg font-bold text-[#202033]">2. Informational Purpose Only</h2>
              <p>
                All materials, guides, directories, and market snapshots published on Free USDT Hub are provided exclusively for general educational and informational purposes.
                Nothing on this website constitutes investment, tax, legal, or financial advice.
              </p>

              <h2 className="text-lg font-bold text-[#202033]">3. Third-Party Earning Providers</h2>
              <p>
                Free USDT Hub indexes third-party platforms (such as exchange learning modules, survey aggregators, and faucets).
                We do not own, control, or operate these external services. We are not liable for any third-party downtime, account suspensions, token valuation changes, or payout failures.
              </p>

              <h2 className="text-lg font-bold text-[#202033]">4. Prohibited Conduct</h2>
              <p>
                You agree not to execute automated scraping scripts, denial-of-service attacks, or artificial view-counter inflation against Free USDT Hub infrastructure.
              </p>
            </div>
          </>
        );

      case 'disclaimer':
        return (
          <>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600">
              <AlertTriangle className="w-4 h-4" />
              <span>Regulatory & Risk Disclosure</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
              Cryptocurrency & Financial Disclaimer
            </h1>
            <p className="text-xs font-mono text-slate-500">Updated: October 2026</p>

            <div className="neu-raised-card p-6 sm:p-8 rounded-3xl space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-900 text-xs font-medium">
                <strong>CRITICAL NOTICE:</strong> Trading or holding cryptocurrencies and stablecoins involves significant capital risk.
                Market prices can fluctuate dramatically. Never risk capital you cannot afford to lose.
              </div>

              <h2 className="text-lg font-bold text-[#202033]">1. No Financial Advice</h2>
              <p>
                The information provided on Free USDT Hub does not constitute financial advice, investment recommendations, or endorsement of any specific token or blockchain.
                Always conduct your own independent research (DYOR) and consult a licensed financial advisor before making financial decisions.
              </p>

              <h2 className="text-lg font-bold text-[#202033]">2. Stablecoin Risks & Peg Stability</h2>
              <p>
                While Tether (USDT) is pegged 1:1 to the US Dollar, holding stablecoins carries counterparty risk, regulatory compliance risks, smart contract vulnerabilities, and multi-chain bridge risks.
              </p>

              <h2 className="text-lg font-bold text-[#202033]">3. Zero Upfront Fee Policy</h2>
              <p>
                We do not solicit investments, deposits, or private keys. If anyone contacts you claiming to represent Free USDT Hub asking for payments or wallet authorization, they are an imposter.
              </p>
            </div>
          </>
        );

      case 'editorial':
        return (
          <>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB]">
              <BookOpen className="w-4 h-4" />
              <span>Standards of Journalism</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
              Editorial Policy
            </h1>
            <p className="text-xs font-mono text-slate-500">Updated: October 2026</p>

            <div className="neu-raised-card p-6 sm:p-8 rounded-3xl space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h2 className="text-lg font-bold text-[#202033]">1. Fact-Checking & Primary Sources</h2>
              <p>
                Our editorial team verifies all crypto news, exchange reserve audits, and protocol updates directly from primary documentation, official announcements, and verifiable on-chain explorer records.
              </p>

              <h2 className="text-lg font-bold text-[#202033]">2. Earning Guide Verification Standards</h2>
              <p>
                Before any faucet, microtask provider, or Learn & Earn program is listed in our directory, it undergoes rigorous inspection:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Confirmation of legitimate corporate or protocol standing.</li>
                <li>Verification that no upfront deposit is required to unlock balances.</li>
                <li>Clear documentation of fees, network transfer costs, and withdrawal minimums.</li>
                <li>Mandatory risk warning disclosures.</li>
              </ul>

              <h2 className="text-lg font-bold text-[#202033]">3. News Attribution & Original Summaries</h2>
              <p>
                When importing announcements from Binance or global wires, we preserve original headlines, credit the authoring organization, and provide direct canonical links.
              </p>
            </div>
          </>
        );

      case 'advertising':
        return (
          <>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB]">
              <Info className="w-4 h-4" />
              <span>Publisher Disclosures</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
              Advertising Disclosure & Monetag Integration
            </h1>
            <p className="text-xs font-mono text-slate-500">Updated: October 2026</p>

            <div className="neu-raised-card p-6 sm:p-8 rounded-3xl space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h2 className="text-lg font-bold text-[#202033]">1. Publisher Verification</h2>
              <p>
                Free USDT Hub participates in the Monetag advertising publisher program.
                Our website includes the verified publisher identification meta tag:
                <br />
                <code className="font-mono text-xs bg-slate-200/80 px-2 py-1 rounded inline-block mt-1">
                  &lt;meta name="monetag" content="6403520c5cf5d7c84f05b9b0223f05c7"&gt;
                </code>
              </p>

              <h2 className="text-lg font-bold text-[#202033]">2. Non-Deceptive Advertising Standards</h2>
              <p>
                We adhere to strict ethical ad display guidelines:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>We never disguise advertisements as site navigation or download buttons.</li>
                <li>We never force users to click on ads to unlock content or claim rewards.</li>
                <li>Advertisements are clearly separated from editorial copy and marked with sponsor labels.</li>
              </ul>

              <h2 className="text-lg font-bold text-[#202033]">3. Independence of Market Data</h2>
              <p>
                Monetag advertising scripts and sponsor placements operate completely independently from our CoinGecko market pricing algorithms and editorial reviews.
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {renderContent()}
      <MonetagSlot slotType="banner" />
    </div>
  );
};
