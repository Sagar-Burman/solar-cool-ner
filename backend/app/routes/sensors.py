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


@router.post("/sensor-data", response_model=SensorReadingResponse)
def create_sensor_reading(
    reading: SensorReadingCreate,
    db: Session = Depends(get_db)
):
    new_reading = SensorReading(
        device_id=reading.device_id,
        temperature=reading.temperature,
        humidity=reading.humidity,
        battery_level=reading.battery_level,
        solar_power=reading.solar_power,
        cooling_status=reading.cooling_status
    )

    db.add(new_reading)
    db.commit()
    db.refresh(new_reading)

    return new_reading



@router.get("/readings", response_model=list[SensorReadingResponse])
def get_sensor_readings(db: Session = Depends(get_db)):
    readings = (
        db.query(SensorReading)
        .order_by(SensorReading.timestamp.desc())
        .all()
    )

    return readings