import { NextResponse } from "next/server";
import { prisma } from "../../src/lib/prisma";
import { hashCompare } from "../../src/lib/hashCompare";
import { SignJWT } from "jose";

export async function POST(request) {
    try {
        if (request.method !== "POST") {
            return NextResponse.json(
                { errors: ["Method Not Allowed"] },
                { status: 405 }
            );
        }

        const body = await request.json();
        const { email, hashedPassword } = body;
        
        const user = await prisma.user.findUnique({
            where: { email },
        });
        
        if (!user) {
            return NextResponse.json(
                { message: "Email ou mot de passe incorrect" },
                { status: 401 }
            );
        } 
        
        const passwordIsValid = await hashCompare(hashedPassword, user.hashedPassword);
        
        if (!passwordIsValid) {
            return NextResponse.json(
                { message: "Email ou mot de passe incorrect" },
                { status: 401 }
            );
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET)

        const signToken = await new SignJWT({userId: user.id})
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(secret)

        const response =  NextResponse.json(
            { message: "Connexion réussie"},
            { status: 200} 
        );

        response.headers.set(
            "Set-Cookie",
            `token=${signToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
        );
        
        return response;

    } catch (e) {
        console.error("Erreur lors de la connexion :", e);
        return NextResponse.json(
            { errors: [`Une erreur est survenue : ${e.message}`] },
            { status: 500 }
        );
    }
}
