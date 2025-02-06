"use client"

import { useEffect, useState } from "react";

import "./Register.css";
import Red from "../../../public/assets/red.jpg";
import City from "../../../public/assets/city.jpg";
import Sky from "../../../public/assets/sky.jpg";
import Image from "next/image";

export default function Register(){
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passError, setPassError] = useState(false);
    const [termCondition, setTermCondition] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const imageSrc = [
        {src: Sky, alt: "sky image", text:"Monitoring threats, safeguarding success."},
        {src: Red, alt:"red image", text:"The eye of the IDS, ever watchful, hunts the ghosts of the network."},
        {src: City, alt:"city image", text:"Real-time detection, proactive protection."}
    ];

    useEffect(() => {
        validatePassword(password, confirmPassword);
    },[password, confirmPassword]);

    useEffect(() => {
        const interval =  setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSrc.length)
        }, 4000);

        return() => clearInterval(interval);

    }, []);
    
    function validatePassword(pass, confirmPass){
        let isValid = confirmPass === pass;
        if(!isValid) {
            setPassError(true);
        };
    };

    async function handleSubmit(e){
        e.preventDefault();
        let userData = {
            firstName,
            lastName,
            email,
            password
        };

        const res = await fetch("http://localhost:3000/api/user/create", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type":"application/json",
            },
        });

        if (res.ok){
            const data = await res.json();
        } else {
            return null;
        }
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
                                <input type="checkbox" />
                                <p>J'accepte les conditions d'utilisations</p>
                            </div>
                            <button type="submit">S'inscrire</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}