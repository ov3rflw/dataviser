//récupérer l'id de l'entête ici
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res){
    try {
        const userId = req.headers.get('x-user-id') || null;
        if(!userId){
            return NextResponse.json({status: 401}, {response: "error"});
        }
        return NextResponse.json({status: 200}, {response: userId});
    } catch(error){
        return NextResponse.json({status: 401}, {error:`Erreur : ${error}`})
    }
}