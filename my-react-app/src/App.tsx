import { useState } from 'react'
import './App.css'
import TemperatureChart from './TempChart'
import HumidityChart from './HumidityChart'
import PrecipChart from './PrecipChart'
import WindChart from './WindChart'

async function fetchForecast(city: string, date: string) {
  const response = await fetch(`http://localhost:5000/forecast?city=${encodeURIComponent(city)}&date=${encodeURIComponent(date)}`);

  if (!response.ok) {
    const jsonErr = await response.json().catch(() => null);
    throw new Error(jsonErr?.error || `Failed to fetch forecast data (${response.status})`);
  }

  const data = await response.json();
  if (!data.list || !Array.isArray(data.list) || !data.list.length) {
    throw new Error("No forecast data available for selected date");
  }

  const temps = data.list.map((item: any) => item.main?.temp ?? 0);
  const humidity = data.list.map((item: any) => item.main?.humidity ?? 0);
  const wind = data.list.map((item: any) => item.wind?.speed ?? 0);
  const precipitation = data.list.map((item: any) => item.rain?.["3h"] ?? 0);
  const time = data.list.map((item: any) => item.dt_txt ?? "");

  return { temps, humidity, wind, precipitation, time };
}

function App() {
  const [cityselected, setCityselected] = useState("Pune");
  const [setdate, setSetdate] = useState("");
  const [temps, setTemps] = useState<number[]>([]);
  const [humidity, setHumidity] = useState<number[]>([]);
  const [windSpeed, setWindSpeed] = useState<number[]>([]);
  const [precipitation, setPrecipitation] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cities = ["Pune", "Mumbai", "Delhi", "Bangalore", "Chennai"];

  const handleSubmit = async () => {
    setError("");
    if (!cityselected || !setdate) {
      setError("Please select city and date.");
      return;
    }

    setLoading(true);
    try {
      const { temps, humidity, wind, precipitation, time } = await fetchForecast(cityselected, setdate);
      setTemps(temps);
      setHumidity(humidity);
      setWindSpeed(wind);
      setPrecipitation(precipitation);
      setTimeLabels(time.map((t: string) => t.slice(11, 16)));
    } catch (err) {
      setError((err as Error).message || "Unable to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div id="header">
      <h1>WEATHER FORECAST DASHBOARD</h1>
    </div>
    <div className="filter-container">
       <input type="date" id="date" value={setdate} onChange={(e) => setSetdate(e.target.value)}></input>
        <select id="city" value={cityselected} onChange={(e) => setCityselected(e.target.value)}>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <button id="button" onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
    </div>
    {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
    <div>
      <TemperatureChart labels={timeLabels} dataPoints={temps} />  
    </div>
    <div style={{ height: 20 }} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
      <HumidityChart labels={timeLabels} dataPoints={humidity} />
      <PrecipChart labels={timeLabels} dataPoints={precipitation} />
      <WindChart labels={timeLabels} dataPoints={windSpeed} />
    </div>
    </>
  )
}

export default App
