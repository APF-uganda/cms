import fs from 'node:fs';
import path from 'node:path';

type MiddlewareConfig = {
  fallbackFile?: string;
};

export default (config: MiddlewareConfig = {}) => {
  const fallbackFile = config.fallbackFile || 'uploads/fallback.jpg';
  const publicDir = path.join(process.cwd(), 'public');
  const fallbackPath = path.join(publicDir, fallbackFile);
  const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);

  return async (ctx: any, next: () => Promise<void>) => {
    if (ctx.method !== 'GET' || !ctx.path.startsWith('/uploads/')) {
      await next();
      return;
    }

    const decodedPath = decodeURIComponent(ctx.path);
    const absoluteRequestedPath = path.join(publicDir, decodedPath);
    const extension = path.extname(decodedPath).toLowerCase();
    const isImageRequest = imageExtensions.has(extension);

    if (!isImageRequest) {
      await next();
      return;
    }

    if (fs.existsSync(absoluteRequestedPath)) {
      await next();
      return;
    }

    if (!fs.existsSync(fallbackPath)) {
      await next();
      return;
    }

    ctx.set('Cache-Control', 'public, max-age=300');
    ctx.type = path.extname(fallbackPath);
    ctx.status = 200;
    ctx.body = fs.createReadStream(fallbackPath);
  };
};
