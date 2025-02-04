import LineChart from "../../../features/LineChart";
import "./Stats.css"

export default function Stats(){

    const bandwidthData = [
        { time: "10:00", value: 0 },
        { time: "10:05", value: 0 },
        { time: "10:10", value: 0 },
        { time: "10:20", value: 0 },
        { time: "10:15", value: 0 },
        { time: "10:15", value: 0 },
    ]

    return(
        <div className="main__stats">
            <p>Évolution trafic réseau</p>
            <div className="chart__container">
                <LineChart data={bandwidthData} />
            </div>
        </div>
    )
}