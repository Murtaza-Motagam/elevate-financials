import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROTECTED_ROUTES } from './lib/constant';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('Authorization-token');
  const loginUrl = new URL('/login', request.url);
  const protectedRoutes = PROTECTED_ROUTES;

  if (!token && protectedRoutes?.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(loginUrl);
  }

  if (
    token &&
    (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
