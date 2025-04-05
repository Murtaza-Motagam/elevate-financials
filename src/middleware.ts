import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTHENTICATION_ROUTES, COOKIE_KEYS, PROTECTED_ROUTES } from './lib/constant';
import { getCookie } from './lib/cookieStorage';

export async function middleware(request: NextRequest) {
  const token = await getCookie(COOKIE_KEYS.token);
  const loginUrl = new URL('/login', request.url);
  const protectedRoutes = PROTECTED_ROUTES;
  const authRoutes = new Set(AUTHENTICATION_ROUTES);

  if (!token && protectedRoutes?.some((route) => request.nextUrl.pathname.startsWith(route))) {
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && authRoutes.has(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
