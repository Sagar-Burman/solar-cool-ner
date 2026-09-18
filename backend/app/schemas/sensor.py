from datetime import datetime

from pydantic import BaseModel


class SensorReadingCreate(BaseModel):
    device_id: str
    temperature: float
    humidity: float
    battery_level: float
    solar_power: float
    cooling_status: bool = False


class SensorReadingResponse(SensorReadingCreate):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True