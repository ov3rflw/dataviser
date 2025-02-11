import { NextResponse } from "next/server";
import { cookies } from "next/headers"

export async function GET(request, res){
    try { 
        const response = NextResponse.json({message: "success"}, {status: 200})
        const cookieStore = await cookies();
        cookieStore.delete("token");

        return response;
        
    } catch (error) {
        return NextResponse.json({message: `failed ${error}`}, {status: 401})
    } 
}