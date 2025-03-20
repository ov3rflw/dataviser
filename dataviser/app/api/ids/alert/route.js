import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";

export async function POST(req){

    const response = await req.json();

    const alert = await prisma.alert.create({
        srcIp,alertType,description,timestamp,ip
    });
    
    try {
        return NextResponse.json({status: 200, message: {response,alert}})
    } catch (error) {
        return NextResponse.json({status: 500}, {message:error})
    }
}
