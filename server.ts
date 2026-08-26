import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

async function startServer() {
  const app = express();

  // 1. Create Vite dev server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  // 2. Use vite's connect instance as middleware
  app.use(vite.middlewares);

  // 3. SSR HTML Handler (Omit the path string so it captures all incoming GET requests)
  app.use(async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Read index.html template
      let template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
      
      // Apply Vite HTML transforms (HMR injection, etc.)
      template = await vite.transformIndexHtml(url, template);

      // Load server entrypoint
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      
      // Render component to HTML string
      const appHtml = await render(url);

      // Inject rendered HTML into template placeholder
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  // 4. Listen on your chosen port
  const PORT = process.env.PORT || 5173;
  app.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
}

startServer();