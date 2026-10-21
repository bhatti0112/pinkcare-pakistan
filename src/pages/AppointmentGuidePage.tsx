import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, HelpCircle, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

export const AppointmentGuidePage: React.FC = () => {
  const { language } = useLanguage();

  const questions = [
    'What do my physical examination and imaging scans indicate?',
    'If a lump or shadow is found, is it likely to be a benign cyst or fibroadenoma?',
    'What diagnostic tests are recommended next (targeted ultrasound, digital mammogram, or core biopsy)?',
    'How should I prepare for imaging or biopsy, and are there medications I should pause?',
    'When will biopsy or radiology reports be finalized, and who will discuss them with me?',
    'Does this hospital have a multidisciplinary breast care team (surgeon, radiologist, pathologist, medical oncologist)?',
    'Are there patient welfare desks or financial assistance programs available if further care is needed?',
  ];

  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <Calendar className="w-4 h-4" />
            <span>Doctor Visit Preparation Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#42152F] mt-1">
            Preparing for Your Breast Clinic Appointment
          </h1>
          <p className="text-sm text-[#625766] mt-2 leading-relaxed">
            Visiting a doctor for a breast check can feel overwhelming. Preparing your questions and medical history beforehand helps you make the most of your consultation.
          </p>
        </div>

        {/* 3 Preparation Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#FCE7F3] rounded-2xl p-6 space-y-2">
            <span className="text-xs font-mono font-bold text-[#E83E8C]">Step 01</span>
            <h3 className="font-bold text-[#42152F] text-sm">Gather Past Records</h3>
            <p className="text-xs text-[#625766] leading-relaxed">
              Bring any previous mammography films, CDs, ultrasound reports, and general pathology tests so the radiologist can compare changes over time.
            </p>
          </div>

          <div className="bg-white border border-[#FCE7F3] rounded-2xl p-6 space-y-2">
            <span className="text-xs font-mono font-bold text-[#E83E8C]">Step 02</span>
            <h3 className="font-bold text-[#42152F] text-sm">Bring a Companion</h3>
            <p className="text-xs text-[#625766] leading-relaxed">
              Having a trusted female family member, friend, or partner accompany you provides emotional comfort and helps you remember key medical instructions.
            </p>
          </div>

          <div className="bg-white border border-[#FCE7F3] rounded-2xl p-6 space-y-2">
            <span className="text-xs font-mono font-bold text-[#E83E8C]">Step 03</span>
            <h3 className="font-bold text-[#42152F] text-sm">Note Symptom Timelines</h3>
            <p className="text-xs text-[#625766] leading-relaxed">
              Write down when you first noticed the change, whether it varies with your menstrual cycle, and any family history of breast or ovarian conditions.
            </p>
          </div>
        </div>

        {/* Questions Checklist */}
        <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#E83E8C]" />
            <h2 className="text-lg font-bold text-[#42152F]">Questions to Ask During Consultation</h2>
          </div>

          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl flex items-start gap-3 text-xs sm:text-sm text-[#42152F]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E83E8C] shrink-0 mt-0.5" />
                <span>{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next step */}
        <div className="p-6 bg-[#FFF1F7] border border-[#FCE7F3] rounded-2xl flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#42152F]">Ready to Find a Breast Clinic in Pakistan?</h3>
            <p className="text-xs text-[#625766]">Search our nationwide directory of verified facilities.</p>
          </div>
          <Link
            to="/find-care"
            className="px-5 py-2 text-xs font-semibold text-white bg-[#E83E8C] hover:bg-[#D81B60] rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Find Clinics</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
