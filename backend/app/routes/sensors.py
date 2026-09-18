from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.sensor import SensorReading
from app.schemas.sensor import SensorReadingCreate, SensorReadingResponse


router = APIRouter(prefix="/api", tags=["Sensors"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def check_temperature_alert(temperature: float):
    if temperature > 10:
        return "HIGH_TEMPERATURE"

    return None


def check_humidity_alert(humidity: float):
    if humidity > 80:
        return "HIGH_HUMIDITY"

    return None


def check_battery_alert(battery_level: float):
    if battery_level < 20:
        return "LOW_BATTERY"

    return None


def check_solar_alert(solar_power: float):
    if solar_power < 100:
        return "LOW_SOLAR_POWER"

    return None


@router.post("/sensor-data", response_model=SensorReadingResponse)
def create_sensor_reading(
    reading: SensorReadingCreate,
    db: Session = Depends(get_db)
):

    temperature_alert = check_temperature_alert(reading.temperature)
    humidity_alert = check_humidity_alert(reading.humidity)
    battery_alert = check_battery_alert(reading.battery_level)
    solar_alert = check_solar_alert(reading.solar_power)
    


    new_reading = SensorReading(
        device_id=reading.device_id,
        temperature=reading.temperature,
        humidity=reading.humidity,
        battery_level=reading.battery_level,
        solar_power=reading.solar_power,
        cooling_status=reading.cooling_status
    )

    if temperature_alert:
        print(f"⚠️ ALERT: {temperature_alert}")

    if humidity_alert:
       print(f"⚠️ ALERT: {humidity_alert}")

    if battery_alert:
       print(f"⚠️ ALERT: {battery_alert}")

    if solar_alert:
       print(f"⚠️ ALERT: {solar_alert}")

    db.add(new_reading)
    db.commit()
    db.refresh(new_reading)

    return new_reading


@router.get("/readings", response_model=list[SensorReadingResponse])
def get_sensor_readings(
    db: Session = Depends(get_db)
):
    readings = (
        db.query(SensorReading)
        .order_by(SensorReading.timestamp.desc())
        .all()
    )

    return readings