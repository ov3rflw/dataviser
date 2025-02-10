import { NextRequest, NextResponse } from 'next/server';

export function middleware(req) {
  console.log('Middleware exécuté');
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
