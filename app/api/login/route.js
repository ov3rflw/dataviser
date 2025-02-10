import { NextResponse } from "next/server";
import { prisma } from "../../src/lib/prisma";
import { hashCompare } from "../../src/lib/hashCompare";

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

        return NextResponse.json(
            {
                message: "Connexion réussie",
                user: {
                    id: user.id,
                    email: user.email,
                },
            },
            { status: 200 }
        );

    } catch (e) {
        console.error("Erreur lors de la connexion :", e);
        return NextResponse.json(
            { errors: [`Une erreur est survenue : ${e.message}`] },
            { status: 500 }
        );
    }
}
