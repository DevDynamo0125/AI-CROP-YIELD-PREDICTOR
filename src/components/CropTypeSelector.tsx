import React from 'react';
import { Leaf } from 'lucide-react';

interface CropType {
  value: string;
  label: string;
  image: string;
}

const crops: CropType[] = [
  {
    value: 'wheat',
    label: 'Wheat',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=200&h=200'
  },
  {
    value: 'rice',
    label: 'Rice',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=200&h=200'
  },
  {
    value: 'corn',
    label: 'Corn',
    image: 'https://plus.unsplash.com/premium_photo-1725619406627-198049ca7162?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=200&h=200'
  },
  {
    value: 'soybean',
    label: 'Soybean',
    image: 'https://images.unsplash.com/photo-1639843606783-b2f9c50a7468?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=200&h=200'
  }
];

interface CropTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CropTypeSelector({ value, onChange }: CropTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
        <Leaf className="w-4 h-4" />
        <span>Crop Type</span>
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {crops.map((crop) => (
          <button
            key={crop.value}
            type="button"
            onClick={() => onChange(crop.value)}
            className={`relative rounded-lg overflow-hidden transition-transform hover:scale-105 ${
              value === crop.value ? 'ring-2 ring-green-500 ring-offset-2' : ''
            }`}
          >
            <img
              src={crop.image}
              alt={crop.label}
              className="w-full h-32 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
              {crop.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}