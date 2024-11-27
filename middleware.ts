import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // Define routes that require authentication
    const protectedRoutes = ["/create", "/edit"];

    // Check if the current route is protected
    const { pathname } = req.nextUrl;
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        // Simulate checking for authentication
        const isAuthenticated = req.cookies.get("authToken");

        // If not authenticated, redirect to the login page
        if (!isAuthenticated) {
            const loginUrl = new URL("/signin", req.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Continue to the requested page
    return NextResponse.next();
}
