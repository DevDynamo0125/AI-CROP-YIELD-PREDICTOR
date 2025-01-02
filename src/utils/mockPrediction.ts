import { CropData, PredictionResult } from '../types';
import { calculateOptimalSowingDate, generateIrrigationSchedule } from './aiPrediction';

export function generateMockPrediction(data: CropData): PredictionResult {
  // Mock AI prediction based on input parameters
  const baseYield = {
    wheat: 3.5,
    rice: 4.2,
    corn: 5.8,
    soybean: 2.9,
  }[data.cropType] || 3.0;

  // Apply simple multipliers based on conditions
  const phFactor = Math.max(0.5, 1 - Math.abs(data.soilPH - 6.5) / 6.5);
  const tempFactor = Math.max(0.5, 1 - Math.abs(data.temperature - 25) / 25);
  const rainFactor = Math.max(0.5, Math.min(data.rainfall / 1000, 1.5));

  const predictedYield = baseYield * phFactor * tempFactor * rainFactor;
  const confidence = Math.round((phFactor + tempFactor + rainFactor) / 3 * 100);

  const optimalSowingDate = calculateOptimalSowingDate(data.temperature, data.rainfall);
  const irrigationSchedule = generateIrrigationSchedule(data.rainfall);

  const recommendations = [
    `Optimal soil pH for ${data.cropType} is between 6.0-7.0. ${
      data.soilPH < 6.0 ? 'Consider adding lime to increase pH.' :
      data.soilPH > 7.0 ? 'Consider adding sulfur to decrease pH.' :
      'Current pH levels are optimal.'
    }`,
    `Recommended sowing period: ${optimalSowingDate}`,
    `Irrigation recommendation: ${irrigationSchedule}`,
    `${data.temperature < 20 ? 'Consider delayed planting to avoid cold stress.' :
      data.temperature > 30 ? 'Implement shade structures or irrigation to reduce heat stress.' :
      'Temperature conditions are favorable for growth.'
    }`,
  ];

  return {
    yield: Number(predictedYield.toFixed(2)),
    recommendations,
    confidence,
  };
}