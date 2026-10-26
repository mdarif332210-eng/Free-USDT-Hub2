import React, { useState } from 'react';
import { BookOpen, CalendarDays, Search, ArrowUpRight } from 'lucide-react';
import { ArticleItem } from '../lib/db';
import { ViewCounter } from '../components/common/ViewCounter';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface BlogPageProps {
  articles: ArticleItem[];
  onNavigate: (path: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ articles, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const blogArticles = articles.filter((a) => a.type === 'BLOG');
  const categories = ['All', 'Stablecoins', 'Security', 'Guides'];

  const filtered = blogArticles.filter((item) => {
    const matchesCat =
      selectedCategory === 'All' || item.categoryName.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6C3BDB]">
          <BookOpen className="w-4 h-4" />
          <span>In-Depth Research & OpSec Insights</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
          Cryptocurrency Editorial & Research Blog
        </h1>
        <p className="text-sm sm:text-base text-[#6D7080] leading-relaxed">
          Comprehensive deep-dives into stablecoin architecture, smart contract approval security,
          market microstructure, and realistic yield evaluation.
        </p>
      </div>

      {/* Category Tabs & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'neu-btn-primary'
                  : 'neu-btn text-slate-700 hover:text-[#6C3BDB]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search research articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl neu-inset focus:outline-none focus:ring-1 focus:ring-[#6C3BDB] text-slate-800"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((post) => (
          <article
            key={post.id}
            onClick={() => onNavigate(`/blog/${post.slug}`)}
            className="neu-raised-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between hover:-translate-y-0.5 transition-transform"
          >
            <div>
              {post.featuredImage && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-200">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-[#6D7080] mb-2.5">
                  <span className="font-bold text-[#6C3BDB]">{post.categoryName}</span>
                  <ViewCounter slug={post.slug} />
                </div>

                <h2 className="font-bold text-base sm:text-lg text-[#202033] mb-2.5 leading-snug hover:text-[#6C3BDB] transition-colors">
                  {post.title}
                </h2>
                <p className="text-xs text-[#6D7080] line-clamp-3 leading-relaxed mb-4">
                  {post.summary}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200/50">
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <CalendarDays className="w-3.5 h-3.5" />
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
              <span className="text-[#6C3BDB] font-semibold flex items-center gap-1">
                Read Article <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Monetag Ad */}
      <MonetagSlot slotType="banner" />
    </div>
  );
};
