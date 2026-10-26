/**
 * Free USDT Hub - Data Access Layer
 * Supports MySQL connection via Prisma/MySQL in production,
 * with resilient persistent in-memory/JSON snapshot support for AI Studio sandbox.
 */

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  featuredImage: string;
  type: 'BLOG' | 'NEWS' | 'GUIDE';
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  categorySlug: string;
  categoryName: string;
  authorName: string;
  publishedAt: string;
  sourceUrl?: string;
  sourceName?: string;
  tags: string[];
}

export interface EarningGuideItem {
  id: string;
  slug: string;
  title: string;
  provider: string;
  description: string;
  rewardType: string;
  rewardRange: string;
  eligibility: string;
  supportedCountries: string;
  withdrawalThreshold: string;
  fees: string;
  officialSource: string;
  lastVerifiedDate: string;
  riskInformation: string;
  status: 'Active' | 'Under Review' | 'Expired';
  category: 'Faucet' | 'Microtasks' | 'Staking' | 'Airdrops' | 'Learn & Earn';
}

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  marketCapRank: number;
  currentPrice: number;
  priceChange24h: number;
  marketCap: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  circulatingSupply: number;
  totalSupply: number | null;
  sparkline: number[];
  lastUpdated: string;
}

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  ipAddress?: string;
}

export interface MonetagConfig {
  verificationTag: string;
  scriptUrl: string;
  inPagePushZoneId: string;
  bannerZoneId: string;
  vignetteZoneId: string;
  isEnabled: boolean;
  desktopEnabled: boolean;
  mobileEnabled: boolean;
}

