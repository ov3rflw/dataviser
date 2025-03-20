"use client";

import { useState } from "react"

import "./AlertPage.css";

import AlertGeneral from "../AlertGeneral/AlertGeneral";
import AlertHealth from "../AlertHealth/AlertHealth";
import AlertVuln from "../AlertVuln/AlertVuln";
import Navbar from "../Navbar/Navbar";

export default function AlertPage() {

    const [activeTab, setActiveTab] = useState("general");

    const handleClick = (tab) => {
        setActiveTab(tab);
    }

    return (
        <>
            <Navbar />
            <div className="alert__page">
                {/* alert__page TOP */}
                <div className="alert__page--select">
                    <ul className="alert__page--list">
                        <li id={activeTab === "general" ? "general" : ""} onClick={() => { handleClick("general") }}>
                            <p>
                                Général
                            </p>
                        </li>
                        <li id={activeTab === "vuln" ? "vuln" : ""} onClick={() => { handleClick("vuln") }}>
                            <p>
                                Vulnérabilité
                            </p>
                        </li>
                        <li id={activeTab === "health" ? "health" : ""} onClick={() => { handleClick("health") }}>
                            <p>
                                Health
                            </p>
                        </li>
                    </ul>
                </div>
                {/* alert__page MID */}
                <div className="alert__page--main">
                    {activeTab === "general" && <AlertGeneral />}
                    {activeTab === "vuln" && <AlertVuln />}
                    {activeTab === "health" && <AlertHealth />}
                </div>
            </div>
        </>
    )
}