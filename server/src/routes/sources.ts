import { Router, Request, Response } from 'express';
import { db } from '../data/db';

export const sourcesRouter = Router();

// GET /api/v1/sources
sourcesRouter.get('/', (req: Request, res: Response) => {
  res.json({
    total: db.sources.length,
    sources: db.sources,
  });
});
