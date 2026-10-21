import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Activity, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const BreastHealthPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <Heart className="w-4 h-4" />
            <span>Breast Health Fundamentals</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#42152F] mt-1">
            {language === 'ur' ? 'چھاتی کی صحت کے بنیادی اصول' : 'Breast Health Fundamentals & Self-Awareness'}
          </h1>
          <p className="text-sm text-[#625766] mt-2 leading-relaxed">
            Breast self-awareness means becoming familiar with how your breasts normally look and feel at different times of the month so you can readily notice any unexpected changes.
          </p>
        </div>

        {/* 3 Pillars of Self-Awareness */}
        <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-[#42152F]">Three Core Habits for Lifelong Breast Health</h2>

          <div className="space-y-4 text-xs sm:text-sm text-[#625766]">
            <div className="p-4 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl space-y-1">
              <h3 className="font-bold text-[#42152F] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E83E8C] text-white flex items-center justify-center text-[10px] font-mono">1</span>
                <span>Know What is Normal for You</span>
              </h3>
              <p className="leading-relaxed pl-7">
                Breasts naturally change with age, during pregnancy, and throughout your monthly menstrual cycle. Tenderness and mild swelling before your period are normal hormonal responses. Becoming familiar with your texture allows you to distinguish normal cyclical changes from persistent abnormalities.
              </p>
            </div>

            <div className="p-4 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl space-y-1">
              <h3 className="font-bold text-[#42152F] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E83E8C] text-white flex items-center justify-center text-[10px] font-mono">2</span>
                <span>Inspect Visual Appearance Periodically</span>
              </h3>
              <p className="leading-relaxed pl-7">
                Look at your breasts in front of a mirror with arms relaxed at your sides and then raised overhead. Check for any skin dimpling, asymmetry, new nipple retraction, or visible contour irregularities.
              </p>
            </div>

            <div className="p-4 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl space-y-1">
              <h3 className="font-bold text-[#42152F] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E83E8C] text-white flex items-center justify-center text-[10px] font-mono">3</span>
                <span>Prompt Action on Concerning Findings</span>
              </h3>
              <p className="leading-relaxed pl-7">
                If you detect a new firm lump, skin puckering, or nipple discharge, schedule an appointment with a female doctor or breast surgeon. Do not wait for pain—most early malignant breast lumps are painless.
              </p>
            </div>
          </div>
        </div>

        {/* Healthy Lifestyle Factors */}
        <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-[#42152F]">Lifestyle Practices Supporting Breast Health</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#625766]">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#42152F] block">Regular Physical Activity:</strong>
                <span>Aim for at least 150 minutes of moderate exercise (brisk walking, cycling) weekly to regulate body mass and estrogen levels.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#42152F] block">Maintain Balanced Weight:</strong>
                <span>Postmenopausal fat tissue produces extra estrogen, which can elevate breast cancer risk.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#42152F] block">Breastfeeding When Possible:</strong>
                <span>Clinical research shows breastfeeding for a cumulative 12+ months offers a modest protective effect on breast tissue.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#42152F] block">Whole Foods Nutrition:</strong>
                <span>Diets rich in vegetables, legumes, whole grains, and antioxidant-rich fruits support cellular repair.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white border border-[#FCE7F3] rounded-2xl">
          <div>
            <h3 className="font-bold text-sm text-[#42152F]">Explore Warning Signs</h3>
            <p className="text-xs text-[#625766]">Learn what specific symptoms warrant immediate doctor assessment.</p>
          </div>
          <Link
            to="/warning-signs"
            className="px-5 py-2 text-xs font-semibold text-white bg-[#E83E8C] hover:bg-[#D81B60] rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <span>Warning Signs Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
