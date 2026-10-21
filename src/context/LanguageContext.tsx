import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Brand & General
    brandName: 'PinkCare',
    tagline: 'Evidence-Based Breast Cancer Awareness & Hospital Discovery for Pakistan',
    disclaimerBar: 'Educational Platform Only — Not a diagnostic medical device. For urgent concerns, contact 1122 or visit an emergency room.',
    emergencyLabel: 'Emergency Helpline: 1122 (Rescue) · 115 (Edhi)',

    // Navigation
    home: 'Home',
    about: 'About',
    breastHealth: 'Breast Health',
    warningSigns: 'Warning Signs',
    screening: 'Screening Guide',
    riskFactors: 'Risk Factors',
    learn: 'Articles & Guides',
    findCare: 'Find a Hospital',
    askPinkCare: 'Ask PinkCare (AI)',
    appointmentGuide: 'Doctor Visit Guide',
    faq: 'FAQ',
    sources: 'Medical Sources & Review',
    privacy: 'Privacy Policy',
    accessibility: 'Accessibility',
    contact: 'Contact',
    adminLogin: 'Admin Portal',
    findCareBtn: 'Find Facilities Near You',
    exploreBtn: 'Learn Warning Signs',

    // Language Toggle
    switchToUrdu: 'اردو',
    switchToEnglish: 'English',

    // Common UI
    loading: 'Loading verified information...',
    search: 'Search hospitals, cities, or articles...',
    allCities: 'All Cities',
    verifiedBadge: 'Verified Healthcare Facility',
    unverifiedBadge: 'Under Review',
    readMore: 'Read Article',
    directions: 'Get Directions',
    phone: 'Phone',
    address: 'Address',
    services: 'Available Services',
    lastVerified: 'Last verified on',
    reportCorrection: 'Report Outdated Information',
    close: 'Close',
  },
  ur: {
    // Brand & General
    brandName: 'پنک کیئر',
    tagline: 'پاکستان میں چھاتی کے کینسر سے آگاہی، معلومات اور ہسپتالوں کی تلاش',
    disclaimerBar: 'صرف تعلیمی رہنمائی — یہ تشخیصی طبی آلہ نہیں ہے۔ ہنگامی صورتحال میں فوری طور پر 1122 پر کال کریں۔',
    emergencyLabel: 'ہنگامی ہیلپ لائن: 1122 (ریسکیو) · 115 (ایدھی)',

    // Navigation
    home: 'ہوم',
    about: 'ہمارے بارے میں',
    breastHealth: 'چھاتی کی صحت',
    warningSigns: 'خطرے کی علامات',
    screening: 'اسکریننگ گائیڈ',
    riskFactors: 'خطرات کے اسباب',
    learn: 'معلومات و مضامین',
    findCare: 'ہسپتال تلاش کریں',
    askPinkCare: 'پنک کیئر سے پوچھیں (AI)',
    appointmentGuide: 'ڈاکٹر سے مشاورت کی تیاری',
    faq: 'اکثر پوچھے گئے سوالات',
    sources: 'طبی ذرائع و توثیق',
    privacy: 'رازداری کی پالیسی',
    accessibility: 'آسانی اور رسائی',
    contact: 'رابطہ کریں',
    adminLogin: 'ایڈمن پورٹل',
    findCareBtn: 'قریبی طبی مراکز تلاش کریں',
    exploreBtn: 'علامات سے آگاہی حاصل کریں',

    // Language Toggle
    switchToUrdu: 'اردو',
    switchToEnglish: 'English',

    // Common UI
    loading: 'معلومات لوڈ ہو رہی ہیں...',
    search: 'ہسپتال، شہر یا معلومات تلاش کریں...',
    allCities: 'تمام شہر',
    verifiedBadge: 'تصدیق شدہ طبی مرکز',
    unverifiedBadge: 'زیرِ جائزہ',
    readMore: 'مضمون پڑھیں',
    directions: 'راستہ دیکھیں',
    phone: 'فون نمبر',
    address: 'پتہ',
    services: 'دستیاب سہولیات',
    lastVerified: 'آخری تصدیق کی تاریخ',
    reportCorrection: 'غلط معلومات کی اطلاع دیں',
    close: 'بند کریں',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  isRTL: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('pinkcare_lang') as Language) || 'en';
  });

  const isRTL = language === 'ur';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('pinkcare_lang', lang);
  };

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
