"use client";


import "./Navbar.css";

import Rules from "../../../public/assets/rules.svg"
import Alert from '../../../public/assets/alerts.svg';
import Home from '../../../public/assets/home.svg';
import Logs from '../../../public/assets/logs.svg';
import Network from '../../../public/assets/network.svg';
import Settings from '../../../public/assets/settings.svg';
import Stats from '../../../public/assets/monitoring.svg';

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar(){

    const [ isLogout, setIsLogout ] = useState(false)
    const router = useRouter();

    async function handleClick() {
        await fetch("/api/auth/logout", {
            method:"GET"
        })
        .then((response) => {
            if(response.ok){
                setIsLogout(true);
                router.push('/login');
            } else {
                console.log("Status error : ", response.status);
            }
        })
    }

    return(
        <nav>
            <div id="nav__title">
                <h2 id="nav__title--name" style={{cursor: "pointer"}}onClick={() => router.push('/dashboard')}>dataviser://</h2>
            </div>
            <ul id="nav__top">
                <li id="nav__top--decorator">
                    <p>
                        Menu
                    </p>
                </li>
                <li id="nav__top--dashboard">
                    <Link href="/dashboard">
                        <Image src={Home} alt="home icon" />
                        <p>
                            Tableau de bord
                        </p>
                    </Link>
                </li>
                <li id="nav__top--alerts">
                    <Link href="/alerts">
                        <Image src={Alert} alt="alert icon"/>
                        <p>
                            Alertes
                        </p>
                    </Link>
                </li>
                <li id="nav__top--network">
                    <Link href="/network">
                        <Image src={Network} alt="network icon"/>
                        <p>
                            Trafic Réseau
                        </p>
                    </Link>
                </li>
                <li id="nav__top--rules">
                    <Link href="/rules">
                        <Image src={Rules} alt="rules icon"/>
                        <p style={{textWrap:"nowrap"}}>
                            Règles Détection
                        </p>
                    </Link>
                </li>
                <li id="nav__top--logs">
                    <Link href="/logs">
                        <Image src={Logs} alt="logs icon"/>
                        <p>
                            Logs & Historique
                        </p>
                    </Link>
                </li>
                <li id="nav__top--stats">
                    <Link href="/stats">
                        <Image src={Stats} alt="stats icon"/>
                        <p>
                            Statistiques
                        </p>
                    </Link>
                </li>
                <li id="nav__top--settings">
                    <Link href="/settings">
                        <Image src={Settings} alt="settings icon"/>
                        <p>
                            Paramètres
                        </p>
                    </Link>
                </li>
            </ul>
            <ul id="nav__bottom">
                <li id="nav__bottom--logout">
                    <p onClick={handleClick}>
                        Se déconnecter
                    </p>
                </li>
            </ul>
        </nav>
    )
}