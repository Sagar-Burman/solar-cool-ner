import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/readings")
      .then((response) => {
        setReadings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sensor data:", error);
      });
  }, []);

  return (
    <div>
      <h1>SOLARCOOL NER</h1>
      <p>Smart Decentralized Mini Cold Storage</p>

      <h2>Sensor Readings</h2>

      {readings.map((reading) => (
        <div key={reading.id}>
          <p>Device: {reading.device_id}</p>
          <p>Temperature: {reading.temperature} °C</p>
          <p>Humidity: {reading.humidity} %</p>
          <p>Battery: {reading.battery_level} %</p>
          <p>Solar Power: {reading.solar_power} W</p>
          <p>
            Cooling: {reading.cooling_status ? "ON" : "OFF"}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;