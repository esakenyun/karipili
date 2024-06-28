import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const bearerToken = request.cookies.get("token");
    if (bearerToken) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  } catch (err) {
    console.log(err.message);
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
