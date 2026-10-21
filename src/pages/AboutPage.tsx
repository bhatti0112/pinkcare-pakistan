import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Heart, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <Heart className="w-4 h-4" />
            <span>Mission & Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#42152F] mt-1">
            About PinkCare Pakistan
          </h1>
          <p className="text-sm text-[#625766] mt-2 leading-relaxed">
            PinkCare is an evidence-based breast cancer awareness, education, and healthcare facility discovery initiative dedicated to reducing preventable mortality across Pakistan.
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-[#42152F]">Our Mission</h2>
          <p className="text-xs sm:text-sm text-[#625766] leading-relaxed">
            In Pakistan, breast cancer accounts for a significant proportion of female cancer diagnoses. Over 40,000 women lose their lives annually, largely due to late diagnosis caused by societal hesitation, fear, and lack of timely navigation to specialized care.
          </p>
          <p className="text-xs sm:text-sm text-[#625766] leading-relaxed">
            PinkCare bridges this critical gap by translating clinical cancer research into accessible English and Urdu education, helping individuals identify warning signs early, debunking myths, and providing direct, verified routes to mammography and oncology facilities nationwide.
          </p>
        </div>

        {/* Medical Integrity & Boundaries */}
        <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-[#42152F]">Clinical Boundaries & Ethical Safety</h2>
          </div>
          <p className="text-xs sm:text-sm text-[#625766] leading-relaxed">
            We operate under strict healthcare information safety guidelines:
          </p>
          <ul className="space-y-2.5 text-xs text-[#625766]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Non-Diagnostic Commitment: </strong>PinkCare is an awareness and care-navigation platform. We never diagnose medical conditions or issue individual cancer probability predictions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Evidence-Based Sourcing: </strong>All medical material is adapted from peer-reviewed oncology literature, WHO Global Breast Cancer Initiative, and verified Pakistani cancer institutions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Verified Facility Registry: </strong>We do not seed unverified or fictitious hospitals. Every directory entry undergoes clinical data verification and periodic review.</span>
            </li>
          </ul>
        </div>

        {/* Governance Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/about/sources"
            className="p-5 bg-white border border-[#FCE7F3] rounded-2xl hover:border-[#E83E8C] transition-colors flex items-center justify-between"
          >
            <div>
              <h3 className="font-bold text-sm text-[#42152F]">Medical Sources & Review Policy</h3>
              <p className="text-xs text-[#625766] mt-0.5">Explore our cited oncology literature and review panel.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#E83E8C]" />
          </Link>

          <Link
            to="/contact"
            className="p-5 bg-white border border-[#FCE7F3] rounded-2xl hover:border-[#E83E8C] transition-colors flex items-center justify-between"
          >
            <div>
              <h3 className="font-bold text-sm text-[#42152F]">Institutional Partnerships</h3>
              <p className="text-xs text-[#625766] mt-0.5">Connect with our health communication desk.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#E83E8C]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
