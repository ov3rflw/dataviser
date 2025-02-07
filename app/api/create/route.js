import { SHA256 as sha256 } from "crypto-js";
import { prisma } from "../../src/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from 'next/server';

// Hash password utility function
export const hashPassword = (string) => {
  return sha256(string).toString();
};

// Handle POST requests
export async function POST(request) {
  try {
    const body = await request.json();
    const { lastName, firstName, email, password } = body;

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { errors: ["Votre mot de passe doit faire plus de 6 caractères"] },
        { status: 400 }
      );
    }

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password: hashPassword(password),
      },
    });

    // Return success response
    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    // Handle Prisma errors
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          { message: "User with this email or username already exists" },
          { status: 400 }
        );
      }
      return NextResponse.json({ message: e.message }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json(
      { message: "Internal Server Error", },
      { status: 500 }
    );
  }
}