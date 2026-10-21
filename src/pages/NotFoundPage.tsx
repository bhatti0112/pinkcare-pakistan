import React from 'react';
import { Link } from 'react-router-dom';
import { PinkRibbonLogo } from '../components/PinkRibbonLogo';
import { ArrowLeft, Home, MapPin } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-20 bg-[#FFF8FB] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <PinkRibbonLogo size="lg" />
        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-[#E83E8C] font-mono">404</span>
          <h1 className="text-xl font-bold text-[#42152F]">Page Not Found</h1>
          <p className="text-xs text-[#625766] max-w-xs mx-auto leading-relaxed">
            The page you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#E83E8C] hover:bg-[#D81B60] rounded-xl transition-colors shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/find-care"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#42152F] bg-white border border-[#FCE7F3] rounded-xl transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#E83E8C]" />
            <span>Find a Hospital</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
