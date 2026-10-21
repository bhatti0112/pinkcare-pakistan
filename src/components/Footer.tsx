import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PinkRibbonLogo } from './PinkRibbonLogo';
import { Heart, ShieldCheck, PhoneCall, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-[#25202A] text-slate-300 pt-16 pb-12 border-t border-[#42152F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mandatory Medical Safety Disclaimer Box */}
        <div className="p-6 bg-[#42152F]/70 border border-[#E83E8C]/30 rounded-2xl mb-12 text-sm leading-relaxed text-[#FCE7F3]">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#E83E8C] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-white font-semibold text-sm">
                Important Medical & Safety Disclosure
              </h2>
              <p className="text-xs text-[#FCE7F3]/90">
                PinkCare is strictly an educational awareness and healthcare-navigation platform designed for Pakistan. It is <strong>not</strong> a medical device and does <strong>not</strong> provide medical diagnoses, treatment plans, or individual cancer risk calculations. Any changes in breast shape, texture, skin dimpling, or lump presence require timely examination by a certified healthcare professional.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#F472B6]">
                <span>Emergency Helplines: Rescue 1122</span>
                <span>·</span>
                <span>Edhi 115</span>
                <span>·</span>
                <span>Shaukat Khanum Helpline 0800 11 555</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & Mission Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E83E8C]/20 border border-[#E83E8C]/40 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-[#E83E8C]" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Pink<span className="text-[#E83E8C]">Care</span>
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering individuals and families across Pakistan with evidence-based breast health education, warning sign recognition, and verified healthcare facility discovery.
            </p>
            <div className="text-xs text-slate-400">
              <span className="text-emerald-400 font-medium">Evidence-Based</span>
              <span className="mx-2 text-slate-600">·</span>
              <span>Non-Diagnostic</span>
            </div>
          </div>

          {/* Education & Awareness */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Health Education
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/breast-health" className="hover:text-white transition-colors">
                  {t('breastHealth')}
                </Link>
              </li>
              <li>
                <Link to="/warning-signs" className="hover:text-white transition-colors">
                  {t('warningSigns')}
                </Link>
              </li>
              <li>
                <Link to="/screening" className="hover:text-white transition-colors">
                  {t('screening')}
                </Link>
              </li>
              <li>
                <Link to="/risk-factors" className="hover:text-white transition-colors">
                  {t('riskFactors')}
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-white transition-colors">
                  {t('learn')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Finding Care & Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Care & Discovery
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/find-care" className="hover:text-white transition-colors">
                  {t('findCare')}
                </Link>
              </li>
              <li>
                <Link to="/appointment-guide" className="hover:text-white transition-colors">
                  {t('appointmentGuide')}
                </Link>
              </li>
              <li>
                <Link to="/ask-pinkcare" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>{t('askPinkCare')}</span>
                  <span className="text-[10px] text-[#E83E8C]">New</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Trust */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Integrity & Policies
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/about/sources" className="hover:text-white transition-colors">
                  {t('sources')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="hover:text-white transition-colors">
                  {t('accessibility')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t('contact')}
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/admin/login" className="text-slate-500 hover:text-slate-400 text-[11px] transition-colors">
                  Staff / Admin Access →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Unboxed Metadata */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} PinkCare Pakistan. Dedicated to saving lives through early evaluation.
          </div>
          <div className="flex items-center gap-3">
            <span>Built for Pakistan</span>
            <span>·</span>
            <span>Reviewed Content</span>
            <span>·</span>
            <span>WCAG 2.2 AA Aligned</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
