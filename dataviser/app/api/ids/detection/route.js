import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";

export async function POST(req){

    const response = await req.json();

    const detection = await prisma.detection.create({
        srcIp,detectionType,packetCount,threshold,timestamp
    });
    
    try {
        return NextResponse.json({status: 200, message: {response, detection}})
    } catch (error) {
        return NextResponse.json({status: 500}, {message:error})
    }
}
