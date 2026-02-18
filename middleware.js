import { NextResponse } from "next/server";
import { verifyJWT } from "./utils/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;

  // Only apply to API routes
  if (pathname.startsWith("/api")) {
    // 1. Always public routes
    if (pathname.startsWith("/api/auth/login")) {
      return NextResponse.next();
    }

    let isProtected = false;

    // 2. Enquiries and Careers: Public POST (submission), Protected GET/DELETE (admin)
    if (
      pathname.startsWith("/api/enquiries") ||
      pathname.startsWith("/api/careers")
    ) {
      if (method !== "POST") {
        isProtected = true;
      }
    }
    // 3. Other Routes (Properties, Blogs, etc.): Protected POST/PUT/DELETE, Public GET
    else {
      if (["POST", "PUT", "DELETE"].includes(method)) {
        isProtected = true;
      }
    }

    // Apply authentication check if protected
    if (isProtected) {
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
