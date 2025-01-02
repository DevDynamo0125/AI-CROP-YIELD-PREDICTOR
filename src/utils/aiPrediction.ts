import { CropData } from '../types';

// Simulated AI model coefficients
const MODEL_COEFFICIENTS = {
  wheat: { base: 3.5, phWeight: 0.3, tempWeight: 0.4, rainWeight: 0.3 },
  rice: { base: 4.2, phWeight: 0.25, tempWeight: 0.35, rainWeight: 0.4 },
  corn: { base: 5.8, phWeight: 0.3, tempWeight: 0.35, rainWeight: 0.35 },
  soybean: { base: 2.9, phWeight: 0.35, tempWeight: 0.3, rainWeight: 0.35 },
};

export function calculateOptimalSowingDate(temperature: number, rainfall: number): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Simple logic to determine optimal sowing month based on temperature and rainfall
  const optimalTemp = temperature >= 20 && temperature <= 30;
  const optimalRain = rainfall >= 800 && rainfall <= 1200;
  
  const currentMonth = new Date().getMonth();
  const optimalMonth = optimalTemp && optimalRain ? 
    currentMonth : 
    (currentMonth + 2) % 12; // Suggest 2 months later if conditions aren't optimal
    
  return months[optimalMonth];
}

export function generateIrrigationSchedule(rainfall: number): string {
  if (rainfall < 600) {
    return 'Daily irrigation recommended';
  } else if (rainfall < 800) {
    return 'Irrigation every 2-3 days';
  } else if (rainfall < 1000) {
    return 'Weekly irrigation sufficient';
  } else {
    return 'Monitor soil moisture, irrigate as needed';
  }
}