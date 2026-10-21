import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const { language } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is breast cancer curable if detected early?',
      a: 'Yes. When breast cancer is detected in early stages (Stage 1), the 5-year survival rate exceeds 90%. Early detection allows for less invasive surgical options, shorter treatment durations, and excellent long-term health outcomes.',
    },
    {
      q: 'Does a breast lump always mean cancer?',
      a: 'No. In fact, approximately 80% of all breast lumps evaluated by doctors turn out to be benign (non-cancerous). Common causes include fluid-filled cysts, fibroadenomas, and hormonal fluctuations. However, any new or firm lump requires clinical testing to confirm.',
    },
    {
      q: 'Are free or subsidized breast care facilities available in Pakistan?',
      a: 'Yes. Several major institutions in Pakistan offer free or heavily subsidized treatment to deserving patients through Zakat and welfare endowments. These include Shaukat Khanum Memorial Cancer Hospitals (Lahore & Peshawar), JPMC Patients Aid Foundation (Karachi), PIMS (Islamabad), and PAEC oncology centres (NORI, INMOL, KIRAN, CENAR).',
    },
    {
      q: 'What is the difference between a screening mammogram and a diagnostic mammogram?',
      a: 'A screening mammogram is a routine preventive check performed on women who have no symptoms or lumps to detect hidden abnormalities. A diagnostic mammogram is performed when a woman or doctor has noticed a specific symptom (such as a lump, nipple discharge, or focal pain) to investigate that exact spot with extra angles and magnification.',
    },
    {
      q: 'Does a breast biopsy cause cancer to spread?',
      a: 'No. This is a common and dangerous myth. A needle biopsy (core needle biopsy) is an essential, sterile diagnostic procedure that takes a tiny tissue sample to determine the exact cellular makeup of a lump. It does not cause cancer to spread and is standard international clinical practice.',
    },
    {
      q: 'Can men develop breast cancer?',
      a: 'Yes. While breast cancer is significantly more common in women (over 99% of cases), men also have breast tissue and can develop breast cancer. Any man who notices a firm lump under the nipple or skin dimpling should consult a doctor.',
    },
  ];

  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#42152F] mt-1">
            Common Questions About Breast Health
          </h1>
          <p className="text-sm text-[#625766] mt-2 leading-relaxed">
            Evidence-based answers to common questions about screening, symptoms, diagnosis, and healthcare navigation in Pakistan.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#FCE7F3] rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#42152F] hover:text-[#E83E8C] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#E83E8C] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#625766] leading-relaxed border-t border-[#FCE7F3] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
