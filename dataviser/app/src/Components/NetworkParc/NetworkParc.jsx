"use client";

import Image from "next/image";

import IPI from "../../../public/assets/ipi.png";

import "./NetworkParc.css";
import Navbar from "../Navbar/Navbar";

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
        <>
            <Navbar />
            <div className="NetworkParc">
                <div className="NetworkParc__top">
                    <div className="NetworkParc__left--customerName">
                        <h2>Nom de l'entreprise</h2>
                        <div className="customerName__wrapper">
                            <div className="customerName__wrapper--left">
                                <Image src={IPI} alt="IPI icon" width={50} height={50} />
                            </div>
                            <div className="customerName__wrapper--right">
                                <h3>IPI</h3>
                                <p>École d'informatique</p>
                            </div>
                        </div>
                    </div>
                    <div className="NetworkParc__left--address">
                        <h2>Adresse</h2>
                        <p>47 Rue du Sergent Michel Berthet, 69009 Lyon, France</p>
                    </div>
                </div>
                <div className="NetworkParc__bottom">
                    <div className="NetworkParc__bottom--contactInfo">
                        <h2>Informations de contact</h2>
                        <form onSubmit={() => { console.log('données envoyées') }}>
                            <h3>Adresse e-mail</h3>
                            <input type="email" placeholder="exemple@mail.fr"></input>
                            <h3>Numéro de téléphone</h3>
                            <input type="tel" placeholder="+33612345678"></input>
                        </form>
                    </div>
                    <div className="NetworkParc__bottom--general">
                        <h2>Général</h2>
                        <form onSubmit={() => { console.log('date envoyée') }}>
                            <div className="NetworkParc__left--generalTop">
                                <div className="form-group">
                                    <h3>Date d'envoi</h3>
                                    <input type="date" />
                                </div>
                                <div className="form-group">
                                    <h3>Date de retour</h3>
                                    <input type="date" />
                                </div>
                            </div>
                            <div className="NetworkParc__left--generalBottom">
                                <div className="form-group">
                                    <h3>Numéro de facture</h3>
                                    <input type="text" placeholder="#1NV-123124124" />
                                </div>
                                <div className="form-group">
                                    <h3>ID Produit</h3>
                                    <input type="text" placeholder="#69SDF15" />
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

                {/* <div className="NetworkParc__left--top">
                        <div className="NetworkParc__left--topLeft">
                        <div className="NetworkParc__left--customerName">
                            <h2>Nom de l'entreprise</h2>
                            <div className="customerName__wrapper">
                                <div className="customerName__wrapper--left">
                                    <Image src={IPI} alt="IPI icon" width={50} height={50} />
                                </div>
                                <div className="customerName__wrapper--right">
                                    <h3>IPI</h3>
                                    <p>École d'informatique</p>
                                </div>
                            </div>
                        </div>
                        <div className="NetworkParc__left--contactInfo">
                            <h2>Informations de contact</h2>
                            <form onSubmit={() => { console.log('données envoyées') }}>
                                <h3>Adresse e-mail</h3>
                                <input type="email" placeholder="exemple@mail.fr"></input>
                                <h3>Numéro de téléphone</h3>
                                <input type="tel" placeholder="+33612345678"></input>
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
                                    <input type="text" />
                                    <h3>ID Produit</h3>
                                    <h3>Numéro de facture</h3>
                                    <input type="text" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="NetworkParc__left--invoiceDetails">
                        <h1>TEST</h1>
                    </div>
                </div> */}
                {/* <div className="NetworkParc__bottom--left">
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
                </div> */}
            </div>
        </>
    )
}