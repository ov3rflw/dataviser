import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function useAlerts(){

    const [alerts, setAlerts] = useState([]);
    const [alertCount, setAlertCount] = useState(0);

    useEffect(() => {

        const socket = io("http://localhost:3001");

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

    return { alerts, alertCount };
}