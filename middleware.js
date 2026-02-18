import { NextResponse } from "next/server";
import { verifyJWT } from "./utils/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Only apply to API routes
  if (pathname.startsWith("/api")) {
    // Exclude public routes: enquiries and login
    if (
      pathname.startsWith("/api/enquiries") ||
      pathname.startsWith("/api/auth/login")
    ) {
      return NextResponse.next();
    }

    // Apply authentication check for POST, PUT, and DELETE requests
    if (method === "POST" || method === "PUT" || method === "DELETE") {
      const authHeader = request.headers.get("authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          { success: false, error: "Authentication required" },
          { status: 401 },
        );
      }

      const token = authHeader.split(" ")[1];
      const payload = await verifyJWT(token);

      if (!payload) {
        return NextResponse.json(
          { success: false, error: "Invalid or expired token" },
          { status: 401 },
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
