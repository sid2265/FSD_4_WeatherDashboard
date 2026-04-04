import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/forecast", async (req, res) => {
  const city = req.query.city;
  const date = req.query.date;

  if (!city || !date) {
    return res.status(400).json({ error: "city and date query parameters are required" });
  }

  try {
    const geo = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
    if (!geo.data.results || !geo.data.results.length) {
      return res.status(404).json({ error: "City not found" });
    }

    const { latitude, longitude, timezone } = geo.data.results[0];
    const lat = Number(latitude);
    const lon = Number(longitude);

    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      console.error("Invalid geocoding response:", { latitude, longitude, timezone });
      return res.status(500).json({ error: "Invalid coordinates returned by geocoding API" });
    }

    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation&start_date=${date}&end_date=${date}&timezone=${encodeURIComponent(timezone)}`;

    const forecastResp = await axios.get(forecastUrl);
    const hourly = forecastResp.data.hourly;

    const time = hourly.time || [];
    const temps = hourly.temperature_2m || [];
    const humidity = hourly.relativehumidity_2m || [];
    const wind = hourly.windspeed_10m || [];
    const precipitation = hourly.precipitation || [];

    // Build structured list of objects for compatibility if needed
    const list = time.map((t, i) => ({
      dt_txt: t,
      main: { temp: temps[i], humidity: humidity[i] },
      wind: { speed: wind[i] },
      rain: { "3h": precipitation[i] },
    }));

    return res.json({ list, temps, humidity, wind, precipitation, time });
  } catch (error) {
    console.error(error?.message || error);
    res.status(500).json({ error: "Failed to fetch forecast data" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});