// middleware.ts
import { NextResponse } from "next/server";
import { getToken }     from "next-auth/jwt";


const authRoutes = ["/login","/register"]

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });                                                                    

  const { pathname } = req.nextUrl;

  // 1. If user *is* authenticated AND on /login → send to /dashboard
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));        
  }

  // 2. If user is *not* authenticated AND trying /dashboard → send to /login
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));            
  }

  // 3. Otherwise, continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",           // catch exact /login:contentReference[oaicite:6]{index=6}
    "/register",           // catch exact /login:contentReference[oaicite:6]{index=6}
    "/dashboard/:path*",// protect dashboard sub‑paths:contentReference[oaicite:7]{index=7}
  ],
};
