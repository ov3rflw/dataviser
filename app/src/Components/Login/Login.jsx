"use client";

import { useState } from "react";

import "./Login.css";

export default function Login(){

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErros] = useState([]);

    async function handleSubmit (e) {
        e.preventDefault();

        let userData = {
            email: email,
            hashedPassword: password,
        }

        if(password && email){
            const res = await fetch("http://localhost:3000/api/login", {
                method:"POST",
                body: JSON.stringify(userData),
                headers:{
                    "Content-Type":"application/json"
                }  
            }).then((res) => {
                console.log(res);
            })
            .then((content) => {
                console.log(content);
            })
        } else {
            setErros(["Veuillez compléter les champs"])
        }

    }

    return(
        <div className="loginComponent__right">
            <div className="loginComponent__right--wrapper">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    )
}