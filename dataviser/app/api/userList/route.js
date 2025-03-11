import { NextResponse } from 'next/server';
import { prisma } from '../../src/lib/prisma';

export async function GET(request) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      lastName: true,
      firstName: true,
    },
  });

  return NextResponse.json(users);
}
