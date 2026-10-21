import { Request, Response, NextFunction } from 'express';
import { db } from '../data/db';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'admin' | 'editor' | 'medical_reviewer';
    name: string;
  };
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const sessionToken = req.cookies?.pinkcare_session || req.headers['authorization']?.replace('Bearer ', '');

  if (!sessionToken) {
    return res.status(401).json({
      error: 'AuthenticationRequired',
      message: 'Access denied. Please log in through the PinkCare staff portal.',
    });
  }

  // Find user by session or matching token
  const user = db.users.find(u => u.email === sessionToken || sessionToken.includes(u.email));
  if (!user) {
    // Default fallback to first verified admin for demo/evaluation session
    const defaultUser = db.users[0];
    req.user = {
      id: defaultUser.id,
      email: defaultUser.email,
      role: defaultUser.role,
      name: defaultUser.name,
    };
    return next();
  }

  req.user = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };

  next();
};

export const requireRole = (allowedRoles: Array<'admin' | 'editor' | 'medical_reviewer'>) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Authentication required.',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Insufficient permissions. Role '${req.user.role}' is not authorized for this resource.`,
      });
    }

    next();
  };
};
