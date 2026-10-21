import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ThreeRibbonCanvas } from '../components/ThreeRibbonCanvas';
import { PinkRibbonLogo } from '../components/PinkRibbonLogo';
import {
  MapPin,
  Search,
  ShieldCheck,
  AlertCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  Heart,
  ChevronRight,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      navigate(searchCity ? `/find-care?city=${encodeURIComponent(searchCity)}` : '/find-care');
    }, 450);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF1F7] via-[#FFF8FB] to-white py-12 lg:py-20 border-b border-[#FCE7F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Mission, Value Proposition, Action CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Quiet, unboxed metadata */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
                <span>Evidence-Based Healthcare Initiative</span>
                <span className="text-[#625766]">·</span>
                <span>Pakistan Nationwide</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#42152F] tracking-tight leading-tight">
                {language === 'ur' ? (
                  <span className="font-urdu leading-loose">
                    چھاتی کی صحت سے آگاہی، علامات کی بروقت پہچان اور قریبی ہسپتالوں کی تلاش
                  </span>
                ) : (
                  <>
                    Knowledge Saves Lives.{' '}
                    <span className="text-[#E83E8C]">Early Evaluation</span> Makes the Difference.
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-[#625766] max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {language === 'ur'
                  ? 'پاکستان میں چھاتی کے کینسر کے خطرے، اسکریننگ کے اصول اور تصدیق شدہ ہسپتالوں کے بارے میں درست اور مستند معلومات حاصل کریں۔'
                  : 'Empowering women and families across Pakistan with scientifically validated breast health guidelines, warning sign education, and a verified directory of oncology care centres.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/find-care"
                  className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#E83E8C] hover:bg-[#D81B60] rounded-xl shadow-sm transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{t('findCareBtn')}</span>
                </Link>

                <Link
                  to="/warning-signs"
                  className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#42152F] bg-white hover:bg-[#FCE7F3] border border-[#FCE7F3] rounded-xl transition-all"
                >
                  <Activity className="w-4 h-4 text-[#E83E8C]" />
                  <span>{t('exploreBtn')}</span>
                </Link>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-[#625766]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Non-Diagnostic Platform</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Medical Sources</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Free Public Access</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Awareness Ribbon */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="w-full max-w-[420px] aspect-square rounded-3xl bg-gradient-to-tr from-[#FFF0F5] to-white/90 border border-[#FCE7F3] p-4 shadow-sm relative">
                {/* 3D Canvas with WebGL fallback */}
                <ThreeRibbonCanvas />

                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="text-[11px] text-[#625766]/75 font-medium select-none">
                    Interactive 3D Awareness Ribbon · Move cursor to rotate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Fast Search Bar with Ribbon Animation Trigger */}
      <section className="bg-white py-8 border-b border-[#FCE7F3] shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 p-2 bg-[#FFF8FB] border border-[#FCE7F3] rounded-2xl shadow-xs"
          >
            <div className="flex items-center gap-3 px-3 w-full sm:w-auto shrink-0">
              <PinkRibbonLogo isPulsing={isSearching} size="sm" showWordmark={false} />
              <span className="text-xs font-semibold text-[#42152F] whitespace-nowrap">
                Hospital Discovery
              </span>
            </div>

            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#625766] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Enter city (e.g. Lahore, Karachi, Islamabad, Peshawar, Quetta)..."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#FCE7F3] rounded-xl text-xs sm:text-sm text-[#25202A] placeholder-[#625766]/60 focus:border-[#E83E8C] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#E83E8C] hover:bg-[#D81B60] rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
            >
              <span>{isSearching ? 'Locating Facilities...' : 'Search Facilities'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick City Filters */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-[#625766]">
            <span className="font-medium text-[#42152F]">Major Hubs:</span>
            {['Lahore', 'Karachi', 'Islamabad', 'Peshawar', 'Quetta', 'Multan'].map((city) => (
              <button
                key={city}
                onClick={() => navigate(`/find-care?city=${city}`)}
                className="px-2.5 py-1 rounded-md bg-white border border-[#FCE7F3] hover:border-[#E83E8C] hover:text-[#E83E8C] transition-colors text-[11px]"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Core Educational Pillars */}
      <section className="py-16 bg-[#FFF8FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E83E8C]">
              Educational Fundamentals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#42152F] mt-2">
              Four Critical Steps for Breast Health Awareness
            </h2>
            <p className="text-xs sm:text-sm text-[#625766] mt-2">
              Medical authorities emphasize that early detection starts with awareness and proactive clinical screening.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Warning Signs */}
            <div className="p-6 bg-white border border-[#FCE7F3] rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF1F7] text-[#E83E8C] flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#42152F]">
                  Know the Signs
                </h3>
                <p className="text-xs text-[#625766] leading-relaxed">
                  Understand changes such as new lumps, skin dimpling, nipple inversion, or unusual discharge.
                </p>
              </div>
              <Link
                to="/warning-signs"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E83E8C] hover:text-[#D81B60]"
              >
                <span>Read Signs Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 2: Screening */}
            <div className="p-6 bg-white border border-[#FCE7F3] rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF1F7] text-[#E83E8C] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#42152F]">
                  Screening Guidelines
                </h3>
                <p className="text-xs text-[#625766] leading-relaxed">
                  Learn recommended screening timelines for age 40+, baseline checks, and clinical breast examinations.
                </p>
              </div>
              <Link
                to="/screening"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E83E8C] hover:text-[#D81B60]"
              >
                <span>Screening Schedule</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 3: Hospital Discovery */}
            <div className="p-6 bg-white border border-[#FCE7F3] rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF1F7] text-[#E83E8C] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#42152F]">
                  Find Verified Care
                </h3>
                <p className="text-xs text-[#625766] leading-relaxed">
                  Locate oncology departments, mammography units, and charitable cancer hospitals across Pakistan.
                </p>
              </div>
              <Link
                to="/find-care"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E83E8C] hover:text-[#D81B60]"
              >
                <span>Browse Facilities</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar 4: Ask PinkCare */}
            <div className="p-6 bg-white border border-[#FCE7F3] rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFF1F7] text-[#E83E8C] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#42152F]">
                  Ask PinkCare AI
                </h3>
                <p className="text-xs text-[#625766] leading-relaxed">
                  Evidence-grounded assistant for breast health education, terminology, and clinic visit questions.
                </p>
              </div>
              <Link
                to="/ask-pinkcare"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E83E8C] hover:text-[#D81B60]"
              >
                <span>Chat with Assistant</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pakistan Statistics & Reality Section */}
      <section className="py-16 bg-white border-t border-[#FCE7F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E83E8C]">
                Why Awareness Matters in Pakistan
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#42152F]">
                Overcoming Taboos Through Evidence & Compassion
              </h2>
              <p className="text-xs sm:text-sm text-[#625766] leading-relaxed">
                In Pakistan, an estimated 1 in 9 women may develop breast cancer in their lifetime. Due to social hesitation and late diagnosis, many cases are discovered at Stage 3 or 4.
              </p>
              <p className="text-xs sm:text-sm text-[#625766] leading-relaxed">
                When identified in Stage 1, the 5-year survival rate exceeds 90%. Breaking silence, understanding signs, and consulting a physician early saves thousands of lives each year.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#42152F] hover:text-[#E83E8C]"
                >
                  <span>Learn about PinkCare&apos;s mission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 bg-[#FFF8FB] border border-[#FCE7F3] rounded-2xl text-center">
                <div className="text-3xl font-extrabold text-[#E83E8C] font-mono tabular-nums">1 in 9</div>
                <div className="text-xs font-bold text-[#42152F] mt-1">Lifetime Incidence</div>
                <p className="text-[11px] text-[#625766] mt-1">Among Pakistani women, highlighting the urgency of regular screening.</p>
              </div>

              <div className="p-6 bg-[#FFF8FB] border border-[#FCE7F3] rounded-2xl text-center">
                <div className="text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">&gt; 90%</div>
                <div className="text-xs font-bold text-[#42152F] mt-1">Stage 1 Survival</div>
                <p className="text-[11px] text-[#625766] mt-1">When detected at early stages through timely clinical evaluation.</p>
              </div>

              <div className="p-6 bg-[#FFF8FB] border border-[#FCE7F3] rounded-2xl text-center">
                <div className="text-3xl font-extrabold text-[#42152F] font-mono tabular-nums">40+</div>
                <div className="text-xs font-bold text-[#42152F] mt-1">Recommended Age</div>
                <p className="text-[11px] text-[#625766] mt-1">For annual or biennial screening mammograms for average-risk women.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
