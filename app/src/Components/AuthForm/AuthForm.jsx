"use client";

import "./AuthForm.css";

import { useState, useEffect } from "react"
import Register from "../Register/Register"
import Login from "../Login/Login";
import Image from "next/image";


import City from "../../../public/assets/city.jpg";
import Red from "../../../public/assets/red.jpg";
import Sky from "../../../public/assets/sky.jpg";

export default function AuthForm() {

    const [ isClicked, setIsClicked ] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const imageSrc = [
        { src: Sky, alt: "sky image", text: "Monitoring threats, safeguarding success." },
        { src: Red, alt: "red image", text: "The eye of the IDS, ever watchful, hunts the ghosts of the network." },
        { src: City, alt: "city image", text: "Real-time detection, proactive protection." }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSrc.length)
        }, 15000);

        return () => clearInterval(interval);

    }, []);

    return (
        <div className="authComponent">
            <div className="authComponent__left">
                <div className="authComponent__left--top">
                    <h1>dataviser://</h1>
                    <p>Retour sur le site</p>
                </div>
                <div className="authComponent__left--bottom">
                    <h2>{imageSrc[currentImageIndex].text}</h2>
                </div>
                <div className="authComponent__image--wrapper">
                    <Image src={imageSrc[currentImageIndex].src} alt={imageSrc[currentImageIndex].alt} width={0} height={0} sizes="100vw" />
                </div>
            </div>
            <div className="authComponent__right">
                <div className="authComponent__right--wrapper">
                    <div className="authComponent__right--hero">
                        <h1>{isClicked ? "Connectez-vous":"Créer un compte"}</h1>
                        <p>
                            {isClicked ? "Vous n'avez pas de compte?" : "Vous avez déjà un compte?"}
                            <a onClick={() => {setIsClicked(!isClicked)}} style={{cursor: "pointer"}}>
                                {isClicked ? "S'inscrire" : "Se connecter"}
                            </a>
                        </p>
                    </div>
                    <div className="authComponent__right--wrapper">
                        { isClicked ? <Login /> : <Register />}
                    </div>
                </div>
            </div>
        </div>
    )
}