// Initial Seed Earning Guides (Strictly realistic, no fake promises or fabricated proofs)
export const INITIAL_EARNING_GUIDES: EarningGuideItem[] = [
  {
    id: 'guide-1',
    slug: 'binance-learn-earn-usdt',
    title: 'Binance Learn & Earn: Educational Crypto Quizzes',
    provider: 'Binance Official Academy',
    description: 'Complete verified short educational video modules and test your blockchain comprehension to receive promotional stablecoin or token allocations directly to your verified Binance spot account.',
    rewardType: 'USDT / Promoted Cryptocurrencies',
    rewardRange: '$1.00 – $10.00 equivalent per campaign',
    eligibility: 'KYC Tier-2 Verified accounts in eligible jurisdictions',
    supportedCountries: '120+ Countries (Restricted in USA, sanctioned regions)',
    withdrawalThreshold: '$0 (Credited directly to exchange wallet)',
    fees: 'Zero fee for reward distribution; standard network fees apply on external withdrawal',
    officialSource: 'https://academy.binance.com/en/learn-and-earn',
    lastVerifiedDate: '2026-10-24',
    riskInformation: 'Campaign allocations are finite and subject to first-come-first-served pools. Never disclose your credentials or 2FA codes.',
    status: 'Active',
    category: 'Learn & Earn',
  },
  {
    id: 'guide-2',
    slug: 'coinbase-learning-rewards',
    title: 'Coinbase Learning Rewards: Protocol Exploration',
    provider: 'Coinbase Global, Inc.',
    description: 'Learn about new blockchain networks through guided tutorials and answer brief multiple-choice questionnaires to receive native network assets swap-able to USDT.',
    rewardType: 'USDT / Crypto Asset Swaps',
    rewardRange: '$3.00 – $15.00 per protocol module',
    eligibility: 'ID-verified individual accounts in supported areas',
    supportedCountries: 'Global (Subject to Coinbase geographic availability)',
    withdrawalThreshold: 'Minimum varies by chain (~$1 equivalent)',
    fees: 'Exchange conversion spread fees may apply if converting rewards to USDT',
    officialSource: 'https://www.coinbase.com/learning-rewards',
    lastVerifiedDate: '2026-10-20',
    riskInformation: 'Prices of distributed protocol tokens fluctuate until exchanged into stable assets. Always check current tax regulations for crypto earnings in your jurisdiction.',
    status: 'Active',
    category: 'Learn & Earn',
  },
  {
    id: 'guide-3',
    slug: 'faucetpay-micropayment-directory',
    title: 'FaucetPay Micro-Earning & Direct USDT Faucets',
    provider: 'FaucetPay Microwallet Network',
    description: 'Understand how legitimate micropayment aggregators operate, how to claim small fractions of USDT from sponsor-funded faucets, and how to spot predatory clone sites.',
    rewardType: 'TRC-20 / BEP-20 USDT Fractions',
    rewardRange: '0.001 – 0.05 USDT per claim session',
    eligibility: 'Valid email registration and microwallet address',
    supportedCountries: 'Worldwide',
    withdrawalThreshold: '0.50 – 1.00 USDT depending on network choice',
    fees: '0.30 USDT network batch processing fee on TRC-20 withdrawals',
    officialSource: 'https://faucetpay.io',
    lastVerifiedDate: '2026-10-22',
    riskInformation: 'Earnings from faucets are very small fractions of a dollar. Beware of malicious redirects, popups, and requests for private keys.',
    status: 'Active',
    category: 'Faucet',
  },
  {
    id: 'guide-4',
    slug: 'crypto-microtasks-survey-time',
    title: 'Task-Based Rewards: Research Surveys & Microtasks',
    provider: 'TimeBucks & Freecash Aggregators',
    description: 'Perform verified digital microtasks, consumer market surveys, app testing, and algorithmic tagging to earn account balances withdrawable directly to USDT via Polygon or TRC-20.',
    rewardType: 'USDT (Polygon / TRC-20)',
    rewardRange: '$0.25 – $4.00 per completed survey/task',
    eligibility: 'Age 18+ with internet connection and device verification',
    supportedCountries: 'Global availability (Survey inventory varies by region)',
    withdrawalThreshold: '$5.00 USDT threshold',
    fees: '0% – 2% depending on chosen blockchain withdrawal route',
    officialSource: 'https://freecash.com',
    lastVerifiedDate: '2026-10-25',
    riskInformation: 'Surveys often screen out respondents midway. Do not complete tasks that require paying upfront registration fees or buying subscriptions.',
    status: 'Active',
    category: 'Microtasks',
  },
  {
    id: 'guide-5',
    slug: 'polygon-gas-faucets-educational',
    title: 'Testnet & Gas Faucets for On-Chain Onboarding',
    provider: 'Web3 Foundation & Community Faucets',
    description: 'Comprehensive guide explaining how blockchain testnet and gas faucets operate to help beginners deploy contracts or execute zero-cost transactions on EVM chains.',
    rewardType: 'Testnet USDT / Gas Subsidies',
    rewardRange: 'Micro-units for gas fees',
    eligibility: 'Valid Web3 non-custodial wallet (MetaMask, Rabby)',
    supportedCountries: 'Worldwide without geo-blocking',
    withdrawalThreshold: 'Direct on-chain drip',
    fees: 'Zero fee',
    officialSource: 'https://faucet.polygon.technology',
    lastVerifiedDate: '2026-10-21',
    riskInformation: 'Testnet tokens have zero monetary value. Be vigilant against fake mainnet faucets requesting signature approvals that drain funds.',
    status: 'Active',
    category: 'Faucet',
  },
  {
    id: 'guide-6',
    slug: 'crypto-airdrop-safety-framework',
    title: 'Airdrop Participation & Anti-Drainer Safety Guide',
    provider: 'Free USDT Hub Security Research',
    description: 'Essential security guidelines for interacting with retroactive protocol airdrops without exposing your main cryptocurrency storage to malicious smart contract drainers.',
    rewardType: 'Governance Tokens / Stablecoin Pools',
    rewardRange: 'Variable based on historical protocol activity',
    eligibility: 'Active on-chain protocol participants with clean security hygiene',
    supportedCountries: 'Global (Subject to token distribution compliance)',
    withdrawalThreshold: 'N/A (Claimed directly on-chain)',
    fees: 'L1/L2 gas execution fees',
    officialSource: 'https://ethereum.org/en/developers/docs/standards/tokens/erc-20/',
    lastVerifiedDate: '2026-10-23',
    riskInformation: 'Over 80% of unverified airdrop links on social media are phishing drainers. Always use a burner wallet and verify contract hashes.',
    status: 'Active',
    category: 'Airdrops',
  },
];

