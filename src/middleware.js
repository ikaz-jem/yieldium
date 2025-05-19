// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authRoutes = ["/login", "/register"]

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });
  const { pathname } = req.nextUrl;
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  // if ( pathname.startsWith('/dashboard')) {
  //   // const ua = req.headers() || ''
  //   // console.log(ua)
  //   // const isMobile = /mobile|android|iphone|ipad/i.test(ua)
  //   const res = NextResponse.next()
  //   res.cookies.set('path', String(pathname))
  //   return res
  // }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/login',
    '/register',
    `/dashboard/:path*`,
  ],
};
