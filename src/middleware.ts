export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ['/wishlists', '/cart', '/admin/:path*'] };
export async function middleware(request: NextRequest) {
    console.log("running middleware");
    const token = await getToken({ req: request });

    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (token && !token.isAdmin) {
        return NextResponse.redirect(new URL('/unauthorised', request.url));
    }

    return NextResponse.next();
}

