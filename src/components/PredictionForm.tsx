import React, { useState } from 'react';
import { CropData } from '../types';
import { Thermometer, Beaker, Droplet } from 'lucide-react';
import CropTypeSelector from './CropTypeSelector';

const initialData: CropData = {
  cropType: 'wheat',
  soilPH: 6.5,
  temperature: 25,
  rainfall: 1000,
  humidity: 60,
  nitrogen: 80,
  phosphorus: 45,
  potassium: 40,
};

interface PredictionFormProps {
  onSubmit: (data: CropData) => void;
}

export default function PredictionForm({ onSubmit }: PredictionFormProps) {
  const [formData, setFormData] = useState<CropData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleCropTypeChange = (cropType: string) => {
    setFormData(prev => ({
      ...prev,
      cropType
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <CropTypeSelector value={formData.cropType} onChange={handleCropTypeChange} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Beaker className="w-4 h-4" />
            <span>Soil pH</span>
          </label>
          <input
            type="number"
            name="soilPH"
            value={formData.soilPH}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="14"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Thermometer className="w-4 h-4" />
            <span>Temperature (°C)</span>
          </label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Droplet className="w-4 h-4" />
            <span>Rainfall (mm)</span>
          </label>
          <input
            type="number"
            name="rainfall"
            value={formData.rainfall}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Generate Prediction
      </button>
    </form>
  );
}