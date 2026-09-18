function SensorCard({ title, value, unit, icon }) {
  return (
    <div className="sensor-card">
      <div className="sensor-icon">{icon}</div>

      <div>
        <p className="sensor-title">{title}</p>

        <p className="sensor-value">
          {value} <span>{unit}</span>
        </p>
      </div>
    </div>
  );
}

export default SensorCard;