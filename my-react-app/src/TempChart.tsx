import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface TemperatureChartProps {
  labels: string[];
  dataPoints: number[];
}

function TemperatureChart({ labels, dataPoints }: TemperatureChartProps) {
  const data = {
    labels: labels.length ? labels : ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: dataPoints.length ? dataPoints : [18, 22, 28, 30, 25, 20],
        borderColor: "#1e90ff",
        backgroundColor: "rgb(245, 248, 249)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div style={{ backgroundColor: "#fffcfc", padding: 8, borderRadius: 8, display: "flex", alignItems: "flex-start" }}>
      <div style={{ width: "100%", height: 220 }}>
        <Line data={data} options={options} height={200} />
      </div>
    </div>
  );
}

export default TemperatureChart;