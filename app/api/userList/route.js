import { NextResponse } from "next/server";
import { prisma } from "../../src/lib/prisma";

export async function GET(){
    const getUsers = await prisma.user.findMany({
        select: {
            id: true,
            lastName: true,
            firstName: true
        }
    });

    try {
        return NextResponse.json({status: 200, getUsers})
    } catch (error) {
        return NextResponse.json({status: 401}, {error: error})
    }
}