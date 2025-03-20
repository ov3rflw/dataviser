import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";

export async function GET(){
    
    try {
        const alerts = await prisma.alert.findMany({
            orderBy: {
                timestamp: 'desc'
            }
        })

        return NextResponse.json({status: 200, alerts})
    } catch (error) {
        return NextResponse.json({status: 500, message:error})
    }
}
