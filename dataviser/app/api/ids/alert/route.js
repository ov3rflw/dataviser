import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";

export async function GET(){
    
    try {
        const alerts = await prisma.alert.findMany({
            orderBy: {
                timestamp: 'desc'
            }
        });

        if(Array.isArray(alerts) && alerts.length > 0){
            return NextResponse.json({status: 200, alerts});
        }

        return NextResponse.json({status: 200, message:"Pas de données à récupérer"});

    } catch (error) {
        return NextResponse.json({status: 500, error});
    }
}
