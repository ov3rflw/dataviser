import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import useDateStore from "../../store/useDateStore";
import dayjs from "dayjs";

export default function useAlerts() {
    const [alerts, setAlerts] = useState([]);
    const [alertCount, setAlertCount] = useState(0);
    const socketRef = useRef(null);
    const { selectedDate } = useDateStore();

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await fetch('/api/ids/alert');
                const data = await response.json();

                if (data.message) {
                    setAlerts([]);
                    setAlertCount(0);
                } else {
                    let filteredAlerts = data.alerts;

                    if (!isNaN(selectedDate)) {
                        const selectedDateStr = dayjs(selectedDate).format("YYYY-MM-DD");

                        filteredAlerts = filteredAlerts.filter((alert) => {
                            const alertDate = dayjs(alert.timestamp).format("YYYY-MM-DD");
                            return alertDate.startsWith(selectedDateStr);
                        });
                    } else {
                        setAlerts(data.alerts);
                        setAlertCount(data.alerts.length)
                    }

                    setAlerts(filteredAlerts);
                    setAlertCount(filteredAlerts.length);
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchAlerts();

        socketRef.current = io('http://localhost:3001/');
        socketRef.current.on('alert', (newAlert) => {
            const alertDate = dayjs(newAlert.timestamp).format("YYYY-MM-DD");
            const selectedDateStr = selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : null;

            if (!selectedDate || alertDate === selectedDateStr) {
                setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
                setAlertCount((prevCount) => prevCount + 1);
            } 
        });

        return () => {
            socketRef.current.off('alert');
        };
    }, [selectedDate]);

    return { alerts, alertCount };
}
