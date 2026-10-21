import { Router, Request, Response } from 'express';
import { db } from '../data/db';

export const articlesRouter = Router();

// GET /api/v1/articles
articlesRouter.get('/', (req: Request, res: Response) => {
  const { category, search } = req.query;

  let results = db.articles.filter(a => a.publicationStatus === 'published');

  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter(a => a.category === category);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.urduTitle.includes(q)
    );
  }

  res.json({
    total: results.length,
    articles: results,
  });
});

// GET /api/v1/articles/:slug
articlesRouter.get('/:slug', (req: Request, res: Response) => {
  const slug = req.params.slug;
  const article = db.articles.find(a => a.slug === slug || a.id === slug);

  if (!article) {
    return res.status(404).json({
      error: 'NotFound',
      message: `Article '${slug}' not found.`,
    });
  }

  res.json(article);
});
