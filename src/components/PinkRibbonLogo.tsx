import React from 'react';

interface PinkRibbonLogoProps {
  isPulsing?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

export const PinkRibbonLogo: React.FC<PinkRibbonLogoProps> = ({
  isPulsing = false,
  className = '',
  size = 'md',
  showWordmark = true,
}) => {
  const sizeMap = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-8 h-8', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Pink Awareness Ribbon SVG */}
      <div
        className={`relative ${currentSize.icon} shrink-0 transition-transform duration-300 ${
          isPulsing ? 'animate-pulse scale-105 filter drop-shadow-[0_0_8px_rgba(232,62,140,0.5)]' : ''
        }`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Back Loop */}
          <path
            d="M50 35 C40 10, 20 10, 20 35 C20 60, 48 85, 75 115"
            stroke="#C2185B"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Front Loop Crossing Over */}
          <path
            d="M50 35 C60 10, 80 10, 80 35 C80 60, 52 85, 25 115"
            stroke="url(#ribbon-grad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Subtle Highlighting Gradient */}
          <defs>
            <linearGradient id="ribbon-grad" x1="20" y1="20" x2="80" y2="110" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F472B6" />
              <stop offset="0.4" stopColor="#E83E8C" />
              <stop offset="1" stopColor="#9D174D" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showWordmark && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1">
            <span className={`font-bold tracking-tight text-[#42152F] ${currentSize.text}`}>
              Pink<span className="text-[#E83E8C]">Care</span>
            </span>
          </div>
          <span className={`font-medium tracking-wide text-[#625766] uppercase ${currentSize.sub}`}>
            Pakistan
          </span>
        </div>
      )}
    </div>
  );
};
