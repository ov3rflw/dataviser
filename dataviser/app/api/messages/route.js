import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get('userId'));
  const receiverId = parseInt(searchParams.get('receiverId'));

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, receiverId: receiverId },
          { senderId: receiverId, receiverId: userId }
        ]
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json([]);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const message = await prisma.message.create({
      data: {
        content: body.content,
        senderId: parseInt(body.senderId),
        receiverId: parseInt(body.receiverId)
      }
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}