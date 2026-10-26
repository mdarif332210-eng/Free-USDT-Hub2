import React from 'react';
import {
  CalendarDays,
  User,
  ArrowLeft,
  ExternalLink,
  Tag,
  Share2,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';
import { ArticleItem } from '../lib/db';
import { ViewCounter } from '../components/common/ViewCounter';
import { MonetagSlot } from '../components/ads/MonetagSlot';

interface ArticleDetailPageProps {
  slug: string;
  articles: ArticleItem[];
  onNavigate: (path: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  slug,
  articles,
  onNavigate,
}) => {
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Article Not Found</h1>
        <p className="text-xs text-slate-600">The requested article could not be located in our publication index.</p>
        <button
          onClick={() => onNavigate('/blog')}
          className="neu-btn px-4 py-2 rounded-xl text-xs font-semibold text-[#6C3BDB]"
        >
          Return to Blog
        </button>
      </div>
    );
  }

  const isNews = article.type === 'NEWS';
  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug && (a.categorySlug === article.categorySlug || a.type === article.type))
    .slice(0, 3);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate(isNews ? '/crypto-news' : '/blog')}
          className="neu-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {isNews ? 'Crypto News' : 'Blog'}
        </button>
      </div>

      {/* Article Header Card */}
      <div className="neu-raised-card p-6 sm:p-10 rounded-3xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#6D7080] border-b border-slate-200/60 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate(`/category/${article.categorySlug}`)}
              className="font-bold text-[#6C3BDB] hover:underline"
            >
              {article.categoryName}
            </button>
            <span>·</span>
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <CalendarDays className="w-3.5 h-3.5" />
              {new Date(article.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* View Counter with automatic increment on mount */}
          <div className="flex items-center gap-4">
            <ViewCounter slug={article.slug} incrementOnMount={true} />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202033] tracking-tight leading-snug">
          {article.title}
        </h1>

        <p className="text-base text-[#6D7080] leading-relaxed italic border-l-2 border-[#6C3BDB] pl-4">
          {article.summary}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-600 pt-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full neu-inset flex items-center justify-center text-[#6C3BDB]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-slate-900 block">{article.authorName}</span>
              <span className="text-[11px] text-slate-500">Editorial Desk</span>
            </div>
          </div>

          {article.sourceUrl && (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="neu-btn px-3 py-1.5 rounded-lg text-xs font-semibold text-[#6C3BDB] flex items-center gap-1"
            >
              Source: {article.sourceName || 'External'}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {article.featuredImage && (
        <div className="neu-raised-card rounded-3xl overflow-hidden p-2">
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-200">
            <img
              src={article.featuredImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Monetag Ad (In-Content) */}
      <MonetagSlot slotType="banner" />

      {/* Main Content Body */}
      <div className="neu-raised-card p-6 sm:p-10 rounded-3xl space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed">
        {article.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-xl font-bold text-[#202033] pt-4 pb-1">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            const listItems = paragraph.split('\n');
            return (
              <ul key={idx} className="space-y-2 pl-4 list-disc text-slate-700">
                {listItems.map((li, liIdx) => (
                  <li key={liIdx}>{li.replace(/^- /, '')}</li>
                ))}
              </ul>
            );
          }
          if (paragraph.match(/^\d+\. /)) {
            const listItems = paragraph.split('\n');
            return (
              <ol key={idx} className="space-y-2 pl-4 list-decimal text-slate-700">
                {listItems.map((li, liIdx) => (
                  <li key={liIdx}>{li.replace(/^\d+\. /, '')}</li>
                ))}
              </ol>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-200/60 flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-slate-400 mr-1" />
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related Content */}
      {relatedArticles.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-lg font-bold text-[#202033]">Related Research & Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate(rel.type === 'NEWS' ? `/crypto-news/${rel.slug}` : `/blog/${rel.slug}`)}
                className="neu-raised-card p-5 rounded-2xl cursor-pointer hover:-translate-y-0.5 transition-transform"
              >
                <span className="text-xs font-bold text-[#6C3BDB] block mb-2">{rel.categoryName}</span>
                <h4 className="font-bold text-sm text-[#202033] line-clamp-2 mb-2 leading-snug">{rel.title}</h4>
                <div className="pt-3 border-t border-slate-200/50 flex items-center justify-between text-xs text-slate-500">
                  <ViewCounter slug={rel.slug} />
                  <span>Read Article</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monetag Ad (Bottom) */}
      <MonetagSlot slotType="native" />
    </article>
  );
};
