import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { normalUserRoutes, powerUserRestrictedRoutes, publicRoutes } from './lib/routes';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET!,
        // Ensure this matches the name of the secure cookie used in production
        cookieName: process.env.NODE_ENV === 'production' ? '__Secure-authjs.session-token' : 'authjs.session-token',
        salt: process.env.AUTH_SALT || 'authjs.session-token',
    });
    console.log(token);

    if (publicRoutes.includes(pathname)) {
        if(token && pathname === '/login'){
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const userType = token.userType;

    if (userType === 'admin') {
        if (pathname !== '/admin/register') {
            return NextResponse.redirect(new URL('/admin/register', request.url));
        }
    } else if (userType === 'normal') {
        if (!normalUserRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } else if (userType === 'poweruser') {
        if (powerUserRestrictedRoutes.some(route => pathname.match(route))) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
};