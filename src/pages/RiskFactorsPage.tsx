import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ShieldAlert, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export const RiskFactorsPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <ShieldAlert className="w-4 h-4" />
            <span>Epidemiology & Clinical Evidence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#42152F] mt-1">
            {language === 'ur' ? 'خطرے کے حقیقی اسباب اور عام غلط فہمیاں' : 'Breast Cancer Risk Factors vs Common Misconceptions'}
          </h1>
          <p className="text-sm text-[#625766] mt-2 leading-relaxed">
            Understanding risk factors helps you determine when to begin screening and how to protect your health, while separating evidence from persistent cultural myths.
          </p>
        </div>

        {/* 2 Columns: Established Risk Factors vs Myth Busting */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Real Factors */}
          <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-[#42152F]">Established Clinical Risk Factors</h2>
            </div>

            <ul className="space-y-3 text-xs text-[#625766]">
              <li className="p-3 bg-[#FFF8FB] rounded-xl border border-[#FCE7F3]">
                <strong className="text-[#42152F] block">Increasing Age:</strong>
                Risk naturally increases with age; most breast cancers are diagnosed in women over 40.
              </li>
              <li className="p-3 bg-[#FFF8FB] rounded-xl border border-[#FCE7F3]">
                <strong className="text-[#42152F] block">Family History & Genetics:</strong>
                First-degree relatives with breast cancer or inherited mutations in BRCA1 or BRCA2 genes.
              </li>
              <li className="p-3 bg-[#FFF8FB] rounded-xl border border-[#FCE7F3]">
                <strong className="text-[#42152F] block">Dense Breast Tissue:</strong>
                Breasts with higher glandular tissue relative to fat make mammograms harder to read and slightly elevate risk.
              </li>
              <li className="p-3 bg-[#FFF8FB] rounded-xl border border-[#FCE7F3]">
                <strong className="text-[#42152F] block">Reproductive History:</strong>
                Menstruation beginning before age 12 or menopause beginning after age 55 extends lifetime hormone exposure.
              </li>
            </ul>
          </div>

          {/* Myths Debunked */}
          <div className="bg-white border border-rose-100 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-500" />
              <h2 className="text-base font-bold text-[#42152F]">Debunking Persistent Myths</h2>
            </div>

            <ul className="space-y-3 text-xs text-[#625766]">
              <li className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                <strong className="text-rose-900 block">Myth: Underwire bras or antiperspirants cause cancer.</strong>
                <span className="text-emerald-700 font-medium">Fact: </span>Rigorous scientific research confirms no link between deodorants or bras and breast cancer.
              </li>
              <li className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                <strong className="text-rose-900 block">Myth: A biopsy causes cancer to spread.</strong>
                <span className="text-emerald-700 font-medium">Fact: </span>Biopsies are the global gold standard for accurate diagnosis and do not spread malignant cells.
              </li>
              <li className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                <strong className="text-rose-900 block">Myth: Breast cancer only happens to older women.</strong>
                <span className="text-emerald-700 font-medium">Fact: </span>While less common, young women can develop breast cancer and should never ignore new lumps.
              </li>
              <li className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                <strong className="text-rose-900 block">Myth: Breast cancer is contagious.</strong>
                <span className="text-emerald-700 font-medium">Fact: </span>Cancer cannot be transferred between individuals through touch, air, or caregiving.
              </li>
            </ul>
          </div>
        </div>

        {/* Next step */}
        <div className="p-6 bg-white border border-[#FCE7F3] rounded-2xl flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#42152F]">Learn About Recommended Screening Schedules</h3>
            <p className="text-xs text-[#625766]">Discover when mammograms and clinical exams are recommended.</p>
          </div>
          <Link
            to="/screening"
            className="px-5 py-2 text-xs font-semibold text-white bg-[#E83E8C] hover:bg-[#D81B60] rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Screening Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
