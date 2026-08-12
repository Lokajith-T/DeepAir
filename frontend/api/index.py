from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import datetime
import random
import os

app = FastAPI(title="DeepAir API", description="AI-Based Satellite NO2 Downscaling System")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ml_model = None

@app.on_event("startup")
async def load_model():
    global ml_model
    ml_model = None
    print("Running in fast mock mode for Vercel Serverless.")

class PredictionRequest(BaseModel):
    region: str
    date: str
    resolution: str
    model: str

class PredictionResponse(BaseModel):
    id: str
    region: str
    date: str
    resolution: str
    model: str
    average_no2: float
    r2: float
    confidence: float
    coverage: float
    status: str

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "version": "1.0", "model_status": "Operational" if ml_model else "Mock Mode"}

@app.get("/api/dashboard")
async def get_dashboard_stats():
    return {
        "average_no2": 42.6,
        "high_pollution_zones": 18,
        "model_r2": 0.91,
        "data_coverage": 94.7,
        "ground_stations": 42,
        "last_updated": datetime.datetime.now().isoformat()
    }

@app.post("/api/predict", response_model=PredictionResponse)
async def generate_prediction(request: PredictionRequest):
    predicted_no2 = random.uniform(35.0, 50.0)

    return PredictionResponse(
        id=f"pred_{random.randint(1000, 9999)}",
        region=request.region,
        date=request.date,
        resolution=request.resolution,
        model="DeepAir ML (Optimized Serverless)",
        average_no2=predicted_no2,
        r2=0.91,
        confidence=94.2,
        coverage=96.2,
        status="completed"
    )

@app.get("/api/validation")
async def get_validation_metrics():
    return {
        "rmse": 4.82,
        "mae": 3.17,
        "r2": 0.91,
        "correlation": 0.95,
        "stations": [
            {"id": "st1", "name": "Erode Central", "lat": 11.341, "lon": 77.717, "ground_no2": 44.2, "predicted_no2": 42.6, "diff": -1.6},
            {"id": "st2", "name": "Coimbatore North", "lat": 11.016, "lon": 76.955, "ground_no2": 38.1, "predicted_no2": 39.5, "diff": 1.4},
            {"id": "st3", "name": "Chennai Industrial", "lat": 13.082, "lon": 80.270, "ground_no2": 65.4, "predicted_no2": 62.1, "diff": -3.3},
        ]
    }

@app.get("/api/map/no2")
async def get_map_no2_data(region: str = "Tamil Nadu", date: str = None):
    # This will return a mock GeoJSON grid for the NO2 heatmap layer
    # For now, returning an empty FeatureCollection, will expand in services
    return {
        "type": "FeatureCollection",
        "features": []
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
