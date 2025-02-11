import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {

  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("token")?.value;
  const defaultRoutes = ["/register","/login"];

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(accessToken, secret);


    if(defaultRoutes.includes(pathname)){
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next();

  } catch (e) {

    if(e.code === "ERR_JWT_EXPIRED"){
      return NextResponse.redirect(new URL('/login', request.url))
    }

    NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next();
}


// export config pour que le middleware soit actif sur ces endpoints
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};