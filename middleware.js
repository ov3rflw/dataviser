import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request, response) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("token")?.value;
  const authRoutes = ["/login", "/register"];
  const protectedRoutes = ["/dashboard"];

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  if (accessToken) {
    try {
      const token = await jwtVerify(accessToken, secret);
      const userId = token.payload.userId
      const response = NextResponse.next();
      response.headers.set('x-user-id', userId);
      return NextResponse.next();
    } catch (e) {
      console.log(e);
    }
  }

  if (authRoutes.includes(pathname)) {
    if (accessToken) {
      try {
        await jwtVerify(accessToken, secret);
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (e) {
        console.error("Invalid token");
      }
    }
    return NextResponse.next();
  }

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await jwtVerify(accessToken, secret);
      return NextResponse.next();
    } catch (e) {
      console.error("Invalid token");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// export config pour que le middleware soit actif sur ces endpoints
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
