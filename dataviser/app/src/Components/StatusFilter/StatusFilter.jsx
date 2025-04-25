import "./StatusFilter.css"
import { useState, useRef, useEffect } from "react";
import useAlertFilter from "../../../store/useAlertFilter";
import useAlerts from "../../hooks/useAlert";

export default function StatusFilter() {
    const [isOpen, setIsOpen] = useState(false);
    const { alerts, alertCount } = useAlerts([]);

    const uniqueAlertTypes = [...new Set(alerts.map(alert => alert.alertType))];

    const currentModal = useRef();

    const openModal = () => {
        setIsOpen(!isOpen);
    }

    const handleAlertChange = () => {
        
    }

    /* const handleClickOutside = (event) => {
        if (currentModal.current && !currentModal.current.contains(event.target)) {
            setIsOpen(false);
        }
    } 

     useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []) */

    useEffect(() => {

    })

    return (
        <div className="StatusFilter__wrapper">
            <div className="StatusFilter" onClick={openModal}>
                <p className="StatusFilter__p">
                    Filtrer par alerte
                </p>
            </div>
            {isOpen ? (
                <div
                    className="StatusFilter__modal"
                    ref={currentModal}
                >
                    <ul className="StatusFilter__modal--list">
                        {uniqueAlertTypes.map((alertType, index) => (
                            <li key={index}>
                                <p>{alertType}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}
