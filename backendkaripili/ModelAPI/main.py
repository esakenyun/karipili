from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import requests
from io import StringIO
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables from .env
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

class RecommendationRequest(BaseModel):
    location: str
    salary_min: float
    salary_max: float
    top_n: int = 10  # Default value is 10 if not provided

@app.post("/recommend")
def recommend(request: RecommendationRequest):
    csv_url = os.getenv("CSV_URL")

    if not csv_url:
        raise HTTPException(status_code=500, detail="CSV_URL environment variable is not set")

    try:
        response = requests.get(csv_url)
        response.raise_for_status()  # Check if the request was successful
        csv_data = response.content.decode('utf-8')
        data = pd.read_csv(StringIO(csv_data))

        # Check for NaN values and fill with a dummy value
        # data[['salary_min', 'salary_max']] = data[['salary_min', 'salary_max']].fillna(0)  # Fill NaNs in salary
        # data['rating'] = data['rating'].astype(float)  # Fill NaNs in rating
        data['rating'] = data['rating'].fillna(0.0)
        data['skills'] = data['skills'].fillna("IT")
        # Preprocess location
        location_encoded = pd.get_dummies(data['location'], prefix='location')

        # Scale and include only necessary features
        features = ['salary_min', 'salary_max', 'rating']
        scaler = StandardScaler()
        scaled_features = scaler.fit_transform(data[features])

        # Combine features
        vectorizer = TfidfVectorizer(stop_words='english')
        tfidf_matrix = vectorizer.fit_transform(data['description'].fillna(''))  # Fill NaNs in description
        combined_features = pd.concat([location_encoded.reset_index(drop=True), pd.DataFrame(tfidf_matrix.toarray()), pd.DataFrame(scaled_features, columns=features).reset_index(drop=True)], axis=1)

        # Encode input location
        input_location_encoded = pd.get_dummies(pd.Series([request.location]), prefix='location')
        missing_cols = set(location_encoded.columns) - set(input_location_encoded.columns)
        for c in missing_cols:
            input_location_encoded[c] = 0
        input_location_encoded = input_location_encoded[location_encoded.columns]

        # Scale input salary
        input_salary_min = request.salary_min if not pd.isna(request.salary_min) else 0
        input_salary_max = request.salary_max if not pd.isna(request.salary_max) else 0
        input_salary_scaled = scaler.transform([[input_salary_min, input_salary_max, 0]])  # Add dummy 'rating' value

        # Prepare input data for similarity computation
        input_data = pd.DataFrame(columns=combined_features.columns, data=[[0] * len(combined_features.columns)])
        input_data['salary_min'] = input_salary_scaled[0][0]
        input_data['salary_max'] = input_salary_scaled[0][1]
        #input_data['rating'] = input_salary_scaled[0][2]  # Dummy 'rating' value

        # Compute similarity
        similarities = cosine_similarity(input_data, combined_features)
        top_indices = similarities.argsort()[0][-request.top_n:]

        result = data.iloc[top_indices].fillna('').to_dict(orient="records")  # Fill NaNs in the result
        return JSONResponse(content=result)

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail="Error fetching the CSV file")