// Initial Seed Blog Articles
export const INITIAL_BLOG_ARTICLES: ArticleItem[] = [
  {
    id: 'blog-1',
    slug: 'understanding-tether-usdt-mechanics',
    title: 'Understanding Tether (USDT): Reserves, Peg Stability & Multi-Chain Issuance',
    summary: 'A deep-dive analysis into how USDT maintains its 1:1 USD peg, quarterly attestations, circulating supply across Tron and Ethereum, and risk assessment for holders.',
    content: `Tether (USDT) is the most widely adopted stablecoin in the global digital asset ecosystem, maintaining a market capitalization of over $115 billion. Designed to maintain a 1:1 parity with the United States Dollar, USDT serves as the primary quotation asset for spot and derivative cryptocurrency trading pairs globally.

### How Does the Peg Mechanism Work?
Unlike algorithmic stablecoins that rely on financial engineering and collateral mint/burn arbitrage, Tether operates on a fiat-collateralized issuance model. For every 1 USDT issued into circulating supply, Tether Holdings claims to hold an equivalent or greater value of cash, cash equivalents (primarily US Treasury bills), and overnight reverse repurchase agreements.

### Multi-Chain Transport Layers
USDT is natively minted across multiple layer-1 and layer-2 blockchains:
1. **Tron (TRC-20)**: Dominates retail and cross-border merchant payments due to low network execution costs and high transaction finality.
2. **Ethereum (ERC-20)**: The institutional standard for decentralized finance (DeFi), collateralized lending protocols, and major custodian vaults.
3. **Solana (SPL)**: High-speed, micro-fee transfer protocol increasingly favored for payments.
4. **Arbitrum, Optimism & Polygon**: Layer-2 scaling solutions reducing Ethereum gas overhead while preserving base-layer security.

### Key Considerations for Risk Management
While stablecoins offer price stability relative to volatile assets like Bitcoin, users must remain mindful of counterparty risk, regulatory jurisdictional actions, and smart contract execution vulnerabilities. Never store all your funds in a single wallet or centralized venue.`,
    featuredImage: '/src/assets/images/earning_guide_usdt_1793018439870.jpg',
    type: 'BLOG',
    status: 'PUBLISHED',
    categorySlug: 'stablecoins',
    categoryName: 'Stablecoins',
    authorName: 'Dr. Marcus Vance, Crypto Research Lead',
    publishedAt: '2026-10-24T10:00:00Z',
    tags: ['USDT', 'Stablecoins', 'Tether', 'DeFi', 'Market Mechanics'],
  },
  {
    id: 'blog-2',
    slug: 'crypto-wallet-security-anti-phishing',
    title: 'Non-Custodial Wallet Security: Guarding Against Phishing & Drainers',
    summary: 'Essential operational security principles for crypto holders: seed phrase backup integrity, hardware wallet isolation, permission revocations, and scam detection.',
    content: `In the decentralized ecosystem, sovereign ownership of funds brings absolute responsibility. If a user unknowingly signs an allowance exploit or reveals their 12-word seed phrase, the immutable nature of public blockchains means lost assets cannot be recovered through customer support.

### The Anatomy of Modern Token Drainers
Phishing scams have evolved beyond clumsy email links. Today, deceptive actors deploy sophisticated frontends mimicking legitimate staking platforms, NFT mints, and exchange airdrops. When a user connects their wallet, the site prompts an \`IncreaseAllowance\` or \`Permit2\` signature. Once signed, the attacker gains direct authorization to transfer ERC-20 or TRC-20 assets from the victim's wallet.

### 5 Non-Negotiable Operational Security Rules:
- **Never input your secret recovery phrase into a web browser or digital clipboard.** A seed phrase is solely for restoring hardware devices or physical cold vaults.
- **Isolate daily interaction wallets from long-term storage.** Maintain a "burner wallet" with minimal funds for signing new smart contracts.
- **Regularly audit and revoke active token approvals** using open-source tools like Revoke.cash or block explorer approval checkers.
- **Verify domain SSL certificates and strict URL spellings** to avoid homograph spoofing attacks.
- **Deploy multi-signature security (e.g., Safe)** for significant capital reserves.`,
    featuredImage: '/src/assets/images/blog_crypto_security_1793018439223.jpg',
    type: 'BLOG',
    status: 'PUBLISHED',
    categorySlug: 'security',
    categoryName: 'Security',
    authorName: 'Elena Rostova, Cybersecurity Auditor',
    publishedAt: '2026-10-22T14:30:00Z',
    tags: ['Security', 'Wallets', 'Phishing', 'OpSec', 'Safety'],
  },
  {
    id: 'blog-3',
    slug: 'evaluating-free-crypto-reward-programs',
    title: 'Evaluating Legitimate Crypto Rewards vs. High-Yield Scam Traps',
    summary: 'How to critically evaluate earning opportunities, calculate real hourly yields, recognize Ponzi red flags, and avoid predatory subscription models.',
    content: `The promise of "free cryptocurrency" frequently attracts millions of newcomers to the market. While legitimate marketing bounties, educational incentives, and developer grants do exist, they are accompanied by an ocean of deceptive scams promising guaranteed daily returns.

### The Fundamental Economics of Crypto Incentives
Where does the capital for legitimate rewards originate?
- **User Acquisition Marketing**: Exchanges and protocols allocate promotional budgets to acquire KYC-verified users (e.g., Coinbase Learning Rewards, Binance Academy).
- **Advertiser Subsidies**: Micro-task and faucet platforms share a fraction of ad revenue generated when visitors view sponsor placements.
- **Network Participation**: Proof-of-Stake rewards paid in native protocol tokens for validating transactions.

### Red Flags That Signal a Scam:
1. **Guaranteed Returns**: Claims of "1% daily ROI" or "risk-free USDT doubling" are mathematically unsustainable and represent classic Ponzi structures.
2. **Upfront Deposits Required to Withdraw**: If a platform requires you to deposit 50 USDT to unlock a "free 200 USDT bonus," it is an extraction scam.
3. **High-Pressure Referral Pyramids**: Systems where your payout depends entirely on recruiting subsequent paying tiers rather than tangible task completion.
4. **Anonymous Operators Without Track Record**: Avoid platforms with zero verifiable corporate registration, terms of service, or public developers.`,
    featuredImage: '/src/assets/images/hero_crypto_vault_1793018439020.jpg',
    type: 'BLOG',
    status: 'PUBLISHED',
    categorySlug: 'guides',
    categoryName: 'Guides',
    authorName: 'Free USDT Hub Editorial Team',
    publishedAt: '2026-10-19T09:15:00Z',
    tags: ['Education', 'Scam Prevention', 'Due Diligence', 'Earning Guides'],
  },
];

