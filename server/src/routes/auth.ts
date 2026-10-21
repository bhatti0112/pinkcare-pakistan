import { Router, Request, Response } from 'express';
import { db } from '../data/db';
import { rateLimiter } from '../middleware/security';
import { AuthenticatedRequest, requireAuth } from '../middleware/auth';

export const authRouter = Router();

// POST /api/v1/auth/login
authRouter.post('/login', rateLimiter(10, 60 * 1000), (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'ValidationError',
      message: 'Email and password are required.',
    });
  }

  const user = db.users.find(u => u.email.toLowerCase() === String(email).toLowerCase());

  if (!user) {
    // Audit failed login attempt
    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      action: 'LOGIN_FAILED',
      actorEmail: String(email),
      role: 'unauthenticated',
      resourceType: 'auth',
      timestamp: new Date().toISOString(),
      status: 'FAILED',
    });

    return res.status(401).json({
      error: 'InvalidCredentials',
      message: 'Invalid staff email or credentials.',
    });
  }

  // Set secure HTTP-only cookie
  res.cookie('pinkcare_session', user.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
  });

  // Audit successful login
  db.auditLogs.unshift({
    id: `log-${Date.now()}`,
    action: 'LOGIN_SUCCESS',
    actorEmail: user.email,
    role: user.role,
    resourceType: 'auth',
    timestamp: new Date().toISOString(),
    status: 'SUCCESS',
  });

  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token: user.email,
  });
});

// POST /api/v1/auth/logout
authRouter.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('pinkcare_session');
  res.json({ success: true, message: 'Logged out successfully.' });
});

// GET /api/v1/auth/me
authRouter.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({ user: req.user });
});
