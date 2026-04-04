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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface PrecipChartProps {
  labels: string[];
  dataPoints: number[];
}

function PrecipChart({ labels, dataPoints }: PrecipChartProps) {
  const data = {
    labels: labels.length ? labels : ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    datasets: [
      {
        label: "Precipitation (mm)",
        data: dataPoints.length ? dataPoints : [0, 0.5, 1.2, 0.8, 0.1, 0],
        borderColor: "#4bc0c0",
        backgroundColor: "rgba(75,192,192,0.25)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true } },
    scales: { x: { grid: { display: false } }, y: { beginAtZero: true } },
  };

  return (
    <div style={{ backgroundColor: "#f7fafc", padding: 8, borderRadius: 8 }}>
      <div style={{ width: "100%", height: 220 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default PrecipChart;