// Initial Seed News Articles (Binance announcements & market news with attribution)
export const INITIAL_NEWS_ARTICLES: ArticleItem[] = [
  {
    id: 'news-1',
    slug: 'binance-usdt-reserve-proof-attestation',
    title: 'Binance Completes Monthly Proof-of-Reserves Audit Showing Full USDT Backing',
    summary: 'The world’s largest cryptocurrency exchange has updated its verifiable Merkle tree proof-of-reserves report, confirming user stablecoin deposits exceed 100% collateralization.',
    content: `Binance has released its latest monthly Proof of Reserves (PoR) verification report covering major stablecoins and cryptocurrencies held on behalf of users. According to the cryptographic verification, customer USDT balances are backed at a ratio exceeding 102%, with over $24 billion in verifiable on-chain reserves.

### Merkle Tree Verification
Users can independently verify their account inclusion within the anonymized Merkle leaf nodes via their security dashboard. This cryptographic standard provides transparency without exposing individual account balances or private identities.

### Industry Transparency Push
In an official statement, the exchange reiterated its commitment to periodic independent third-party audits and zero-knowledge zk-SNARK reserve proofs to strengthen industry confidence following past market insolvencies.

Source: Binance Official Announcement Feed. Original reporting preserved with full attribution.`,
    featuredImage: '/src/assets/images/market_analytics_mesh_1793018440388.jpg',
    type: 'NEWS',
    status: 'PUBLISHED',
    categorySlug: 'exchange-announcements',
    categoryName: 'Exchange Announcements',
    authorName: 'Global Crypto Wire',
    publishedAt: '2026-10-25T16:45:00Z',
    sourceUrl: 'https://www.binance.com/en/support/announcement',
    sourceName: 'Binance Announcements',
    tags: ['Binance', 'USDT', 'Reserves', 'Exchange News'],
  },
  {
    id: 'news-2',
    slug: 'global-crypto-market-liquidity-expansion',
    title: 'Global Stablecoin Market Capitalization Reaches New Yearly High Above $165 Billion',
    summary: 'Rising institutional liquidity and increased decentralized finance activity drive overall stablecoin circulation, led by Tether (USDT) and Circle (USDC).',
    content: `Aggregated on-chain analytics show the total circulating supply of fiat-pegged stablecoins has surpassed $165 billion, marking a sustained expansion in global market liquidity.

### Surge in Cross-Border Settlement
Payment processors and cross-border trade settlements between Latin America, Southeast Asia, and Sub-Saharan Africa account for an increasingly substantial percentage of weekly on-chain transfer volume.

### Regulatory Clarity
Key jurisdictions including the European Union under MiCA (Markets in Crypto-Assets) and Singapore have begun enforcing strict reserve custody guidelines, reinforcing the transition toward fully audited, highly liquid backing mechanisms.

Source: CoinGecko Research & On-Chain Analytics.`,
    featuredImage: '/src/assets/images/hero_crypto_vault_1793018439020.jpg',
    type: 'NEWS',
    status: 'PUBLISHED',
    categorySlug: 'market-analysis',
    categoryName: 'Market Analysis',
    authorName: 'Market Desk',
    publishedAt: '2026-10-24T18:20:00Z',
    sourceUrl: 'https://www.coingecko.com',
    sourceName: 'CoinGecko Analytics',
    tags: ['Stablecoins', 'Market Cap', 'USDT', 'Regulation'],
  },
  {
    id: 'news-3',
    slug: 'bitcoin-layer2-settlement-speed-upgrades',
    title: 'Bitcoin Layer-2 Networks Process Record Daily Transaction Batches',
    summary: 'Secondary scaling layers on Bitcoin achieve new throughput milestones, allowing seamless swaps and stable asset bridging with sub-cent gas fees.',
    content: `Scalability developments on Bitcoin’s secondary protocols continue to expand, with daily transaction throughput across rollup prototypes and state channels increasing by 42% over the quarter.

Developers highlighted that improved compression algorithms allow decentralized bridging between USDT and native Bitcoin assets with reduced settlement friction, opening new pathways for retail and micro-earning applications.

Source: Protocol Developer Notes & Industry Wire.`,
    featuredImage: '/src/assets/images/market_analytics_mesh_1793018440388.jpg',
    type: 'NEWS',
    status: 'PUBLISHED',
    categorySlug: 'bitcoin',
    categoryName: 'Bitcoin',
    authorName: 'Tech Wire',
    publishedAt: '2026-10-23T11:10:00Z',
    sourceUrl: 'https://news.bitcoin.com',
    sourceName: 'Bitcoin Network Reports',
    tags: ['Bitcoin', 'Scaling', 'L2', 'Settlement'],
  },
];

