import { NextResponse } from "next/server";
import { prisma } from "../../src/lib/prisma";
import { hashCompare } from "../../src/lib/hashCompare";
import { hashPassword } from "../../src/lib/hashPassword";

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, hashedPassword } = body;

        if (request.method !== "POST") {
            return NextResponse.json({
                status: 405,
                errors: ["Method Not Allowed"],
            });
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return NextResponse.json({
                status: 401,
                errors: ["Email ou mot de passe incorrect"],
            });
        }

        const passwordIsValid = await hashCompare(hashedPassword, user.hashedPassword);

        if(passwordIsValid){
            return NextResponse.json({
                status: 200,
                message: "Connexion réussie",
                user: {
                    id: user.id,
                    email: user.email,
                },
            });
        } else {
            return NextResponse.json({
                status: 401,
                errors:["Email ou mot de passe incorrect"]
            })
        }


    } catch (e) {
        // Gérer les erreurs
        console.error("Erreur lors de la connexion :", e);
        return NextResponse.json({
            status: 500,
            errors: [`Une erreur est survenue : ${e.message}`],
        });
    }
}