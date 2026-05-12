import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const authRoutes = ["/login", "/register"];
const protectedRoutes = ["/dashboard"];

async function verifyToken(token, secret) {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload;
  } catch {
    return null;
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("token")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute) {
    if (accessToken) {
      const payload = await verifyToken(accessToken, secret);
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const payload = await verifyToken(accessToken, secret);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const response = NextResponse.next();
    response.headers.set("x-user-id", payload.userId);
    return response;
  }

  if (pathname.startsWith("/api") && accessToken) {
    const payload = await verifyToken(accessToken, secret);
    if (payload) {
      const response = NextResponse.next();
      response.headers.set("x-user-id", payload.userId);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/api/:path*"],
};