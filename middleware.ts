import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl } = req;

  // Define routes
  const authRoutes = ["/auth/signin", "/auth/signup"];
  const protectedRoutes = ["/movies/create", "/movies/edit"];

  // Check if the user is authenticated by verifying the access token
  const isAuthenticated = req.cookies.get("accessToken");

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Handle authentication routes
  if (isAuthRoute) {
    if (isAuthenticated) {
      // Redirect authenticated users to the referer or home page
      const referer = req.headers.get("referer") || "/";
      if (referer !== nextUrl.pathname) {
        return NextResponse.redirect(new URL(referer, req.nextUrl.origin));
      }
      return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }
    return NextResponse.next(); // Allow unauthenticated users access to signin
  }

  // Handle protected routes
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/auth/signin", req.nextUrl.origin);
    // Set the callback parameter to redirect the user back to the attempted page after login
    loginUrl.searchParams.set("callback", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Proceed with request if no authentication issues
  return NextResponse.next();
}

// Configuration for matching routes
export const config = {
  matcher: ["/movies/:path*", "/auth/signin", "/auth/signup"], // Apply middleware to specific routes
};
