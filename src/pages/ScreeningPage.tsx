import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Calendar,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const ScreeningPage: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <Calendar className="w-4 h-4" />
            <span>Clinical Prevention & Early Detection Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#42152F] mt-1">
            {language === 'ur' ? 'چھاتی کی اسکریننگ اور میموگرافی گائیڈ' : 'Breast Screening & Mammography Guidelines'}
          </h1>
          <p className="text-sm text-[#625766] max-w-3xl mt-2 leading-relaxed">
            Screening tests detect breast abnormalities before any physical lump can be felt. Early discovery often enables less invasive treatments and dramatically higher survival rates.
          </p>
        </div>

        {/* Screening Schedule Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#FCE7F3] rounded-2xl p-6 space-y-4">
            <span className="text-xs font-bold font-mono text-[#E83E8C] bg-[#FFF1F7] px-2.5 py-1 rounded-md">
              Ages 20 – 39
            </span>
            <h3 className="text-lg font-bold text-[#42152F]">Breast Self-Awareness & CBE</h3>
            <ul className="space-y-2 text-xs text-[#625766] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Monthly self-awareness to know your normal breast tissue consistency.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Clinical Breast Examination (CBE) every 1–3 years by a female physician.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Ultrasound may be recommended for dense breast tissue if changes occur.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-[#E83E8C] rounded-2xl p-6 space-y-4 relative shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-white bg-[#E83E8C] px-2.5 py-1 rounded-md">
                Ages 40 and Older
              </span>
              <span className="text-[10px] font-bold text-[#E83E8C] uppercase tracking-wider">Crucial Milestone</span>
            </div>
            <h3 className="text-lg font-bold text-[#42152F]">Annual Screening Mammography</h3>
            <ul className="space-y-2 text-xs text-[#625766] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E83E8C] shrink-0 mt-0.5" />
                <span>Annual or biennial low-dose digital mammogram.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E83E8C] shrink-0 mt-0.5" />
                <span>Can identify microcalcifications up to 2 years before a lump is palpable.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E83E8C] shrink-0 mt-0.5" />
                <span>High safety profile using minimal diagnostic X-ray radiation.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-[#FCE7F3] rounded-2xl p-6 space-y-4">
            <span className="text-xs font-bold font-mono text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md">
              High Risk / Genetics
            </span>
            <h3 className="text-lg font-bold text-[#42152F]">Enhanced Surveillance</h3>
            <ul className="space-y-2 text-xs text-[#625766] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Applicable if multiple first-degree relatives had pre-menopausal breast or ovarian cancer.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Screening may begin as early as age 30 or 10 years younger than earliest family case.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <span>May include supplemental Breast MRI and genetic counselling (BRCA1/BRCA2).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* What to Expect During a Mammogram */}
        <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-[#42152F]">What to Expect During Your Mammogram</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#625766] leading-relaxed">
            <div className="space-y-1.5">
              <h3 className="font-semibold text-[#42152F]">1. Preparation</h3>
              <p>
                Avoid wearing deodorant, talcum powder, or lotions under the arms or on breasts on the day of the exam, as these can appear as white spots on the X-ray.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold text-[#42152F]">2. Examination</h3>
              <p>
                A female technologist will position the breast between two compression plates. Pressure lasts for 10–15 seconds per image to ensure crisp diagnostic clarity.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="font-semibold text-[#42152F]">3. Results</h3>
              <p>
                A radiologist analyzes the films and sends a report to your physician. Additional views or ultrasound may sometimes be requested to examine dense spots.
              </p>
            </div>
          </div>
        </div>

        {/* Find facility CTA */}
        <div className="p-6 bg-[#FFF1F7] border border-[#FCE7F3] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-[#42152F]">Ready to Schedule a Screening?</h3>
            <p className="text-xs text-[#625766] mt-0.5">
              Find hospitals in Pakistan equipped with certified digital mammography units.
            </p>
          </div>
          <Link
            to="/find-care"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#E83E8C] hover:bg-[#D81B60] rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Find Mammography Centres</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
