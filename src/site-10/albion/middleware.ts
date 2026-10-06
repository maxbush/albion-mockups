import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function preferredLocale(header: string | null): 'en' | 'ru' {
  if (!header) return 'en';
  const langs = header
    .split(',')
    .map((part) => part.split(';')[0].trim().toLowerCase());
  for (const lang of langs) {
    if (lang === 'ru' || lang.startsWith('ru-')) return 'ru';
    if (lang === 'en' || lang.startsWith('en-')) return 'en';
  }
  return 'en';
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname === '/') {
    url.pathname = `/${preferredLocale(req.headers.get('accept-language'))}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/'] };
