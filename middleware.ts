import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the current path is protected
  // (matcher will ensure only /posts routes run this)
  const token = request.cookies.get('token');
  if (!token) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // Allow the request to continue
  return NextResponse.next();
}

// Only run middleware on /posts and its subroutes
export const config = {
  matcher: ['/posts/:path*'],
}; 