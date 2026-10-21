import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PinkRibbonLogo } from './PinkRibbonLogo';
import { Menu, X, MapPin, Globe, Sparkles } from 'lucide-react';

interface NavbarProps {
  isSearchingHospitals?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isSearchingHospitals = false }) => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/breast-health', label: t('breastHealth') },
    { to: '/warning-signs', label: t('warningSigns') },
    { to: '/screening', label: t('screening') },
    { to: '/find-care', label: t('findCare'), icon: MapPin },
    { to: '/ask-pinkcare', label: t('askPinkCare'), highlight: true },
    { to: '/learn', label: t('learn') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#FCE7F3] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-6">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0"
            aria-label="PinkCare Pakistan Homepage"
          >
            <PinkRibbonLogo isPulsing={isSearchingHospitals} size="md" />
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#625766]"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
                  isActive(link.to)
                    ? 'text-[#E83E8C] border-[#E83E8C] font-semibold'
                    : 'border-transparent hover:text-[#42152F] hover:border-[#FCE7F3]'
                } ${link.highlight ? 'flex items-center gap-1 text-[#E83E8C]' : ''}`}
              >
                {link.highlight && <Sparkles className="w-3.5 h-3.5" />}
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Zone 3: Language Toggle & Primary CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              title={language === 'en' ? 'اردو میں دیکھیں' : 'Switch to English'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#FCE7F3] hover:border-[#E83E8C] bg-[#FFF8FB] text-xs font-semibold text-[#42152F] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#E83E8C]" />
              <span className={language === 'en' ? 'font-urdu' : ''}>
                {language === 'en' ? 'اردو' : 'English'}
              </span>
            </button>

            {/* Primary Action Button */}
            <Link
              to="/find-care"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#E83E8C] hover:bg-[#D81B60] rounded-lg transition-colors shadow-xs whitespace-nowrap"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{t('findCareBtn')}</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#42152F] hover:text-[#E83E8C] hover:bg-[#FFF8FB] rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#FCE7F3] bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-[#FCE7F3] text-[#E83E8C] font-semibold'
                    : 'text-[#42152F] hover:bg-[#FFF8FB]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#FCE7F3] flex flex-col gap-2">
              <Link
                to="/find-care"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 text-xs font-semibold text-white bg-[#E83E8C] rounded-lg"
              >
                {t('findCareBtn')}
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#625766] px-3 py-1"
              >
                {t('about')} · {t('sources')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
