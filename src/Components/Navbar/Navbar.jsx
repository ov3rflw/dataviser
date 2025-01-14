import Image from "next/image";

import "./Navbar.css";

import Rules from "../../../public/assets/rules.svg"
import Alert from '../../../public/assets/alerts.svg';
import Home from '../../../public/assets/home.svg';
import Logs from '../../../public/assets/logs.svg';
import Network from '../../../public/assets/network.svg';
import Settings from '../../../public/assets/settings.svg';
import Stats from '../../../public/assets/monitoring.svg';

export default function Navbar(){
    return(
        <nav>
            <div id="nav__title">
                <h2 id="nav__title--name">dataviser://</h2>
            </div>
            <ul id="nav__top">
                <li id="nav__top--decorator">
                    <p>
                        Menu
                    </p>
                </li>
                <li id="nav__top--dashboard">
                    <Image src={Home} alt="home icon" />
                    <a href="">
                        Tableau de bord
                    </a>
                </li>
                <li id="nav__top--alerts">
                    <Image src={Alert} alt="alert icon"/>
                    <a href="">
                        Alertes
                    </a>
                </li>
                <li id="nav__top--network">
                    <Image src={Network} alt="network icon"/>
                    <a href="">
                        Trafic Réseau
                    </a>
                </li>
                <li id="nav__top--rules">
                    <Image src={Rules} alt="rules icon"/>
                    <a href="">
                        Règles de Détection
                    </a>
                </li>
                <li id="nav__top--logs">
                    <Image src={Logs} alt="logs icon"/>
                    <a href="">
                        Logs & Historique
                    </a>
                </li>
                <li id="nav__top--stats">
                    <Image src={Stats} alt="stats icon"/>
                    <a href="">
                        Statistiques
                    </a>
                </li>
                <li id="nav__top--settings">
                    <Image src={Settings} alt="settings icon"/>
                    <a href="">
                        Paramètres
                    </a>
                </li>
            </ul>
            <ul id="nav__bottom">
                <li id="nav__bottom--logout">
                    <a href="">
                        Se déconnecter
                    </a>
                </li>
            </ul>
        </nav>
    )
}