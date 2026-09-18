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