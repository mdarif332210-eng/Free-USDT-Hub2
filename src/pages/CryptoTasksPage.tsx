import React from 'react';
import { CheckSquare, ShieldCheck, Clock, ExternalLink, ArrowRight } from 'lucide-react';
import { EarningGuideItem } from '../lib/db';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface CryptoTasksPageProps {
  guides: EarningGuideItem[];
  onNavigate: (path: string) => void;
}

export const CryptoTasksPage: React.FC<CryptoTasksPageProps> = ({ guides, onNavigate }) => {
  const taskGuides = guides.filter((g) => g.category === 'Microtasks' || g.category === 'Learn & Earn');

  const taskComparison = [
    {
      taskType: 'Learn & Earn Quizzes',
      avgTime: '5 – 15 Minutes',
      payoutRange: '$1.00 – $10.00',
      difficulty: 'Beginner',
      risk: 'Zero (Official Exchanges)',
    },
    {
      taskType: 'Consumer Research Surveys',
      avgTime: '10 – 25 Minutes',
      payoutRange: '$0.50 – $3.50',
      difficulty: 'Easy',
      risk: 'Low (Mid-survey disqualification common)',
    },
    {
      taskType: 'Beta App & QA Testing',
      avgTime: '30 – 60 Minutes',
      payoutRange: '$5.00 – $25.00',
      difficulty: 'Intermediate',
      risk: 'Low (Must follow submission guidelines)',
    },
    {
      taskType: 'Security Bug Bounties',
      avgTime: 'Several Hours',
      payoutRange: '$100 – $50,000+',
      difficulty: 'Expert',
      risk: 'Requires deep smart-contract auditing skills',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB]">
          <CheckSquare className="w-4 h-4" />
          <span>Task-Based Rewards Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
          Crypto Tasks, Surveys & Micro-Earning Opportunities
        </h1>
        <p className="text-sm sm:text-base text-[#6D7080] leading-relaxed">
          Exchange digital micro-labor and survey participation for direct USDT and cryptocurrency rewards.
          Compare verified platforms, average hourly yields, and withdrawal requirements.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="neu-raised-card p-6 sm:p-8 rounded-3xl space-y-5">
        <h2 className="text-xl font-bold text-[#202033]">
          Task Type Yield & Commitment Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-3">Task Category</th>
                <th className="py-3 px-3">Avg. Time Required</th>
                <th className="py-3 px-3">Typical Reward</th>
                <th className="py-3 px-3">Skill Level</th>
                <th className="py-3 px-3">Risk Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 text-slate-800">
              {taskComparison.map((row, i) => (
                <tr key={i} className="hover:bg-white/40 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-slate-900">{row.taskType}</td>
                  <td className="py-3.5 px-3 font-mono tabular-nums text-slate-600">{row.avgTime}</td>
                  <td className="py-3.5 px-3 font-mono tabular-nums font-semibold text-purple-700">{row.payoutRange}</td>
                  <td className="py-3.5 px-3 text-slate-700">{row.difficulty}</td>
                  <td className="py-3.5 px-3 text-slate-600 text-[11px]">{row.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verified Task Platforms */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#202033] tracking-tight">
          Verified Task & Survey Aggregators
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {taskGuides.map((guide) => (
            <div key={guide.id} className="neu-raised-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-xs text-[#6D7080] mb-2">
                  <span className="font-semibold text-[#6C3BDB]">{guide.category}</span>
                  <span className="text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded text-[11px] font-medium">
                    Verified {guide.lastVerifiedDate}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#202033] mb-2">{guide.title}</h3>
                <p className="text-xs text-[#6D7080] leading-relaxed mb-4">{guide.description}</p>

                <div className="bg-white/70 p-3 rounded-xl border border-slate-200/50 text-xs space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Provider:</span>
                    <span className="font-semibold text-slate-800">{guide.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reward:</span>
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
    </div>
  );
};
