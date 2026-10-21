import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articlesData';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowLeft,
  Clock,
  ShieldCheck,
  Calendar,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#42152F]">Article Not Found</h2>
        <p className="text-xs text-[#625766]">The requested educational guide could not be located.</p>
        <Link
          to="/learn"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#E83E8C] rounded-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Articles</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs text-[#625766] hover:text-[#42152F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Directory</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#625766]">
            <span className="capitalize font-semibold text-[#E83E8C] bg-[#FFF1F7] px-2.5 py-0.5 rounded-md border border-[#FCE7F3]">
              {article.category.replace('_', ' ')}
            </span>
            <span className="flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              <span>{article.readTimeMinutes} min read</span>
            </span>
            <span>·</span>
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{article.reviewer}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#42152F] leading-tight">
            {article.title}
          </h1>

          <p className="text-base text-[#625766] font-urdu leading-loose">
            {article.urduTitle}
          </p>

          <p className="text-sm text-[#42152F] font-medium leading-relaxed p-4 bg-white border border-[#FCE7F3] rounded-2xl">
            {language === 'ur' ? article.urduSummary : article.summary}
          </p>
        </div>

        {/* Article Body Sections */}
        <div className="space-y-8 bg-white border border-[#FCE7F3] rounded-3xl p-6 sm:p-8">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-lg font-bold text-[#42152F] pb-1 border-b border-[#FCE7F3]">
                {language === 'ur' ? section.urduHeading : section.heading}
              </h2>
              <div className="text-xs sm:text-sm text-[#625766] leading-relaxed whitespace-pre-line">
                {language === 'ur' ? section.urduContent : section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Sources & Citations */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs text-slate-600">
          <div className="font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#E83E8C]" />
            <span>Medical References & Verified Sources</span>
          </div>
          <p className="text-[11px] text-slate-500">
            This article was compiled by the PinkCare Clinical Education Team and reviewed against international oncology clinical guidelines:
          </p>
          <ul className="space-y-1.5 pl-4 list-disc text-[11px]">
            {article.sources.map((src, i) => (
              <li key={i}>
                <span className="font-medium text-slate-700">{src.name}</span> — Published by {src.publisher}
                {src.url && (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-1 text-[#E83E8C] inline-flex items-center gap-0.5 hover:underline"
                  >
                    <span>[Reference]</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
};
