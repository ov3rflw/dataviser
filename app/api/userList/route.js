import { NextResponse } from 'next/server';

export async function GET(request) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      lastName: true,
      firstName: true,
    },
  });

  return NextResponse.json(users, {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
    },
  });
}
