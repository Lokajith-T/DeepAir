import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import joblib
import os

def generate_synthetic_data(n_samples=5000):
    np.random.seed(42)
    
    # Feature 1: Raw Satellite NO2 observation (base value)
    sat_no2 = np.random.normal(loc=40.0, scale=15.0, size=n_samples)
    sat_no2 = np.clip(sat_no2, 10.0, 100.0)
    
    # Feature 2: Temperature (higher temp can increase NO2 slightly due to sunlight/ozone reactions or AC usage)
    temperature = np.random.normal(loc=30.0, scale=5.0, size=n_samples)
    
    # Feature 3: Humidity (higher humidity can lead to washout or different chemical pathways)
    humidity = np.random.normal(loc=60.0, scale=15.0, size=n_samples)
    
    # Feature 4: Wind Speed (higher wind disperses NO2, lowering local concentration)
    wind_speed = np.random.normal(loc=12.0, scale=6.0, size=n_samples)
    wind_speed = np.clip(wind_speed, 0.0, 50.0)
    
    # Feature 5: Elevation (higher elevation usually means less urban density / lower NO2)
    elevation = np.random.exponential(scale=150.0, size=n_samples)
    
    # Feature 6: Land Use Index (0 = rural, 1 = dense urban)
    land_use = np.random.uniform(0.0, 1.0, size=n_samples)
    
    # Target: Ground NO2 (The "Real" value we want to predict)
    # The relationship:
    # Ground NO2 is highly correlated with Satellite NO2, but modulated by local features.
    noise = np.random.normal(0, 3.0, size=n_samples)
    
    ground_no2 = (
        sat_no2 * 1.05 + 
        (temperature - 25) * 0.2 - 
        (wind_speed * 0.4) + 
        (land_use * 8.0) - 
        (elevation * 0.01) + 
        noise
    )
    ground_no2 = np.clip(ground_no2, 5.0, 150.0)
    
    df = pd.DataFrame({
        'sat_no2': sat_no2,
        'temperature': temperature,
        'humidity': humidity,
        'wind_speed': wind_speed,
        'elevation': elevation,
        'land_use': land_use,
        'ground_no2': ground_no2
    })
    return df

def train():
    print("Generating synthetic historical data...")
    df = generate_synthetic_data(10000)
    
    X = df[['sat_no2', 'temperature', 'humidity', 'wind_speed', 'elevation', 'land_use']]
    y = df['ground_no2']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Regressor...")
    model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42, n_jobs=-1)
    model.fit(X_train, y_train)
    
    print("Evaluating model...")
    y_pred = model.predict(X_test)
    
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    print(f"Validation Metrics:")
    print(f"RMSE: {rmse:.2f}")
    print(f"MAE:  {mae:.2f}")
    print(f"R2:   {r2:.3f}")
    
    # Save the model
    os.makedirs(os.path.dirname(__file__), exist_ok=True)
    model_path = os.path.join(os.path.dirname(__file__), 'deepair_rf_model.pkl')
    joblib.dump(model, model_path)
    print(f"Real ML Model saved successfully to {model_path}")

if __name__ == "__main__":
    train()
