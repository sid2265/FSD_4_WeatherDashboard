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

interface WindChartProps {
  labels: string[];
  dataPoints: number[];
}

function WindChart({ labels, dataPoints }: WindChartProps) {
  const data = {
    labels: labels.length ? labels : ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    datasets: [
      {
        label: "Wind Speed (km/h)",
        data: dataPoints.length ? dataPoints : [8, 10, 14, 12, 9, 7],
        borderColor: "#ff7f50",
        backgroundColor: "rgba(255,127,80,0.2)",
        borderDash: [6, 4],
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

export default WindChart;
