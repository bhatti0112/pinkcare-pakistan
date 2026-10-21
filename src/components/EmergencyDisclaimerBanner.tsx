import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AlertCircle, PhoneCall, X } from 'lucide-react';

export const EmergencyDisclaimerBanner: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Medical safety notice"
      className="bg-[#42152F] text-[#FCE7F3] text-xs py-2 px-4 border-b border-[#E83E8C]/30 select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <AlertCircle className="w-4 h-4 text-[#F472B6] shrink-0" />
          <p className="truncate text-[11px] sm:text-xs">
            <strong className="font-semibold text-white">Notice: </strong>
            {t('disclaimerBar')}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#F472B6] bg-black/20 px-2 py-0.5 rounded border border-[#E83E8C]/20">
            <PhoneCall className="w-3 h-3" />
            <span>{t('emergencyLabel')}</span>
          </div>

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="p-0.5 hover:text-white rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
