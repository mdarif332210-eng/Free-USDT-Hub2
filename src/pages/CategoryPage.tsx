import React from 'react';
import { ArrowLeft, Tag, CalendarDays, ArrowUpRight } from 'lucide-react';
import { ArticleItem } from '../lib/db';
import { ViewCounter } from '../components/common/ViewCounter';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface CategoryPageProps {
  categorySlug: string;
  articles: ArticleItem[];
  onNavigate: (path: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categorySlug,
  articles,
  onNavigate,
}) => {
  const filtered = articles.filter(
    (a) => a.categorySlug.toLowerCase() === categorySlug.toLowerCase()
  );

  const categoryName = filtered[0]?.categoryName || categorySlug.replace(/-/g, ' ').toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('/blog')}
          className="neu-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Topics
        </button>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6C3BDB]">
          <Tag className="w-4 h-4" />
          <span>Category Archive</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202033] tracking-tight">
          {categoryName}
        </h1>
        <p className="text-xs sm:text-sm text-[#6D7080]">
          Showing {filtered.length} curated articles and announcements in this archive.
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <article
              key={item.id}
              onClick={() => onNavigate(item.type === 'NEWS' ? `/crypto-news/${item.slug}` : `/blog/${item.slug}`)}
              className="neu-raised-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between hover:-translate-y-0.5 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#6D7080] mb-2.5">
                  <span className="font-bold text-[#6C3BDB]">{item.type}</span>
                  <ViewCounter slug={item.slug} />
                </div>
                <h2 className="font-bold text-base text-[#202033] mb-2 leading-snug hover:text-[#6C3BDB] transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs text-[#6D7080] line-clamp-3 leading-relaxed mb-4">{item.summary}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {new Date(item.publishedAt).toLocaleDateString()}
                </span>
                <span className="text-[#6C3BDB] font-semibold flex items-center gap-0.5">
                  Read <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="neu-inset p-12 rounded-3xl text-center space-y-3">
          <p className="text-slate-700 font-medium text-sm">No articles found in this category yet.</p>
          <button
            onClick={() => onNavigate('/blog')}
            className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB]"
          >
            Browse All Blog Articles
          </button>
        </div>
      )}

      {/* Monetag Ad */}
      <MonetagSlot slotType="banner" />
    </div>
  );
};
