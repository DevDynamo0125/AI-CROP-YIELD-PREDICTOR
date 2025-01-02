export interface CropData {
  cropType: string;
  soilPH: number;
  temperature: number;
  rainfall: number;
  humidity: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface PredictionResult {
  yield: number;
  recommendations: string[];
  confidence: number;
}