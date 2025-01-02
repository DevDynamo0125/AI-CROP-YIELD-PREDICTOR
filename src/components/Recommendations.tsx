import React from 'react';
import { AlertCircle } from 'lucide-react';

interface RecommendationsProps {
  recommendations: string[];
  confidence: number;
}

export default function Recommendations({ recommendations, confidence }: RecommendationsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
        <AlertCircle className="w-5 h-5 text-blue-600" />
        <span>AI Recommendations</span>
      </h3>
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Prediction Confidence:</span>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 rounded-full h-2"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className="text-sm font-medium">{confidence}%</span>
        </div>
      </div>
      <ul className="space-y-2">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span className="text-green-600 font-bold">•</span>
            <span className="text-gray-700">{recommendation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}