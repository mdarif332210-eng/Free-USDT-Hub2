import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Coins,
  Newspaper,
  BookOpen,
  CalendarDays,
} from 'lucide-react';
import { CoinData, ArticleItem, EarningGuideItem } from '../lib/db';
import { formatUsd, formatPercent, formatCompactUsd } from '../lib/market-calculator';
import { ViewCounter } from '../components/common/ViewCounter';
import { MonetagSlot } from '../components/ads/MonetagSlot';
import { CoinChart } from '../components/market/CoinChart';

interface HomePageProps {
  coins: CoinData[];
  guides: EarningGuideItem[];
  blogArticles: ArticleItem[];
  newsArticles: ArticleItem[];
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  coins,
  guides,
  blogArticles,
  newsArticles,
  onNavigate,
}) => {
  const topCoins = coins.slice(0, 6);
  const featuredGuides = guides.slice(0, 3);
  const latestNews = newsArticles.slice(0, 3);
  const latestBlogs = blogArticles.slice(0, 3);

  const faqs = [
    {
      q: 'Can you really get free USDT without paying any money upfront?',
      a: 'Yes, legitimate promotional rewards exist via official Learn & Earn campaigns (e.g. Binance Academy, Coinbase), verified micro-survey aggregators, and sponsor-funded faucets. However, rewards are small (from a few cents to a few dollars). Any platform requesting an upfront deposit or claiming "guaranteed daily ROI" is an advance-fee scam.',
    },
    {
      q: 'What is the safest network for withdrawing USDT?',
      a: 'Tron (TRC-20) and Polygon (EVM) are popular for low gas fees (often under $1), whereas Ethereum (ERC-20) offers peak smart-contract security but higher transfer fees. Always verify that both your source wallet and receiving exchange support the chosen network before initiating transfers.',
    },
    {
      q: 'How does CoinGecko market data work on Free USDT Hub?',
      a: 'Market metrics are retrieved through server-side CoinGecko API calls and cached locally. This gives real-time prices, 24-hour volume, and market rankings without exposing API credentials to the browser or burdening users with slow client calls.',
    },
    {
      q: 'How do crypto faucets and task aggregators fund payouts?',
      a: 'Legitimate faucets and task providers share a percentage of advertising revenue and survey sponsorship budgets paid by marketing research firms. You exchange small amounts of time and attention for fractional token credits.',
    },
  ];

  return (
    <div className="space-y-16 py-6">
      {/* 1. Hero Section conforming to 60-30-10 palette & spatial presence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB]">
              <ShieldCheck className="w-4 h-4" />
              <span>Independent Crypto Research & Verified Reward Directory</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#202033] leading-tight text-balance">
              Discover Crypto Rewards, Market Insights & Free USDT Guides
            </h1>

            <p className="text-base sm:text-lg text-[#6D7080] leading-relaxed max-w-2xl">
              Explore cryptocurrency market data, educational earning guides, wallet safety resources,
              and curated reward opportunities without hype or fake promises.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('/earn-usdt')}
                className="neu-btn-primary px-6 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2"
              >
                <Coins className="w-4 h-4" />
                Explore Earning Guides
              </button>
              <button
                onClick={() => onNavigate('/crypto-market')}
                className="neu-btn px-6 py-3.5 rounded-2xl text-sm font-bold text-slate-800 flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-[#6C3BDB]" />
                Explore Crypto Market
              </button>
            </div>

            {/* Quiet verification notes */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-slate-200/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Zero Registration Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                CoinGecko-Powered Pricing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Anti-Phishing Audited
              </span>
            </div>
          </div>

          {/* Hero Visual Terminal */}
          <div className="lg:col-span-5 flex items-center">
            <div className="w-full rounded-3xl neu-raised-card p-3 overflow-hidden group">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900">
                <img
                  src="/src/assets/images/hero_crypto_vault_1793018439020.jpg"
                  alt="Crypto Intelligence Workspace"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-mono text-purple-300">Live Crypto Intelligence</span>
                  <p className="text-sm font-semibold">Institutional Grade Price Feeds & Unbiased Earning Safety</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monetag Ad Slot (Top Leaderboard) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MonetagSlot slotType="banner" />
      </section>

      {/* 2. Live Market Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#202033] tracking-tight">Live Cryptocurrency Market</h2>
            <p className="text-xs sm:text-sm text-[#6D7080]">Real-time CoinGecko market snapshot and 24-hour trends</p>
          </div>
          <button
            onClick={() => onNavigate('/crypto-market')}
            className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB] flex items-center gap-1 self-start sm:self-auto"
          >
            Full Market Overview
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topCoins.map((coin) => {
            const isPositive = coin.priceChange24h >= 0;
            return (
              <div
                key={coin.id}
                onClick={() => onNavigate(`/coin/${coin.id}`)}
                className="neu-raised-card p-5 rounded-2xl cursor-pointer transition-transform hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full bg-white p-0.5"
                      />
                      <div>
                        <h3 className="font-bold text-sm text-[#202033] leading-none">{coin.name}</h3>
                        <span className="text-xs font-semibold text-slate-500 uppercase">{coin.symbol}</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-200/60 text-slate-700">
                      #{coin.marketCapRank}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mt-2">
                    <span className="text-xl font-bold font-mono tabular-nums text-[#202033]">
                      {formatUsd(coin.currentPrice)}
                    </span>
                    <span
                      className={`font-mono text-xs font-semibold tabular-nums flex items-center ${
                        isPositive ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : <TrendingDown className="w-3.5 h-3.5 mr-0.5" />}
                      {formatPercent(coin.priceChange24h)}
                    </span>
                  </div>

                  <div className="mt-3 py-1">
                    <CoinChart data={coin.sparkline} isPositive={isPositive} height={45} />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex justify-between items-center text-xs text-[#6D7080]">
                  <span>Cap: <strong className="font-mono text-slate-800">{formatCompactUsd(coin.marketCap)}</strong></span>
                  <span className="text-[#6C3BDB] font-semibold text-[11px] flex items-center gap-0.5">
                    View Coin <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Earning Guides Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#202033] tracking-tight">Verified Earning Opportunities</h2>
            <p className="text-xs sm:text-sm text-[#6D7080]">
              Audited learning incentives, faucets, and task providers with explicit fee & eligibility terms
            </p>
          </div>
          <button
            onClick={() => onNavigate('/earn-usdt')}
            className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB] flex items-center gap-1 self-start sm:self-auto"
          >
            All 6 Earning Guides
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <div
              key={guide.id}
              className="neu-raised-card p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6D7080] mb-2.5">
                  <span className="font-semibold text-[#6C3BDB]">{guide.category}</span>
                  <span>Verified: {guide.lastVerifiedDate}</span>
                </div>

                <h3 className="font-bold text-base text-[#202033] mb-2 leading-snug">{guide.title}</h3>
                <p className="text-xs text-[#6D7080] leading-relaxed mb-4">{guide.description}</p>

                <div className="space-y-1.5 text-xs text-slate-700 bg-white/60 p-3 rounded-xl border border-slate-200/50 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Provider:</span>
                    <span className="font-medium text-slate-800">{guide.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reward:</span>
                    <span className="font-medium text-purple-700">{guide.rewardRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Withdrawal Min:</span>
                    <span className="font-medium text-slate-800">{guide.withdrawalThreshold}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 text-[11px] text-amber-700 bg-amber-500/10 p-2 rounded-lg">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <p>{guide.riskInformation}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <a
                  href={guide.officialSource}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#6C3BDB] hover:underline flex items-center gap-1"
                >
                  Official Source <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => onNavigate(`/earn-usdt`)}
                  className="text-xs font-semibold text-slate-700 hover:text-[#6C3BDB]"
                >
                  Full Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Crypto News & Binance Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#202033] tracking-tight">Latest Crypto & Exchange News</h2>
            <p className="text-xs sm:text-sm text-[#6D7080]">
              Official announcements, regulatory developments, and market analytics with source attribution
            </p>
          </div>
          <button
            onClick={() => onNavigate('/crypto-news')}
            className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB] flex items-center gap-1 self-start sm:self-auto"
          >
            Browse News Wire
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((news) => (
            <article
              key={news.id}
              onClick={() => onNavigate(`/crypto-news/${news.slug}`)}
              className="neu-raised-card p-5 rounded-2xl cursor-pointer flex flex-col justify-between hover:-translate-y-0.5 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6D7080] mb-2.5">
                  <span className="font-semibold text-[#6C3BDB]">{news.categoryName}</span>
                  <ViewCounter slug={news.slug} />
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#202033] mb-2 leading-snug hover:text-[#6C3BDB] transition-colors">
                  {news.title}
                </h3>
                <p className="text-xs text-[#6D7080] line-clamp-3 leading-relaxed mb-4">{news.summary}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {new Date(news.publishedAt).toLocaleDateString()}
                </span>
                <span className="font-medium text-slate-700">{news.sourceName || 'Wire'}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Editorial Blog Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#202033] tracking-tight">Educational Research & Analysis</h2>
            <p className="text-xs sm:text-sm text-[#6D7080]">In-depth guides on wallet defense, stablecoin mechanics, and reward economics</p>
          </div>
          <button
            onClick={() => onNavigate('/blog')}
            className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB] flex items-center gap-1 self-start sm:self-auto"
          >
            All Articles
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestBlogs.map((blog) => (
            <article
              key={blog.id}
              onClick={() => onNavigate(`/blog/${blog.slug}`)}
              className="neu-raised-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between hover:-translate-y-0.5 transition-transform"
            >
              <div>
                {blog.featuredImage && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-[#6D7080] mb-2">
                    <span className="font-semibold text-[#6C3BDB]">{blog.categoryName}</span>
                    <ViewCounter slug={blog.slug} />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#202033] mb-2 leading-snug hover:text-[#6C3BDB] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-[#6D7080] line-clamp-2 leading-relaxed">{blog.summary}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-1 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </span>
                <span className="text-[#6C3BDB] font-semibold text-xs flex items-center gap-0.5">
                  Read Guide <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Trust & Safety Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neu-raised-card p-8 sm:p-10 rounded-3xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB] mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Free USDT Hub Safety Charter</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202033] tracking-tight mb-4">
              Protecting Your Digital Assets & Avoiding Reward Scams
            </h2>
            <p className="text-sm text-[#6D7080] leading-relaxed mb-6">
              The cryptocurrency space is filled with fraudulent schemes preying on the desire for passive income.
              We rigorously enforce the following research standards across all our guides:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <div className="p-4 rounded-xl bg-white/70 border border-slate-200/60">
              <div className="w-8 h-8 rounded-lg neu-inset flex items-center justify-center text-[#6C3BDB] mb-3">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <h4 className="font-bold text-sm text-[#202033] mb-1">Never Pay to Earn</h4>
              <p className="text-xs text-[#6D7080] leading-relaxed">
                Legitimate earning programs never ask for an upfront "activation deposit" or "gas fee prepayment" to unlock balances.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/70 border border-slate-200/60">
              <div className="w-8 h-8 rounded-lg neu-inset flex items-center justify-center text-[#6C3BDB] mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="font-bold text-sm text-[#202033] mb-1">Hardware & Burners</h4>
              <p className="text-xs text-[#6D7080] leading-relaxed">
                Always isolate your main cold storage from reward claim sites. Use a fresh burner wallet with zero pre-existing assets.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/70 border border-slate-200/60">
              <div className="w-8 h-8 rounded-lg neu-inset flex items-center justify-center text-[#6C3BDB] mb-3">
                <Coins className="w-4 h-4 text-purple-600" />
              </div>
              <h4 className="font-bold text-sm text-[#202033] mb-1">Realistic Math</h4>
              <p className="text-xs text-[#6D7080] leading-relaxed">
                Faucets pay fractions of a cent; micro-surveys pay $0.50–$3. Any service promising hundreds of dollars daily is a Ponzi trap.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/70 border border-slate-200/60">
              <div className="w-8 h-8 rounded-lg neu-inset flex items-center justify-center text-[#6C3BDB] mb-3">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <h4 className="font-bold text-sm text-[#202033] mb-1">Attribution & Source</h4>
              <p className="text-xs text-[#6D7080] leading-relaxed">
                We link directly to official protocols and primary sources so you can verify audit reports, terms, and licenses yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Real FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202033] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#6D7080] mt-2">
            Clear, transparent answers about earning cryptocurrency, market data, and safety
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="neu-raised-card p-6 rounded-2xl">
              <h3 className="font-bold text-base text-[#202033] flex items-start gap-2.5 mb-2.5">
                <HelpCircle className="w-5 h-5 text-[#6C3BDB] shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#6D7080] leading-relaxed pl-7">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