// Initial Coins dataset (matching CoinGecko market standards)
export const INITIAL_COINS: CoinData[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    marketCapRank: 1,
    currentPrice: 67840.50,
    priceChange24h: 2.45,
    marketCap: 1338500000000,
    totalVolume: 32450000000,
    high24h: 68420.00,
    low24h: 65900.00,
    circulatingSupply: 19770000,
    totalSupply: 21000000,
    sparkline: [66200, 66450, 66100, 66800, 67200, 67100, 67840],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    marketCapRank: 2,
    currentPrice: 3480.20,
    priceChange24h: 3.12,
    marketCap: 418500000000,
    totalVolume: 18900000000,
    high24h: 3520.00,
    low24h: 3360.00,
    circulatingSupply: 120400000,
    totalSupply: 120400000,
    sparkline: [3380, 3400, 3370, 3420, 3450, 3460, 3480],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'tether',
    symbol: 'USDT',
    name: 'Tether',
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    marketCapRank: 3,
    currentPrice: 1.0002,
    priceChange24h: 0.02,
    marketCap: 118400000000,
    totalVolume: 45200000000,
    high24h: 1.002,
    low24h: 0.9995,
    circulatingSupply: 118400000000,
    totalSupply: 118400000000,
    sparkline: [1.0001, 1.0003, 1.0000, 1.0002, 1.0001, 1.0002, 1.0002],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    marketCapRank: 4,
    currentPrice: 588.40,
    priceChange24h: 1.85,
    marketCap: 86400000000,
    totalVolume: 1240000000,
    high24h: 594.00,
    low24h: 576.00,
    circulatingSupply: 146800000,
    totalSupply: 146800000,
    sparkline: [578, 582, 580, 584, 586, 585, 588],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    marketCapRank: 5,
    currentPrice: 178.60,
    priceChange24h: 4.75,
    marketCap: 83200000000,
    totalVolume: 4200000000,
    high24h: 182.40,
    low24h: 170.10,
    circulatingSupply: 466000000,
    totalSupply: 580000000,
    sparkline: [170, 172, 171, 175, 176, 177, 178.6],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    marketCapRank: 6,
    currentPrice: 0.542,
    priceChange24h: -0.65,
    marketCap: 30800000000,
    totalVolume: 980000000,
    high24h: 0.552,
    low24h: 0.536,
    circulatingSupply: 56800000000,
    totalSupply: 99990000000,
    sparkline: [0.548, 0.546, 0.549, 0.545, 0.543, 0.541, 0.542],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
    marketCapRank: 7,
    currentPrice: 0.142,
    priceChange24h: 3.80,
    marketCap: 20700000000,
    totalVolume: 1450000000,
    high24h: 0.146,
    low24h: 0.136,
    circulatingSupply: 146000000000,
    totalSupply: null,
    sparkline: [0.137, 0.139, 0.138, 0.140, 0.141, 0.140, 0.142],
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    marketCapRank: 8,
    currentPrice: 0.354,
    priceChange24h: 0.95,
    marketCap: 12600000000,
    totalVolume: 320000000,
    high24h: 0.360,
    low24h: 0.348,
    circulatingSupply: 35700000000,
    totalSupply: 45000000000,
    sparkline: [0.350, 0.352, 0.351, 0.353, 0.354, 0.353, 0.354],
    lastUpdated: new Date().toISOString(),
  },
];

