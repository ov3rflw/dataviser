import useAlerts from "../../hooks/useAlert";
import "./AlertGeneral.css";

export default function AlertGeneral() {

    const { alerts, alertCount } = useAlerts([]);

    return (
        <div className="AlertGeneral">
            <div className="AlertGeneral__top">
                <div className="AlertGeneral__top--left">
                    rien
                </div>
                <div className="AlertGeneral__top--right">
                    <p>Filtrer par date</p>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>IP Source</th>
                        <th>Type d'Alerte</th>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {alerts.map((alert) => (
                        <tr key={alert.id}>
                            <td>{alert.id}</td>
                            <td>{alert.srcIp}</td>
                            <td className="AlertGeneral__alertType">
                                <p>{alert.alertType}</p>
                            </td>
                            <td>{alert.description}</td>
                            <td>{new Date(alert.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}