from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware  # ✅ Added for CORS
from datetime import datetime
import joblib
import numpy as np

app = FastAPI()

# Add CORS middleware so frontend can access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in production, replace "*" with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load("model/aqi_model.pkl")


def aqi_category(pm25):
    if pm25 <= 50:
        return "Good", "Best time to travel"
    elif pm25 <= 100:
        return "Moderate", "Sensitive people should limit exposure"
    elif pm25 <= 200:
        return "Poor", "Avoid outdoor travel if possible"
    elif pm25 <= 300:
        return "Very Poor", "Not safe for travel"
    else:
        return "Severe", "Travel not recommended"


@app.get("/predict_aqi")
def predict_aqi(
    destination: str = Query(..., example="Delhi"),
    time: str = Query(..., example="2025-03-01 09:00")
):
    dt = datetime.strptime(time, "%Y-%m-%d %H:%M")
    timestamp = dt.timestamp()

    X = np.array([[timestamp]])
    predicted_pm25 = model.predict(X)[0]

    category, advice = aqi_category(predicted_pm25)

    return {
        "destination": destination,
        "time": time,
        "predicted_pm25": round(float(predicted_pm25), 2),
        "aqi_category": category,
        "travel_advice": advice
    }