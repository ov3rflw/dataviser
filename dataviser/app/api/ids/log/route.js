import { NextRequest, NextResponse } from "next/server";

export async function POST(req){

    const response = await req.json();

    const log = await prisma.log.create({
        level,message,category,ip,timestamp
    });
    
    try {
        return NextResponse.json({status: 200, message:{response, log}})
    } catch (error) {
        return NextResponse.json({status: 500}, {message:error})
    }
}
