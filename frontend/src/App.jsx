import { useEffect, useState } from "react";
import axios from "axios";

import SensorCard from "./components/SensorCard";
import TemperatureChart from "./components/TemperatureChart";

import "./index.css";

function App() {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    const fetchReadings = () => {
      axios
        .get("http://127.0.0.1:8000/api/readings")
        .then((response) => {
          setReadings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching sensor data:", error);
        });
    };

    fetchReadings();

    const interval = setInterval(fetchReadings, 5000);

    return () => clearInterval(interval);
  }, []);

  const latestReading = readings[0];
  const temperatureAlert = latestReading && latestReading.temperature > 10;
  const humidityAlert = latestReading && latestReading.humidity > 80;
  const batteryAlert = latestReading && latestReading.battery_level < 20;
  const solarAlert = latestReading && latestReading.solar_power < 100;

  return (
    <div className="dashboard">
      <header className="header">
        <h1>SOLARCOOL NER</h1>
        <p>Smart Decentralized Mini Cold Storage</p>
      </header>

      {latestReading && (
        <>
          <div className="room-info">
            <h2>Cold Room: {latestReading.device_id}</h2>

            <span className="status">
              ● SYSTEM ONLINE
            </span>
          </div>

{temperatureAlert && (
  <div className="alert">
    ⚠️ HIGH TEMPERATURE ALERT: Cold room temperature is above 10°C
  </div>
)}

{humidityAlert && (
  <div className="alert">
    ⚠️ HIGH HUMIDITY ALERT: Cold room humidity is above 80%
  </div>
)}

{batteryAlert && (
  <div className="alert">
    ⚠️ LOW BATTERY ALERT: Battery level is below 20%
  </div>
)}

{solarAlert && (
  <div className="alert">
    ⚠️ LOW SOLAR POWER ALERT: Solar power is below 100 W
  </div>
)}

          <div className="sensor-grid">
            <SensorCard
              title="Temperature"
              value={latestReading.temperature}
              unit="°C"
              icon="🌡️"
            />

            <SensorCard
              title="Humidity"
              value={latestReading.humidity}
              unit="%"
              icon="💧"
            />

            <SensorCard
              title="Battery"
              value={latestReading.battery_level}
              unit="%"
              icon="🔋"
            />

            <SensorCard
              title="Solar Power"
              value={latestReading.solar_power}
              unit="W"
              icon="☀️"
            />
          </div>

          <TemperatureChart readings={readings} />
        </>
      )}
    </div>
  );
}

export default App;