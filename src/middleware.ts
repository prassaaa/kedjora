// src/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Redirect /login ke /auth/login
  if (path === '/login') {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  // Tentukan path yang memerlukan autentikasi
  const isAdminPath = path.startsWith('/admin');
  const isAuthPath = path.startsWith('/auth');
  
  // Jika ini adalah path admin, cek autentikasi
  if (isAdminPath) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    // Jika tidak ada token atau belum terautentikasi, redirect ke login
    if (!token) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }
  
  // Jika sudah login dan mencoba akses halaman auth, redirect ke admin
  if (isAuthPath) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    
    if (token && path === '/auth/login') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

// Perbarui matcher untuk menangkap juga path /login
export const config = {
  matcher: ['/admin/:path*', '/auth/:path*', '/login'],
};