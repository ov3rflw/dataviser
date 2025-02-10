import { prisma } from "../../src/lib/prisma";
import { validateEmail } from "../../src/lib/validateEmail";
import { hashPassword } from "../../src/lib/hashPassword";
import { NextResponse } from 'next/server';

// Handle POST requests
export async function POST(request) {
  try {
    const body = await request.json();
    const { lastName, firstName, email, password, confirmPassword } = body;
    const emailIsValid = validateEmail(email);
    const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

    let hashedPassword;

    if(emailIsValid == null){
        return NextResponse.json(
            {errors: ["Veuillez vérifier votre adresse-email"]},
            {status: 400}
        )
    }
  
    if (existingUser) {
        return NextResponse.json(
            { error: "Cette adresse e-mail est déjà utilisée." },
            { status: 400 }
        );
      }
    
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
        await hashPassword(password)
        .then((e) => {
          hashedPassword = e;
        })

        console.log(hashPassword);

        const newUser = await prisma.user.create({
            data:{
                lastName, firstName, hashedPassword:hashedPassword, email
            }
        });

        return NextResponse.json({status: 200, message:["Utilisateur créé !"]})

    } else {
        return NextResponse.json({errors:["Les mots de passe ne sont pas identiques."]},{status: 400})
    } 
    
  } catch(e) {
    if(e.name == "PrismaClientKnownRequestError" && e.code == "P2002"){
      return NextResponse.json({status: 400},{errors:["Cette adresse e-mail est déjà utilisée"]})
    }
    return NextResponse.json(e);
  }
}