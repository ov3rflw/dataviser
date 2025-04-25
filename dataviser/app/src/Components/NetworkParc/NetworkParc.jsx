"use client";

import Image from "next/image";

import IPI from "../../../public/assets/ipi.png";

import "./NetworkParc.css";

export default function NetworkParc() {

    let rawInventory = {
        "Ordinateur": {
            1: {
                "brand": "Asus",
                "version": "Windows 11",
                "ipAddress": "192.168.1.50",
                "macAddress": "A1:B4:C5:C1:DD:3E",
                "user": "Jonathan"
            }
        }
    }

    return (
        <div className="NetworkParc">
            <div className="NetworkParc__left--top">
                <div className="NetworkParc__left--topLeft">
                    <div className="NetworkParc__left--customerName">
                        <div className="customerName__wrapper">
                            <h2>Nom de l'entreprise</h2>
                            <div className="customerName__wrapper--left">
                                <Image src={IPI} alt="IPI icon" width={70} height={70}/>
                            </div>
                            <div className="customerName__wrapper--right">
                                {/* ajouter les données via le serveur*/}
                                <h3>IPI</h3>
                                <p>École d'informatique</p>
                            </div>
                        </div>
                    </div>
                    <div className="NetworkParc__left--contactInfo">
                        <h2>Informations de contact</h2>
                        <form onSubmit={() => { console.log('données envoyées') }}>
                            <h3>Adresse e-mail</h3>
                            <input type="email" placeholder="Adresse email"></input>
                            <h3>Numéro de téléphone</h3>
                            <input type="tel" placeholder="Numéro de téléphone"></input>
                        </form>
                    </div>
                </div>
                <div className="NetworkParc__left--topRight">
                    <div className="NetworkParc__left--address">
                        <h2>Adresse</h2>
                        <p>1 rue Berthet, Lyon, 69004, France</p>
                    </div>
                    <div className="NetworkParc__left--general">
                        <h2>Général</h2>
                        <form onSubmit={() => { console.log('date envoyée') }}>
                            <div className="NetworkParc__left--generalTop">
                                <h3>Date d'envoi</h3>
                                <input type="date" />
                                <h3>Date de retour</h3>
                                <input type="date" />
                            </div>
                            <div className="NetworkParc__left--generalBottom">
                                <h3>Numéro de facture</h3>
                                <input type="text" />
                                <h3>ID Produit</h3>
                                <input type="text" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="NetworkParc__bottom--left">
                <h2>Inventaire du parc</h2>
                <ul className="NetworkParc__bottom--leftInventory">
                    {Object.entries(rawInventory).map(([category, items]) =>
                        Object.entries(items).map(([id, info]) => (
                            <li key={`${category}-${id}`}>
                                <strong>{category} #{id}</strong><br />
                                Marque: {info.brand} <br />
                                Version: {info.version} <br />
                                IP: {info.ipAddress} <br />
                                MAC: {info.macAddress} <br />
                                Utilisateur: {info.user}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    )
}