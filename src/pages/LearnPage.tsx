import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES_DATA, Article } from '../data/articlesData';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Search, Clock, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const LearnPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'warning_signs', 'screening', 'risk_factors', 'patient_guide'];

  const categoryLabels: Record<string, string> = {
    All: 'All Articles',
    warning_signs: 'Warning Signs',
    screening: 'Screening & Mammography',
    risk_factors: 'Risk Factors & Myths',
    patient_guide: 'Patient Guides',
  };

  const filteredArticles = ARTICLES_DATA.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.urduTitle.includes(searchTerm);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <BookOpen className="w-4 h-4" />
            <span>Verified Educational Library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#42152F] mt-1">
            {language === 'ur' ? 'طبی آگاہی اور تعلیمی مضامین' : 'Breast Health Educational Articles & Guides'}
          </h1>
          <p className="text-sm text-[#625766] mt-2 leading-relaxed max-w-2xl">
            Evidence-based guides reviewed by healthcare professionals, covering warning signs, screening protocols, questions for your doctor, and navigating breast care in Pakistan.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white border border-[#FCE7F3] rounded-2xl shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#E83E8C] text-white'
                    : 'bg-[#FFF8FB] text-[#42152F] border border-[#FCE7F3] hover:border-[#E83E8C]'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#625766] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl text-xs text-[#25202A] outline-none focus:border-[#E83E8C]"
            />
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-[#FCE7F3] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#625766]">
                  <span className="capitalize font-semibold text-[#E83E8C] bg-[#FFF1F7] px-2 py-0.5 rounded">
                    {categoryLabels[article.category] || article.category}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTimeMinutes} min read</span>
                  </span>
                </div>

                <h2 className="text-base font-bold text-[#42152F] hover:text-[#E83E8C] transition-colors leading-snug">
                  <Link to={`/learn/${article.slug}`}>{article.title}</Link>
                </h2>
                <p className="text-xs text-[#625766] font-urdu leading-relaxed">
                  {article.urduTitle}
                </p>

                <p className="text-xs text-[#625766] leading-relaxed line-clamp-3">
                  {language === 'ur' ? article.urduSummary : article.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#FCE7F3] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[11px] text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Clinically Reviewed</span>
                </div>

                <Link
                  to={`/learn/${article.slug}`}
                  className="font-semibold text-[#E83E8C] hover:text-[#D81B60] flex items-center gap-1 text-xs"
                >
                  <span>{t('readMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
