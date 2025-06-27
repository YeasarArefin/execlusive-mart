export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ['/wishlists', '/cart', '/orders', '/admin/:path*'] };
export async function middleware(request: NextRequest) {
    console.log("running middleware");
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;

    // If no token, redirect to sign-in for all protected routes
    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Only check admin permissions for admin routes
    if (pathname.startsWith('/admin') && !token.isAdmin) {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // For normal users accessing wishlists/cart - allow access as long as they're logged in
    return NextResponse.next();
}

