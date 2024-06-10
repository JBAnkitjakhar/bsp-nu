import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { normalUserRoutes, powerUserRestrictedRoutes, publicRoutes } from './lib/routes';


export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Allow requests to public routes without authentication

    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET!, // Ensure this matches the secret used in your auth configuration
        salt: process.env.AUTH_SALT || 'authjs.session-token',  // Ensure this matches the salt used for your cookies
    });
    console.log(token);
    
    if (publicRoutes.includes(pathname)) {
        // if(token&&pathname==='/login'){
        //     return NextResponse.redirect(new URL('/', request.url));

        // }
        return NextResponse.next();
    }

    if (!token) {
        // Redirect to login if no token is found
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const userType = token.userType;

    // Redirect admin users to /admin/register
    if (userType === 'admin') {
        if (pathname !== '/admin/register') {
            return NextResponse.redirect(new URL('/admin/register', request.url));
        }
    } else if (userType === 'normal') {
        // Normal users can access only /dashboard
        if (!normalUserRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } else if (userType === 'poweruser') {
        // Power users cannot access admin routes
        if (powerUserRestrictedRoutes.some(route => pathname.match(route))) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Redirect authenticated users away from /login page
    if (pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Continue to the requested route
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)', // Match all routes except API and static files
    ],
};