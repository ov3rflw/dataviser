import { NextRequest, NextResponse } from "next/server";

export async function POST(req){
    try {
        console.log(req);
        return NextResponse.json({status: 200}, {message: req})
    } catch (error) {
        return NextResponse.json({status: 500}, {message:error})
    }
}