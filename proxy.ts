import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSessionToken } from "./lib/admin-auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/login";

  const token = request.cookies.get("admin_session")?.value;
  const session = await verifyAdminSessionToken(token);

  if (isAdminRoute && !session) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginRoute && session) {
    const adminUrl = new URL("/admin", request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};