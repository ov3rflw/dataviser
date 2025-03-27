import useAlerts from "../../hooks/useAlert";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import StatusFilter from "../StatusFilter/StatusFilter";
import "./AlertGeneral.css";

export default function AlertGeneral() {

    const { alerts, alertCount } = useAlerts([]);

    return (
        <div className="AlertGeneral">
            <div className="AlertGeneral__top">
                <div className="AlertGeneral__top--left">
                    <StatusFilter />
                </div>
                <div className="AlertGeneral__top--right">
                    <CustomDatePicker />
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
                    {alerts.length > 0 ? (alerts.map((alert) => (
                        <tr key={alert.id}>
                            <td className="AlertGeneral__alertId">{alert.id}</td>
                            <td className="AlertGeneral__alertIp">{alert.srcIp}</td>
                            <td className="AlertGeneral__alertType">
                                <p>{alert.alertType}</p>
                            </td>
                            <td className="AlertGeneral__description">{alert.description}</td>
                            <td className="AlertGeneral__timestamp">{new Date(alert.timestamp).toLocaleString()}</td>
                        </tr>
                    ))) : (
                        <tr className="AlertGeneral__noAlerts">
                            <td>
                                Pas d'alertes.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}