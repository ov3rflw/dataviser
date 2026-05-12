import { prisma } from "../../src/lib/prisma";
import { validateEmail } from "../../src/lib/validateEmail";
import { hashPassword } from "../../src/lib/hashPassword";
import { NextResponse } from 'next/server';
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import socket from "../../src/lib/socketClient";

export async function POST(request) {
  try {
    const body = await request.json();
    const { lastName, firstName, email, password, confirmPassword } = body;

    const emailIsValid = validateEmail(email);
    if (emailIsValid == null) {
      return NextResponse.json(
        { errors: ["Veuillez vérifier votre adresse-email"] },
        { status: 400 }
      );
    }

    if (!lastName || !firstName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { errors: ["Veuillez compléter tous les champs."] },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { errors: ["Votre mot de passe doit faire plus de 6 caractères"] },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { errors: ["Les mots de passe ne sont pas identiques."] },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cette adresse e-mail est déjà utilisée." },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: { lastName, firstName, hashedPassword, email }
    });

    try {
      socket.emit('user_created', {
        id: newUser.id,
        lastName: newUser.lastName,
        firstName: newUser.firstName
      });
    } catch (socketError) {
      console.error(socketError);
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: newUser.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ message: "Utilisateur créé" }, { status: 201 });

  } catch (e) {
    if (e.name === "PrismaClientKnownRequestError" && e.code === "P2002") {
      return NextResponse.json(
        { errors: ["Cette adresse e-mail est déjà utilisée"] },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}