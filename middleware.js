import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const accessToken = request.cookies.get("token")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(accessToken, secret);

    return NextResponse.next();

  } catch (e) {

    if(e.code === "ERR_JWT_EXPIRED"){
      return NextResponse.redirect(new URL('/login', request.url))
    }

    NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};