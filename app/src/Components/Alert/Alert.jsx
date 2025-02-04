"use client";

import "./Alert.css";

import Alerts from "../../../public/assets/alerts.svg"

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Image from "next/image";

export default function Alert() {

    const [alerts, setAlerts] = useState([]);
    const [alertCount, setAlertCount] = useState(0);

    useEffect(() => {

        const socket = io("http://localhost:4000");

        socket.on("alert", (data) => {

        if (data && data.message && data.timestamp) {
            setAlerts((prevAlerts) => [data, ...prevAlerts]);            
            setAlertCount((prevCount) => prevCount + 1);
        }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="main__alerts">
            <div className="main__alerts--top">
                <div className="alerts__img--container">
                    <Image src={Alerts} alt="alert icon" width={30}></Image>
                </div>
                <h3>Nombre d'alertes</h3>
                <p>
                    {alertCount}
                </p>
            </div>
            <div className="main__alerts--bottom">
                <ul>
                    {alerts.map((data, index) => (
                        <li key={index}>
                            <strong>
                                    {new Date(data.timestamp).toLocaleString()}
                            </strong>
                            <p>
                                {data.message}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
