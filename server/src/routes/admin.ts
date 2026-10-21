import { Router, Response } from 'express';
import { db } from '../data/db';
import { AuthenticatedRequest, requireAuth, requireRole } from '../middleware/auth';

export const adminRouter = Router();

// Protect all admin endpoints with requireAuth
adminRouter.use(requireAuth);

// GET /api/v1/admin/facilities
adminRouter.get('/facilities', (req: AuthenticatedRequest, res: Response) => {
  const mapped = db.facilities.map(f => ({
    ...f,
    address: typeof f.address === 'object' && f.address !== null ? (f.address as any).fullAddress || '' : f.address,
    addressDetails: typeof f.address === 'object' ? f.address : undefined,
    coordinates: f.location?.coordinates
      ? { lat: f.location.coordinates[1], lng: f.location.coordinates[0] }
      : { lat: 31.5204, lng: 74.3587 },
  }));

  res.json({
    total: mapped.length,
    facilities: mapped,
  });
});

// POST /api/v1/admin/facilities/:id/verify (medical_reviewer or admin)
adminRouter.post(
  '/facilities/:id/verify',
  requireRole(['admin', 'medical_reviewer']),
  (req: AuthenticatedRequest, res: Response) => {
    const facility = db.facilities.find(f => f.id === req.params.id || f.slug === req.params.id);

    if (!facility) {
      return res.status(404).json({ error: 'NotFound', message: 'Facility not found.' });
    }

    facility.verification.status = 'verified';
    facility.verification.lastVerifiedAt = new Date().toISOString().split('T')[0];
    facility.updatedAt = new Date().toISOString();

    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      action: 'FACILITY_VERIFIED',
      actorEmail: req.user!.email,
      role: req.user!.role,
      resourceType: 'facility',
      resourceId: facility.id,
      timestamp: new Date().toISOString(),
      status: 'SUCCESS',
    });

    res.json({
      success: true,
      message: `Facility '${facility.name}' verified successfully.`,
      facility,
    });
  }
);

// GET /api/v1/admin/audit-logs (admin only)
adminRouter.get(
  '/audit-logs',
  requireRole(['admin']),
  (req: AuthenticatedRequest, res: Response) => {
    res.json({
      total: db.auditLogs.length,
      logs: db.auditLogs,
    });
  }
);

// GET /api/v1/admin/reports (community reports)
adminRouter.get(
  '/reports',
  requireRole(['admin', 'editor', 'medical_reviewer']),
  (req: AuthenticatedRequest, res: Response) => {
    res.json({
      total: db.reports.length,
      reports: db.reports,
    });
  }
);
