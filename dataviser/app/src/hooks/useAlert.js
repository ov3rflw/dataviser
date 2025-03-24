import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useAlerts() {
    const [alerts, setAlerts] = useState([]);
    const [alertCount, setAlertCount] = useState(0);
    const socketRef = useRef(null);
    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await fetch('/api/ids/alert');
                const data = await response.json();

                if(data.message){
                    console.log("Pas d'alertes dans la base")
                } else {
                    setAlerts(data.alerts);
                    setAlertCount(data.alerts.length);
                }

            } catch (error) {
                console.error('Erreur lors de la récupération des alertes:', error);
            }
        };

        fetchAlerts();

        socketRef.current = io('http://localhost:3001/');
        socketRef.current.on('alert', (newAlert) => {
            setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
            setAlertCount((prevCount) => prevCount + 1);
        });

        return () => {
            socketRef.current.off('alert');
        };
    }, []);

    return { alerts, alertCount };
}
