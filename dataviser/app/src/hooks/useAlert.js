import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function useAlerts(){

    const [alerts, setAlerts] = useState([]);
    const [alertCount, setAlertCount] = useState(0);

    useEffect(() => {

        const socket = io("http://localhost:3001");
        socket.on('log')
        
    }, []);

    return { alerts, alertCount };
}