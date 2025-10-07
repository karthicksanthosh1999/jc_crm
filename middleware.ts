import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token: any = req.nextauth.token;

    // 🔒 Redirect if not logged in
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // 🎯 Role-based protection logic
    const path = req.nextUrl.pathname;

    // Example rules:
    if (path.startsWith("/super-admin") && token.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (
      path.startsWith("/admin") &&
      !["ADMIN", "SUPER_ADMIN"].includes(token.role)
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (
      path.startsWith("/sales") &&
      !["SALES_MANAGER", "ADMIN", "SUPER_ADMIN"].includes(token.role)
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Allow request to continue
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Basic auth check
    },
  }
);

// 🛣️ Apply middleware only to protected routes
export const config = {
  matcher: [
    "/leads/:path*",
    "/users/:path*",
    "/sales/:path*",
    "/dashboard/:path*",
  ],
};
