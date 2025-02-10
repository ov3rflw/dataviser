"use client";

import { useState } from "react";

export default function Login(){

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    async function handleSubmit (e) {
        e.preventDefault();
        console.log(email, password)


        let userData = {
            email: email,
            hashedPassword: password,
        }

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
    }

    return(
        <div className="loginComponent">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}