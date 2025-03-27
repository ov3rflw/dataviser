"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.time),
    datasets: [
      {
        label:"Évolution du trafic réseau",
        data: data.map((d) => d.value),
        borderColor: "#c8b3f0",
        backgroundColor: "white",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: false },
        ticks:{display: false},
        suggestedMin: 10,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { position: false },
      tooltip: { enabled: true },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
