import random
import time

import requests


API_URL = "http://127.0.0.1:8000/api/sensor-data"


def generate_sensor_data():
    return {
        "device_id": "COLDROOM-001",
        "temperature": round(random.uniform(6.0, 10.0), 2),
        "humidity": round(random.uniform(65.0, 80.0), 2),
        "battery_level": round(random.uniform(70.0, 100.0), 2),
        "solar_power": round(random.uniform(300.0, 500.0), 2),
        "cooling_status": random.choice([True, False])
    }


while True:
    sensor_data = generate_sensor_data()

    try:
        response = requests.post(
            API_URL,
            json=sensor_data,
            timeout=5
        )

        if response.status_code == 200:
            print("Sensor data sent successfully:")
            print(response.json())
        else:
            print(f"Failed to send data: {response.status_code}")

    except requests.exceptions.RequestException as error:
        print(f"Connection error: {error}")

    time.sleep(5)