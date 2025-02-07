import { SHA256 as sha256 } from "crypto-js";
import { prisma } from "../../src/lib/prisma";
import { NextResponse } from 'next/server';
export const hashPassword = (string) => {
  return sha256(string).toString();
};

// Handle POST requests
export async function POST(request) {
  try {
    const body = await request.json();
    const { lastName, firstName, email, password, confirmPassword } = body;

    console.log(lastName,firstName,email,password,confirmPassword)
    
    if( !lastName || !firstName || !email || !password || !confirmPassword){
      return NextResponse.json(
        { errors: ["Veuillez compléter tous les champs."]},
        { status: 400}
      )
    }
    
    if (password.length < 6) {
      return NextResponse.json(
        { errors: ["Votre mot de passe doit faire plus de 6 caractères"] },
        { status: 400 }
      );
    }
    
    if(password == confirmPassword){
      const hashedPassword = hashPassword(password)
    } else {
      return NextResponse.json(
        {errors: "Les mots de passe ne sont pas les mêmes"},
        {status: 400}
      )
    }
    
    if(password == confirmPassword){
      const hashedPassword = hashPassword(password);

      await prisma.user.create({
        data:{
          lastName, firstName, hashedPassword, email
        }
      });

      return NextResponse.json(
        {status: 200},
        {success: "Utilisateur créé"}
      )

    } else {
      return NextResponse.json({
        status: 400,
        error: "Les mots de passe ne sont pas pareil."
      })
    }
    
  } catch(e) {
    if(e.name == "PrismaClientKnownRequestError" && e.code == "P2002"){
      return NextResponse.json("Cette adresse e-mail est déjà utilisée")
    }
    return NextResponse.json(e);
  }
}