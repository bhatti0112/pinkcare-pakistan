import { Request, Response, NextFunction } from 'express';

// In-memory rate limiting bucket
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const rateLimiter = (maxRequests = 60, windowMs = 60 * 1000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'anonymous';
    const clientKey = `${ip}_${req.baseUrl}`;
    const now = Date.now();

    const record = rateLimitMap.get(String(clientKey));

    if (!record || now > record.resetTime) {
      rateLimitMap.set(String(clientKey), { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      return res.status(429).json({
        error: 'TooManyRequests',
        message: 'Rate limit exceeded. Please wait a few moments before trying again.',
      });
    }

    record.count++;
    next();
  };
};

export const applySecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Helmet-compatible essential security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
};
