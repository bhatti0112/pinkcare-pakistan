import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, ShieldCheck, ExternalLink, CheckCircle2 } from 'lucide-react';

export const SourcesPage: React.FC = () => {
  const sourcesList = [
    {
      name: 'Global Breast Cancer Initiative Implementation Framework',
      publisher: 'World Health Organization (WHO)',
      url: 'https://www.who.int/initiatives/global-breast-cancer-initiative',
      topic: 'Global early detection targets, screening protocols, and timely care delivery.',
      verification: 'Verified WHO Official Repository',
      lastAccessed: '2026-09-20',
    },
    {
      name: 'Clinical Breast Examination & Oncology Practice Guidelines',
      publisher: 'Shaukat Khanum Memorial Cancer Hospital & Research Centre (SKMCH&RC)',
      url: 'https://shaukatkhanum.org.pk',
      topic: 'Pakistan-specific cancer epidemiology, staging, and diagnostic protocols.',
      verification: 'Verified Institutional Clinical Policy',
      lastAccessed: '2026-08-30',
    },
    {
      name: 'Breast Cancer Screening and Diagnosis Guidelines',
      publisher: 'National Comprehensive Cancer Network (NCCN)',
      url: 'https://www.nccn.org/guidelines',
      topic: 'Risk assessment, mammography frequency, and multidisciplinary treatment standards.',
      verification: 'Peer-Reviewed Oncology Standard',
      lastAccessed: '2026-09-12',
    },
    {
      name: 'Pakistan National Cancer Registry Report',
      publisher: 'Health Research Advisory Board & Pakistan Medical Research Council',
      url: 'https://pmrc.org.pk',
      topic: 'Incidence rates, regional demographics, and mortality statistics in Pakistan.',
      verification: 'Official National Epidemiological Registry',
      lastAccessed: '2026-07-15',
    },
    {
      name: 'Breast Imaging Reporting and Data System (BI-RADS) Atlas',
      publisher: 'American College of Radiology (ACR)',
      url: 'https://www.acr.org/Clinical-Resources/Reporting-and-Data-Systems/Bi-Rads',
      topic: 'Mammography classification, microcalcifications, and diagnostic ultrasound.',
      verification: 'International Radiologic Standard',
      lastAccessed: '2026-08-10',
    },
  ];

  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <BookOpen className="w-4 h-4" />
            <span>Academic & Clinical Integrity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#42152F] mt-1">
            Medical References & Content Review Policy
          </h1>
          <p className="text-sm text-[#625766] mt-2 leading-relaxed">
            All educational materials, symptom overviews, and screening recommendations on PinkCare are grounded exclusively in peer-reviewed clinical guidelines and verified public health publications.
          </p>
        </div>

        {/* Content Review Policy */}
        <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 sm:p-8 space-y-3">
          <h2 className="text-base font-bold text-[#42152F]">Four-Tier Medical Review Workflow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#625766] pt-2">
            <div className="p-3 bg-[#FFF8FB] rounded-xl border border-[#FCE7F3]">
              <strong className="text-[#42152F] block mb-1">1. Primary Evidence Extraction</strong>
              <span>Content is synthesized strictly from established oncology bodies (WHO, NCCN, ACR, ESMO).</span>
            </div>
            <div className="p-3 bg-[#FFF8FB] rounded-xl border border-[#FCE7F3]">
              <strong className="text-[#42152F] block mb-1">2. Local Clinical Adaptation</strong>
              <span>Guidance is tailored to healthcare infrastructure and screening access realities across Pakistan.</span>
            </div>
            <div className="p-3 bg-[#FFF8FB] rounded-xl border border-[#FCE7F3]">
              <strong className="text-[#42152F] block mb-1">3. Medical Panel Review</strong>
              <span>Specialist oncologists and radiologists audit text for clinical precision and non-diagnostic framing.</span>
            </div>
            <div className="p-3 bg-[#FFF8FB] rounded-xl border border-[#FCE7F3]">
              <strong className="text-[#42152F] block mb-1">4. Periodic Recertification</strong>
              <span>Articles and hospital directory records are recertified semi-annually against updated national health databases.</span>
            </div>
          </div>
        </div>

        {/* Sources List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#42152F]">Primary Cited Sources & Registries</h2>

          <div className="space-y-4">
            {sourcesList.map((src, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#FCE7F3] rounded-2xl p-5 space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#42152F]">{src.name}</h3>
                    <p className="text-xs text-[#625766]">{src.publisher}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0 font-medium">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{src.verification}</span>
                  </span>
                </div>

                <p className="text-xs text-[#625766] leading-relaxed">
                  <strong>Scope: </strong>{src.topic}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#FCE7F3] text-[11px] text-slate-500">
                  <span>Last accessed: {src.lastAccessed}</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#E83E8C] hover:underline font-semibold"
                  >
                    <span>View Official Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
