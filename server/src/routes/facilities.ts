import { Router, Request, Response } from 'express';
import { db } from '../data/db';

export const facilitiesRouter = Router();

// Helper: Haversine distance in km
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
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
}

// GET /api/v1/facilities
facilitiesRouter.get('/', (req: Request, res: Response) => {
  const { city, province, mammography, financialAid, search } = req.query;

  let results = [...db.facilities];

  if (city && typeof city === 'string') {
    results = results.filter(f => f.city.toLowerCase() === city.toLowerCase());
  }

  if (province && typeof province === 'string' && province !== 'All') {
    results = results.filter(f => f.province.toLowerCase() === province.toLowerCase());
  }

  if (mammography === 'true') {
    results = results.filter(f => f.verification.hasMammography);
  }

  if (financialAid === 'true') {
    results = results.filter(f => f.verification.hasFinancialAssistance);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter(
      f =>
        f.name.toLowerCase().includes(q) ||
        f.city.toLowerCase().includes(q) ||
        f.urduName.includes(q) ||
        f.services.some(s => s.toLowerCase().includes(q))
    );
  }

  const mappedResults = results.map(f => ({
    ...f,
    address: typeof f.address === 'object' && f.address !== null ? (f.address as any).fullAddress || '' : f.address,
    addressDetails: typeof f.address === 'object' ? f.address : undefined,
    coordinates: f.location?.coordinates
      ? { lat: f.location.coordinates[1], lng: f.location.coordinates[0] }
      : { lat: 31.5204, lng: 74.3587 },
  }));

  res.json({
    total: mappedResults.length,
    facilities: mappedResults,
  });
});

// GET /api/v1/facilities/nearby?lat=...&lng=...&radius=...
facilitiesRouter.get('/nearby', (req: Request, res: Response) => {
  const latStr = req.query.lat as string;
  const lngStr = req.query.lng as string;
  const radiusStr = req.query.radius as string;

  if (!latStr || !lngStr) {
    return res.status(400).json({
      error: 'InvalidCoordinates',
      message: 'Both latitude (lat) and longitude (lng) query parameters are required.',
    });
  }

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);

  if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return res.status(400).json({
      error: 'InvalidCoordinates',
      message: 'Coordinates out of valid geographic range (lat: -90 to 90, lng: -180 to 180).',
    });
  }

  // Cap radius at 500 km maximum
  const radiusKm = Math.min(Math.max(parseFloat(radiusStr) || 100, 5), 500);

  const nearby = db.facilities
    .map(facility => {
      // coordinates are [lng, lat]
      const fLng = facility.location.coordinates[0];
      const fLat = facility.location.coordinates[1];
      const distanceKm = calculateDistanceKm(lat, lng, fLat, fLng);
      return {
        ...facility,
        address: typeof facility.address === 'object' && facility.address !== null ? (facility.address as any).fullAddress || '' : facility.address,
        addressDetails: typeof facility.address === 'object' ? facility.address : undefined,
        coordinates: { lat: fLat, lng: fLng },
        distanceKm: Math.round(distanceKm * 10) / 10,
      };
    })
    .filter(item => item.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 50); // Cap at 50 results

  res.json({
    userCoordinates: { lat, lng },
    radiusKm,
    count: nearby.length,
    facilities: nearby,
  });
});

// GET /api/v1/facilities/:id (or slug)
facilitiesRouter.get('/:id', (req: Request, res: Response) => {
  const idOrSlug = req.params.id;
  const facility = db.facilities.find(f => f.id === idOrSlug || f.slug === idOrSlug);

  if (!facility) {
    return res.status(404).json({
      error: 'NotFound',
      message: `Healthcare facility '${idOrSlug}' was not found in the directory.`,
    });
  }

  res.json({
    ...facility,
    address: typeof facility.address === 'object' && facility.address !== null ? (facility.address as any).fullAddress || '' : facility.address,
    addressDetails: typeof facility.address === 'object' ? facility.address : undefined,
    coordinates: facility.location?.coordinates
      ? { lat: facility.location.coordinates[1], lng: facility.location.coordinates[0] }
      : { lat: 31.5204, lng: 74.3587 },
  });
});

// POST /api/v1/facilities/report (Community outdated info reports)
facilitiesRouter.post('/report', (req: Request, res: Response) => {
  const { facilityId, details, reporterEmail } = req.body;

  if (!facilityId || !details || details.trim().length < 5) {
    return res.status(400).json({
      error: 'ValidationError',
      message: 'Facility ID and descriptive correction details are required.',
    });
  }

  const facility = db.facilities.find(f => f.id === facilityId || f.slug === facilityId);
  const report = {
    id: `rep-${Date.now()}`,
    facilityId,
    facilityName: facility ? facility.name : 'Unknown Facility',
    details: details.trim(),
    reporterEmail: reporterEmail ? String(reporterEmail).trim() : undefined,
    status: 'pending' as const,
    submittedAt: new Date().toISOString(),
  };

  db.reports.push(report);

  res.status(201).json({
    success: true,
    message: 'Correction report submitted successfully. Queued for medical review.',
    reportId: report.id,
  });
});
