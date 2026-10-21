import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PAKISTAN_FACILITIES } from '../data/facilitiesData';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Phone,
  Globe,
  ShieldCheck,
  Calendar,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const FacilityDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const facility = PAKISTAN_FACILITIES.find((f) => f.slug === slug);

  if (!facility) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#42152F]">Healthcare Facility Not Found</h2>
        <p className="text-xs text-[#625766]">
          The requested healthcare facility does not exist or has been updated in our directory.
        </p>
        <Link
          to="/find-care"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#E83E8C] rounded-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Facility Directory</span>
        </Link>
      </div>
    );
  }

  const formatAddress = (addr: any): string => {
    if (!addr) return '';
    if (typeof addr === 'string') return addr;
    if (typeof addr === 'object') {
      if (addr.fullAddress && typeof addr.fullAddress === 'string') return addr.fullAddress;
      const parts = [addr.street, addr.city, addr.province].filter(
        (p) => typeof p === 'string' && p.trim().length > 0
      );
      if (parts.length > 0) return parts.join(', ');
      return '';
    }
    return String(addr);
  };

  const coords = (() => {
    const f = facility as any;
    if (f?.coordinates && typeof f.coordinates.lat === 'number') {
      return { lat: f.coordinates.lat, lng: f.coordinates.lng };
    }
    if (f?.location?.coordinates && Array.isArray(f.location.coordinates) && f.location.coordinates.length >= 2) {
      return { lat: f.location.coordinates[1], lng: f.location.coordinates[0] };
    }
    return { lat: 31.5204, lng: 74.3587 };
  })();

  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-xs text-[#625766] hover:text-[#42152F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Search Results</span>
        </button>

        <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Care Facility</span>
            </span>
            <span className="text-xs text-[#625766] font-mono">
              Last verified: {facility.verification?.lastVerifiedAt || '2026'}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42152F]">
              {facility.name}
            </h1>
            <p className="text-base text-[#625766] font-urdu mt-1">{facility.urduName}</p>
          </div>

          <div className="p-4 bg-[#FFF8FB] border border-[#FCE7F3] rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[#625766] font-medium">Physical Address</span>
              <p className="text-[#25202A] font-semibold flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#E83E8C] shrink-0 mt-0.5" />
                <span>{formatAddress(facility.address)}</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[#625766] font-medium">Contact Numbers</span>
              <p className="text-[#25202A] font-semibold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#E83E8C]" />
                {facility.contacts?.phone && (
                  <a href={`tel:${facility.contacts.phone}`} className="hover:text-[#E83E8C]">
                    {facility.contacts.phone}
                  </a>
                )}
                {facility.contacts?.helpline && (
                  <span className="text-slate-500 font-normal">· Helpline: {facility.contacts.helpline}</span>
                )}
              </p>
            </div>
          </div>

          {/* Clinical Services */}
          <div>
            <h3 className="text-sm font-bold text-[#42152F] mb-3">Available & Verified Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(facility.services || []).map((svc) => (
                <div
                  key={svc}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FFF8FB] border border-[#FCE7F3] text-[#42152F]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-medium">{svc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facility Notes */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#42152F]">Facility Overview & Patient Notes</h3>
            <p className="text-xs sm:text-sm text-[#625766] leading-relaxed">
              {facility.notes}
            </p>
          </div>

          {/* Provenance and Disclaimer */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Data Source & Provenance</span>
            </div>
            <p className="text-[11px]">
              Source: {facility.verification.source}. Coordinates: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}.
            </p>
            <p className="text-[11px] text-slate-500">
              Disclaimer: Facility operating hours, doctor consultation days, and fee structures may vary. We recommend confirming appointment availability by telephone prior to visiting.
            </p>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#FCE7F3]">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#E83E8C] hover:bg-[#D81B60] rounded-xl shadow-xs transition-colors"
            >
              <span>Get Directions on Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {facility.contacts.website && (
              <a
                href={facility.contacts.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#42152F] bg-white hover:bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-[#E83E8C]" />
                <span>Visit Official Website</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