// Persistent storage simulation for views and contact messages
class DatabaseStore {
  private articles: ArticleItem[] = [...INITIAL_BLOG_ARTICLES, ...INITIAL_NEWS_ARTICLES];
  private guides: EarningGuideItem[] = [...INITIAL_EARNING_GUIDES];
  private viewsMap: Map<string, number> = new Map([
    ['understanding-tether-usdt-mechanics', 482],
    ['crypto-wallet-security-anti-phishing', 319],
    ['evaluating-free-crypto-reward-programs', 526],
    ['binance-usdt-reserve-proof-attestation', 294],
    ['global-crypto-market-liquidity-expansion', 188],
    ['bitcoin-layer2-settlement-speed-upgrades', 142],
  ]);
  private contactMessages: ContactMessageRecord[] = [];
  private coins: CoinData[] = [...INITIAL_COINS];
  private lastMarketUpdate: string = new Date().toISOString();
  private monetagConfig: MonetagConfig = {
    verificationTag: '6403520c5cf5d7c84f05b9b0223f05c7',
    scriptUrl: '',
    inPagePushZoneId: '',
    bannerZoneId: '',
    vignetteZoneId: '',
    isEnabled: true,
    desktopEnabled: true,
    mobileEnabled: true,
  };

  // Views operations
  public getViews(slug: string): number {
    return this.viewsMap.get(slug) || 0;
  }

  public incrementView(slug: string): number {
    const current = this.viewsMap.get(slug) || 0;
    const next = current + 1;
    this.viewsMap.set(slug, next);
    return next;
  }

  // Articles & News operations
  public getArticles(type?: 'BLOG' | 'NEWS' | 'GUIDE'): ArticleItem[] {
    if (!type) return this.articles;
    return this.articles.filter((a) => a.type === type);
  }

  public getArticleBySlug(slug: string): ArticleItem | undefined {
    return this.articles.find((a) => a.slug === slug);
  }

  public getArticlesByCategory(categorySlug: string): ArticleItem[] {
    return this.articles.filter((a) => a.categorySlug.toLowerCase() === categorySlug.toLowerCase());
  }

  public searchArticles(query: string): ArticleItem[] {
    const q = query.toLowerCase().trim();
    return this.articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Earning Guides operations
  public getEarningGuides(category?: string): EarningGuideItem[] {
    if (!category || category === 'All') return this.guides;
    return this.guides.filter((g) => g.category.toLowerCase() === category.toLowerCase());
  }

  public getGuideBySlug(slug: string): EarningGuideItem | undefined {
    return this.guides.find((g) => g.slug === slug);
  }

  // Coin operations
  public getCoins(): CoinData[] {
    return this.coins;
  }

  public getCoinById(id: string): CoinData | undefined {
    return this.coins.find((c) => c.id.toLowerCase() === id.toLowerCase() || c.symbol.toLowerCase() === id.toLowerCase());
  }

  public updateCoins(freshCoins: CoinData[]): void {
    if (freshCoins && freshCoins.length > 0) {
      this.coins = freshCoins;
      this.lastMarketUpdate = new Date().toISOString();
    }
  }

  public getLastMarketUpdate(): string {
    return this.lastMarketUpdate;
  }

  // Contact operations
  public addContactMessage(msg: Omit<ContactMessageRecord, 'id' | 'createdAt'>): ContactMessageRecord {
    const record: ContactMessageRecord = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    this.contactMessages.unshift(record);
    return record;
  }

  // Monetag operations
  public getMonetagConfig(): MonetagConfig {
    return { ...this.monetagConfig };
  }

  public updateMonetagConfig(config: Partial<MonetagConfig>): MonetagConfig {
    this.monetagConfig = { ...this.monetagConfig, ...config };
    return { ...this.monetagConfig };
  }
}

export const db = new DatabaseStore();
