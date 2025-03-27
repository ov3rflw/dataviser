import "./StatusFilter.css"
import { useState, useRef, useEffect } from "react";

export default function StatusFilter() {
    const [isOpen, setIsOpen] = useState(false);
    const currentModal = useRef();

    console.log(isOpen);

    const openModal = () => {
        setIsOpen(!isOpen);
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
                        <li>
                            <p>
                                DDOS
                            </p>
                        </li>
                    </ul>
                </div>
            ) : null}
        </div>
    )
}
