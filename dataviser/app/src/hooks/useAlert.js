import { useState, useEffect } from "react";
import useDateStore from "../../store/useDateStore";
import dayjs from "dayjs";

export default function useAlerts() {
    const [alerts, setAlerts] = useState([]);
    const [alertCount, setAlertCount] = useState(0);
    const { selectedDate } = useDateStore();

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await fetch('/api/ids/alert');
                const data = await response.json();

                if (data.message) {
                    console.log("Pas d'alertes dans la base");
                    setAlerts([]);
                    setAlertCount(0);
                } else {
                    let filteredAlerts = data.alerts;

                    if (selectedDate) {
                        const selectedDateStr = dayjs(selectedDate).format("YYYY-MM-DD");
                        filteredAlerts = filteredAlerts.filter((alert) =>
                            alert.timestamp.startsWith(selectedDateStr)
                        );
                    }

                    setAlerts(filteredAlerts);
                    setAlertCount(filteredAlerts.length);
                }

            } catch (error) {
                console.error('Erreur lors de la récupération des alertes:', error);
            }
        };

        fetchAlerts();
    }, [selectedDate]);

    return { alerts, alertCount };
}
