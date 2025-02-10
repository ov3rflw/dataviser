"use client";

import { useState, useRef } from "react";

import "./Login.css";

export default function Login(){

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [inputError, setInputError] = useState({email: false, password: false});
    const [errors, setErrors] = useState([]);
    const inputPasswordRef = useRef();
    const inputEmailRef = useRef();

    async function handleSubmit (e) {
        e.preventDefault();

        console.log(errors);

        let userData = {
            email: email,
            hashedPassword: password,
        }

        if(inputPasswordRef.current.value.trim() === ""){
            inputError.password = true;
        } else {
            inputError.password = false;
        }

        if(inputEmailRef.current.value.trim() === ""){
            inputError.email = true;
        } else {
            inputError.email = false;
        }

        if(password && email){
            const res = await fetch("http://localhost:3000/api/login", {
                method:"POST",
                body: JSON.stringify(userData),
                headers:{
                    "Content-Type":"application/json"
                }  
            });

            const data = await res.json();

            if(!res.ok){
                setErrors(data.message)
            } else {
                setErrors("")
            }
            

        } 
    }

    return(
        <div className="loginComponent__right">
            <div className="loginComponent__right--wrapper">
                <p>{errors}</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={inputError.email ? {border: "2px solid red"} : {border: "2px solid #3c364c"}} ref={inputEmailRef}/>
                    <input type="password" placeholder="Mot de passe" style={inputError.password ? {border: "2px solid red"} : {border: "2px solid #3c364c"}} onChange={(e) => setPassword(e.target.value)} ref={inputPasswordRef}></input>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    )
}