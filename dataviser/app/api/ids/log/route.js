import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";

export async function GET() {
  try {
    const logs = await prisma.log.findMany({
      orderBy: {
        timestamp: 'desc'
      },
      take: 100 // Limiter à 100 entrées récentes
    });
    
    return NextResponse.json(logs);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}