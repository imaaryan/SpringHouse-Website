import { NextResponse } from "next/server";
import { verifyJWT } from "@/utils/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("token")?.value;

    const verifiedToken =
      token &&
      (await verifyJWT(token).catch((err) => {
        console.error(err);
      }));

    if (!verifiedToken) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect /login if already authenticated
  if (pathname.startsWith("/login")) {
    const token = request.cookies.get("token")?.value;
    const verifiedToken =
      token &&
      (await verifyJWT(token).catch((err) => {
        console.error(err);
      }));

    if (verifiedToken) {
      const dashboardUrl = new URL("/admin", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
