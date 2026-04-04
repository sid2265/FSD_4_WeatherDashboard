import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface HumidityChartProps {
  labels: string[];
  dataPoints: number[];
}

function HumidityChart({ labels, dataPoints }: HumidityChartProps) {
  const data = {
    labels: labels.length ? labels : ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    datasets: [
      {
        label: "Humidity (%)",
        data: dataPoints.length ? dataPoints : [65, 60, 55, 50, 58, 62],
        backgroundColor: "rgba(54,162,235,0.6)",
        borderColor: "#36a2eb",
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
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default HumidityChart;
