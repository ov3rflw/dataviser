"use client"

import { useEffect, useState } from "react";

import { useRouter } from 'next/navigation';

import "./Register.css";
import Apple from "../../../public/assets/apple.png";
import City from "../../../public/assets/city.jpg";
import Google from "../../../public/assets/google.png";
import Image from "next/image";
import Red from "../../../public/assets/red.jpg";
import Sky from "../../../public/assets/sky.jpg";
import { redirect } from "next/dist/server/api-utils";


export default function Register(){
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passError, setPassError] = useState(false);
    const [termCondition, setTermCondition] = useState(
        {status: "Veuillez accepter les conditions d'utilisations", cond: false}
    );
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const router = useRouter();

    const imageSrc = [
        {src: Sky, alt: "sky image", text:"Monitoring threats, safeguarding success."},
        {src: Red, alt:"red image", text:"The eye of the IDS, ever watchful, hunts the ghosts of the network."},
        {src: City, alt:"city image", text:"Real-time detection, proactive protection."}
    ];

    useEffect(() => {
        const interval =  setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSrc.length)
        }, 15000);

        return() => clearInterval(interval);

    }, []);
    
    

    async function handleSubmit(e){
        e.preventDefault();
        // upgrade cette vérification plus tard

        if(termCondition){
            let userData = {
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            };
    
            const res = await fetch("http://localhost:3000/api/create", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type":"application/json",
                },
            })

            if(res.status == 200){
                router.push('/');
            }

        } else {
            console.log("veuillez accepter les conditions")
        }
        
    };

    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked; // Vérifie si la checkbox est cochée
        setTermCondition({
            status: isChecked ? "Conditions d'utilisations acceptées" : "Veuillez accepter les conditions d'utilisations",
            cond: isChecked
        });
    };

    return(
        <div className="registerComponent">
            <div className="registerComponent__left">
                <div className="registerComponent__left--top">
                    <h1>dataviser://</h1>
                    <p>Retour sur le site</p>
                </div>
                <div className="registerComponent__left--bottom">
                     <h2>{imageSrc[currentImageIndex].text}</h2>
                </div>
                <div className="registerComponent__image--wrapper">
                    <Image src={imageSrc[currentImageIndex].src} alt={imageSrc[currentImageIndex].alt} width={0} height={0} sizes="100vw" />
                </div>
            </div>
            <div className="registerComponent__right">
                <div className="registerComponent__right--wrapper">
                    <div className="registerComponent__right--hero">
                        <h1>Créer un compte</h1>
                        <p>
                            Vous avez déjà un compte?
                            <a href="#">
                                Se connecter
                            </a>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="registerComponent__right--top">
                            <input type="text" placeholder="Nom" onChange={(e) => setLastName(e.target.value) }/>
                            <input type="text" placeholder="Prénom" onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div className="registerComponent__right--footer">
                            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}/>
                            <input type="password" placeholder="Confirmer le mot de passe" onChange={(e) => setConfirmPassword(e.target.value)} />
                            <div className="userCondition">
                                <input type="checkbox" checked={termCondition.cond} onChange={handleCheckboxChange}/>
                                <p>J'accepte les <a href="#">conditions d'utilisations</a></p>
                            </div>
                            <button type="submit">S'inscrire</button>
                        </div>
                    </form>
                    <div className="registerComponenet__right--extra">
                        <div className="registerComponent__separator">
                            <span></span>
                                <p id="registerComponent__right--text">Ou connectez-vous avec</p>
                            <span></span>
                        </div>
                        <div className="registerComponent__extra--connexion">
                            <div className="registerComponent__google">
                                <Image src={Google} width={25} alt="google icon" />
                                <p>Google</p>
                            </div>
                            <div className="registerComponent__apple">
                                <Image src={Apple} width={25} alt="apple icon" />
                                <p>Apple</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}