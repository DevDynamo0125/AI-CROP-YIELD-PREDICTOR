import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import PredictionForm from './components/PredictionForm';
import PredictionChart from './components/PredictionChart';
import YieldComparison from './components/YieldComparison';
import Recommendations from './components/Recommendations';
import { generateMockPrediction } from './utils/mockPrediction';
import { CropData, PredictionResult } from './types';

function App() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handleSubmit = (data: CropData) => {
    const result = generateMockPrediction(data);
    setPrediction(result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Sprout className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              AI Crop Yield Prediction
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Enter Crop Parameters
            </h2>
            <PredictionForm onSubmit={handleSubmit} />
          </section>

          {prediction && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Yield Prediction Over Time
                  </h2>
                  <PredictionChart predictedYield={prediction.yield} />
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Yield Comparison
                  </h2>
                  <YieldComparison predictedYield={prediction.yield} />
                </section>
              </div>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Recommendations
                </h2>
                <Recommendations
                  recommendations={prediction.recommendations}
                  confidence={prediction.confidence}
                />
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;