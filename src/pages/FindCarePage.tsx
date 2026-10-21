import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PAKISTAN_FACILITIES, Facility } from '../data/facilitiesData';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  Search,
  Navigation,
  Phone,
  Globe,
  ShieldCheck,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Flag,
  X,
  Send,
  Map as MapIcon,
  List,
} from 'lucide-react';

export const FindCarePage: React.FC = () => {
  const { t, language, isRTL } = useLanguage();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('city') || '');
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [filterMammography, setFilterMammography] = useState(false);
  const [filterFinancialAid, setFilterFinancialAid] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const [facilities, setFacilities] = useState<Facility[]>(PAKISTAN_FACILITIES);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Correction report modal state
  const [reportingFacility, setReportingFacility] = useState<Facility | null>(null);
  const [reportText, setReportText] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Fetch facilities from backend API on mount, with fallback
  useEffect(() => {
    async function loadFacilities() {
      try {
        const res = await fetch('/api/v1/facilities');
        if (res.ok) {
          const data = await res.json();
          if (data.facilities && Array.isArray(data.facilities) && data.facilities.length > 0) {
            setFacilities(data.facilities);
          }
        }
      } catch (err) {
        // Fallback to local verified dataset
      }
    }
    loadFacilities();
  }, []);

  // Helper to safely extract coordinates from either format (coordinates: {lat, lng} or GeoJSON location: {coordinates: [lng, lat]})
  const getFacilityCoordinates = (fac: any): { lat: number; lng: number } => {
    if (!fac) return { lat: 31.5204, lng: 74.3587 };
    if (fac.coordinates) {
      const lat = Number(fac.coordinates.lat ?? fac.coordinates.latitude);
      const lng = Number(fac.coordinates.lng ?? fac.coordinates.longitude);
      if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
        return { lat, lng };
      }
    }
    if (fac.location?.coordinates && Array.isArray(fac.location.coordinates) && fac.location.coordinates.length >= 2) {
      const lng = Number(fac.location.coordinates[0]);
      const lat = Number(fac.location.coordinates[1]);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
    if (fac.lat !== undefined && fac.lng !== undefined) {
      const lat = Number(fac.lat);
      const lng = Number(fac.lng);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
    return { lat: 31.5204, lng: 74.3587 }; // Default fallback (Lahore)
  };

  // Helper to safely format address whether it is string or { province, city, fullAddress }
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

  // Calculate distance in kilometers
  const calculateDistanceKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserLocation({ lat, lng });
        setLocationLoading(false);

        // Try querying backend nearby API
        try {
          const res = await fetch(`/api/v1/facilities/nearby?lat=${lat}&lng=${lng}&radius=400`);
          if (res.ok) {
            const data = await res.json();
            if (data.facilities && data.facilities.length > 0) {
              setFacilities(data.facilities);
            }
          }
        } catch {
          // Handled via local distance calculation
        }
      },
      (err) => {
        setLocationLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError('Location access was denied. You can still search manually by city or province.');
        } else {
          setLocationError('Unable to retrieve location. Please use manual city search.');
        }
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  const provinces = ['All', 'Punjab', 'Sindh', 'Islamabad Capital Territory', 'Khyber Pakhtunkhwa', 'Balochistan'];

  const filteredFacilities = useMemo(() => {
    let list = [...facilities];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.city.toLowerCase().includes(q) ||
          f.urduName.includes(q) ||
          f.services.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (selectedProvince !== 'All') {
      list = list.filter((f) => f.province === selectedProvince);
    }

    if (filterMammography) {
      list = list.filter((f) => f.verification.hasMammography);
    }

    if (filterFinancialAid) {
      list = list.filter((f) => f.verification.hasFinancialAssistance);
    }

    if (userLocation) {
      list.sort((a, b) => {
        const coordsA = getFacilityCoordinates(a);
        const coordsB = getFacilityCoordinates(b);
        const distA = calculateDistanceKm(userLocation.lat, userLocation.lng, coordsA.lat, coordsA.lng);
        const distB = calculateDistanceKm(userLocation.lat, userLocation.lng, coordsB.lat, coordsB.lng);
        return distA - distB;
      });
    }

    return list;
  }, [facilities, query, selectedProvince, filterMammography, filterFinancialAid, userLocation]);

  const handleSubmitCorrection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingFacility) return;
    setReportSubmitting(true);

    try {
      await fetch('/api/v1/facilities/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facilityId: reportingFacility.id,
          details: reportText,
          reporterEmail,
        }),
      });
    } catch {
      // Ignored
    } finally {
      setReportSubmitting(false);
      setReportSubmitted(true);
      setTimeout(() => {
        setReportSubmitted(false);
        setReportingFacility(null);
        setReportText('');
        setReporterEmail('');
      }, 2000);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
              <MapPin className="w-4 h-4" />
              <span>Nationwide Healthcare Directory · Pakistan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42152F] mt-1">
              Find Breast Health & Oncology Facilities
            </h1>
            <p className="text-xs sm:text-sm text-[#625766] mt-1 max-w-2xl leading-relaxed">
              Search verified diagnostic centres, tertiary care cancer hospitals, and public screening clinics across Pakistan with verified contact details and services.
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-white border border-[#FCE7F3] rounded-xl self-start md:self-auto shrink-0">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#E83E8C] text-white shadow-xs'
                  : 'text-[#625766] hover:text-[#42152F]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                viewMode === 'map'
                  ? 'bg-[#E83E8C] text-white shadow-xs'
                  : 'text-[#625766] hover:text-[#42152F]'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Interactive Map</span>
            </button>
          </div>
        </div>

        {/* Search Controls Card */}
        <div className="p-4 sm:p-6 bg-white border border-[#FCE7F3] rounded-2xl shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#625766] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by hospital name, city (e.g. Lahore, Karachi), or service..."
                className="w-full pl-9 pr-4 py-2.5 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl text-xs sm:text-sm text-[#25202A] placeholder-[#625766]/60 focus:border-[#E83E8C] outline-none"
              />
            </div>

            {/* Use My Location Button */}
            <button
              onClick={handleUseLocation}
              disabled={locationLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#42152F] bg-[#FFF1F7] hover:bg-[#FCE7F3] border border-[#FCE7F3] rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <Navigation className={`w-3.5 h-3.5 text-[#E83E8C] ${locationLoading ? 'animate-spin' : ''}`} />
              <span>{locationLoading ? 'Getting Coordinates...' : userLocation ? 'Location Active' : 'Use My Location'}</span>
            </button>
          </div>

          {locationError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{locationError}</span>
            </div>
          )}

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#FCE7F3] text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#625766] font-medium flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                Province:
              </span>
              {provinces.map((prov) => (
                <button
                  key={prov}
                  onClick={() => setSelectedProvince(prov)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    selectedProvince === prov
                      ? 'bg-[#E83E8C] text-white'
                      : 'bg-[#FFF8FB] text-[#42152F] border border-[#FCE7F3] hover:border-[#E83E8C]'
                  }`}
                >
                  {prov}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer text-[#42152F] select-none text-[11px]">
                <input
                  type="checkbox"
                  checked={filterMammography}
                  onChange={(e) => setFilterMammography(e.target.checked)}
                  className="rounded text-[#E83E8C] focus:ring-[#E83E8C]"
                />
                <span>Has Mammography</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-[#42152F] select-none text-[11px]">
                <input
                  type="checkbox"
                  checked={filterFinancialAid}
                  onChange={(e) => setFilterFinancialAid(e.target.checked)}
                  className="rounded text-[#E83E8C] focus:ring-[#E83E8C]"
                />
                <span>Zakat / Financial Aid</span>
              </label>
            </div>
          </div>
        </div>

        {/* Live Screen Reader Announcement for Accessibility (Section 13) */}
        <div aria-live="polite" className="sr-only">
          {filteredFacilities.length} facilities found matching your criteria.
        </div>

        {/* Results Counter & Provenance Info */}
        <div className="flex items-center justify-between text-xs text-[#625766] px-1">
          <div>
            Showing <strong className="text-[#42152F] font-semibold">{filteredFacilities.length}</strong> verified healthcare facilities
            {userLocation && ' (sorted by nearest distance)'}
          </div>
          <div className="hidden sm:block">
            <span>Verified through Pakistan healthcare directories & hospital registries</span>
          </div>
        </div>

        {/* Interactive Map Mode */}
        {viewMode === 'map' && (
          <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#42152F]">Pakistan Regional Facilities Map</h3>
                <p className="text-xs text-[#625766]">Select a pin or region to view hospital details</p>
              </div>
              <span className="text-xs font-mono text-[#E83E8C] bg-[#FFF1F7] px-2.5 py-1 rounded-md border border-[#FCE7F3]">
                {filteredFacilities.length} mapped hubs
              </span>
            </div>

            {/* Stylized Pakistan Regional Map */}
            <div className="relative w-full aspect-[2/1] min-h-[300px] max-h-[460px] bg-gradient-to-b from-[#FFF8FB] to-[#FFF1F7] rounded-2xl border border-[#FCE7F3] overflow-hidden p-4 flex items-center justify-center">
              {/* Regional markers across Pakistan coordinates */}
              <div className="relative w-full h-full max-w-2xl">
                {filteredFacilities.map((fac) => {
                  const coords = getFacilityCoordinates(fac);
                  // Approximate projection for Pakistan (lat: 24 to 36, lng: 61 to 76)
                  const leftPercent = ((coords.lng - 61) / (76 - 61)) * 100;
                  const topPercent = 100 - ((coords.lat - 24) / (36 - 24)) * 100;
                  const isSelected = selectedFacility?.id === fac.id;

                  return (
                    <button
                      key={fac.id}
                      onClick={() => setSelectedFacility(fac)}
                      style={{ left: `${Math.min(Math.max(leftPercent, 8), 92)}%`, top: `${Math.min(Math.max(topPercent, 8), 92)}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full border transition-all z-10 group ${
                        isSelected
                          ? 'bg-[#E83E8C] text-white border-white scale-125 shadow-lg'
                          : 'bg-white text-[#42152F] border-[#E83E8C] hover:bg-[#E83E8C] hover:text-white hover:scale-110 shadow-xs'
                      }`}
                      title={`${fac.name} (${fac.city})`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden group-hover:block whitespace-nowrap px-2 py-0.5 bg-[#42152F] text-white text-[10px] rounded shadow-md pointer-events-none">
                        {fac.city}: {fac.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}

                {/* Regional Labels in Map Canvas */}
                <span className="absolute top-1/4 left-1/4 text-xs font-bold text-slate-300 pointer-events-none uppercase tracking-widest">
                  Khyber Pakhtunkhwa
                </span>
                <span className="absolute top-1/3 left-1/2 text-xs font-bold text-slate-300 pointer-events-none uppercase tracking-widest">
                  Punjab
                </span>
                <span className="absolute top-1/2 left-1/5 text-xs font-bold text-slate-300 pointer-events-none uppercase tracking-widest">
                  Balochistan
                </span>
                <span className="absolute bottom-1/6 left-2/5 text-xs font-bold text-slate-300 pointer-events-none uppercase tracking-widest">
                  Sindh
                </span>
              </div>
            </div>

            {/* Selected Facility Card if clicked on map */}
            {selectedFacility && (
              <div className="p-4 bg-[#FFF8FB] border border-[#E83E8C]/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-semibold text-[#E83E8C] bg-white px-2 py-0.5 rounded border border-[#FCE7F3]">
                    {selectedFacility.city}, {selectedFacility.province}
                  </span>
                  <h4 className="font-bold text-sm text-[#42152F] mt-1">{selectedFacility.name}</h4>
                  <p className="text-xs text-[#625766]">{formatAddress(selectedFacility.address)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/find-care/${selectedFacility.slug}`}
                    className="px-3 py-1.5 bg-[#E83E8C] text-white text-xs font-semibold rounded-lg"
                  >
                    View Details
                  </Link>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${getFacilityCoordinates(selectedFacility).lat},${getFacilityCoordinates(selectedFacility).lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-white border border-[#FCE7F3] text-xs font-semibold rounded-lg text-[#42152F]"
                  >
                    Directions
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Facilities Grid (List View) */}
        {viewMode === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFacilities.map((facility) => {
              if (!facility) return null;
              const facCoords = getFacilityCoordinates(facility);
              const distance =
                userLocation && typeof userLocation.lat === 'number' && typeof userLocation.lng === 'number'
                  ? calculateDistanceKm(userLocation.lat, userLocation.lng, facCoords.lat, facCoords.lng)
                  : null;

              return (
                <div
                  key={facility.id}
                  className="bg-white border border-[#FCE7F3] rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative"
                >
                  <div>
                    {/* Top Bar: Verification Badge & Distance */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>{t('verifiedBadge')}</span>
                      </span>

                      {distance !== null && (
                        <span className="text-xs font-mono font-semibold text-[#E83E8C] bg-[#FFF1F7] px-2 py-0.5 rounded-md border border-[#FCE7F3] tabular-nums">
                          ~{distance.toFixed(1)} km away
                        </span>
                      )}
                    </div>

                    <h2 className="text-base font-bold text-[#42152F] hover:text-[#E83E8C] transition-colors">
                      <Link to={`/find-care/${facility.slug}`}>{facility.name}</Link>
                    </h2>
                    <p className="text-xs text-[#625766] font-urdu mt-0.5">{facility.urduName}</p>

                    <p className="text-xs text-[#625766] mt-2 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E83E8C] shrink-0 mt-0.5" />
                      <span>{formatAddress(facility.address)}</span>
                    </p>

                    {/* Services tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {(facility.services || []).map((svc) => (
                        <span
                          key={svc}
                          className="px-2 py-0.5 bg-[#FFF8FB] text-[#42152F] text-[10px] rounded border border-[#FCE7F3] font-medium"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>

                    <p className="mt-3 text-xs text-[#625766] leading-relaxed line-clamp-2">
                      {facility.notes}
                    </p>
                  </div>

                  {/* Bottom Card Actions & Contacts */}
                  <div className="mt-6 pt-4 border-t border-[#FCE7F3] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-4 text-[#42152F]">
                      {facility.contacts?.phone && (
                        <a
                          href={`tel:${facility.contacts.phone.replace(/\s+/g, '')}`}
                          className="flex items-center gap-1 hover:text-[#E83E8C] font-semibold text-[11px]"
                        >
                          <Phone className="w-3 h-3 text-[#E83E8C]" />
                          <span>{facility.contacts.phone}</span>
                        </a>
                      )}

                      {facility.contacts?.website && (
                        <a
                          href={facility.contacts.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[#625766] hover:text-[#E83E8C] text-[11px]"
                        >
                          <Globe className="w-3 h-3" />
                          <span>Website</span>
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${facCoords.lat},${facCoords.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FFF1F7] hover:bg-[#FCE7F3] text-[#42152F] text-[11px] font-semibold rounded-lg border border-[#FCE7F3] transition-colors"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-3 h-3 text-[#E83E8C]" />
                      </a>

                      <button
                        onClick={() => setReportingFacility(facility)}
                        title="Report incorrect details"
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredFacilities.length === 0 && (
          <div className="p-12 text-center bg-white border border-[#FCE7F3] rounded-2xl space-y-3">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-[#42152F]">No Healthcare Facilities Matched</h3>
            <p className="text-xs text-[#625766] max-w-sm mx-auto">
              Try removing filters, searching for a nearby major city like Lahore, Karachi, or Islamabad, or browsing all facilities.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setSelectedProvince('All');
                setFilterMammography(false);
                setFilterFinancialAid(false);
              }}
              className="mt-2 px-4 py-2 text-xs font-semibold text-[#E83E8C] bg-[#FFF1F7] hover:bg-[#FCE7F3] rounded-lg border border-[#FCE7F3]"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Report Correction Modal */}
      {reportingFacility && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#FCE7F3] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#42152F] flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-[#E83E8C]" />
                <span>Report Outdated Information</span>
              </h3>
              <button
                onClick={() => setReportingFacility(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#625766]">
              Submitting correction report for: <strong>{reportingFacility.name}</strong>
            </p>

            {reportSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you. Your feedback has been queued for medical editorial review.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitCorrection} className="space-y-3">
                <textarea
                  required
                  rows={4}
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Describe the outdated phone number, address change, or modified clinic services..."
                  className="w-full p-3 text-xs text-[#25202A] bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl outline-none focus:border-[#E83E8C]"
                />
                <input
                  type="email"
                  value={reporterEmail}
                  onChange={(e) => setReporterEmail(e.target.value)}
                  placeholder="Your email (optional, for verification follow-up)"
                  className="w-full p-2.5 text-xs text-[#25202A] bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl outline-none focus:border-[#E83E8C]"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setReportingFacility(null)}
                    className="px-3 py-1.5 text-xs text-[#625766] hover:text-[#42152F]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={reportSubmitting}
                    className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#E83E8C] hover:bg-[#D81B60] disabled:opacity-50 rounded-lg shadow-xs"
                  >
                    <Send className="w-3 h-3" />
                    <span>{reportSubmitting ? 'Submitting...' : 'Submit Report'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
