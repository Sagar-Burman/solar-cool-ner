from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.models.sensor import SensorReading
from app.routes.sensors import router as sensor_router


Base.metadata.create_all(bind=engine)


app = FastAPI(title="SOLARCOOL NER API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sensor_router)


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "message": "SOLARCOOL NER backend is running"
    }