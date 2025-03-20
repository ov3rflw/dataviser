"use client";

import "./Alert.css";

import Alerts from "../../../public/assets/alerts.svg"
import useAlerts from "../../hooks/useAlert";

import Image from "next/image";

export default function Alert() {

    const { alerts, alertCount } = useAlerts([]);

    alerts.map((element) => {
        console.log(element.srcIp)
    })

    return (
        <div className="main__alerts">
            <div className="main__alerts--top">
                <div className="alerts__img--container">
                    <Image src={Alerts} alt="alert icon" width={30}></Image>
                </div>
                <h3>Nombre d'alertes</h3>
                <p>
                    {alertCount ? (alertCount) : '0'}
                </p>
            </div>
            <div className="main__alerts--bottom">
                <ul>
                    {alerts.map((alert, index) => (
                        <li key={index}>
                            <strong>{new Date(alert.timestamp).toLocaleString()}</strong>
                            <p>{alert.alertType} | {alert.srcIp}</p>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}
