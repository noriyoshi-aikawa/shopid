import { ipAddress, next } from '@vercel/edge';

export const config = {
  matcher: '/:path*',
};

const ALLOWED_IPS = new Set<string>([
  '210.172.128.240',
]);

const FORBIDDEN_HTML = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>403 Forbidden</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif; padding: 4rem 2rem; text-align: center; color: #333; }
  h1 { color: #c00; margin-bottom: 1rem; }
  p { color: #666; }
</style>
</head>
<body>
<h1>403 Forbidden</h1>
<p>このページは社内ネットワークからのみアクセス可能です。</p>
</body>
</html>`;

export default function middleware(request: Request) {
  const ip = ipAddress(request) ?? '';

  if (!ALLOWED_IPS.has(ip)) {
    return new Response(FORBIDDEN_HTML, {
      status: 403,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  return next();
}
