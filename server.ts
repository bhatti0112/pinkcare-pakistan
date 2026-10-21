import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

import { applySecurityHeaders } from './server/src/middleware/security';
import { facilitiesRouter } from './server/src/routes/facilities';
import { articlesRouter } from './server/src/routes/articles';
import { sourcesRouter } from './server/src/routes/sources';
import { aiRouter } from './server/src/routes/ai';
import { authRouter } from './server/src/routes/auth';
import { adminRouter } from './server/src/routes/admin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const isProd = process.env.NODE_ENV === 'production';

  // Core Middleware
  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());
  app.use(applySecurityHeaders);

  // Health Check Endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      app: 'PinkCare Pakistan',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  // API v1 Routing
  const apiRouter = express.Router();
  apiRouter.use('/facilities', facilitiesRouter);
  apiRouter.use('/articles', articlesRouter);
  apiRouter.use('/sources', sourcesRouter);
  apiRouter.use('/ask-pinkcare', aiRouter);
  apiRouter.use('/auth', authRouter);
  apiRouter.use('/admin', adminRouter);

  app.use('/api/v1', apiRouter);

  // Frontend Integration
  if (!isProd) {
    // Development: mount Vite in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve built static client assets
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌸 PinkCare platform running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start PinkCare server:', err);
  process.exit(1);
});
