import React, { useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface YieldComparisonProps {
  predictedYield: number;
}

export default function YieldComparison({ predictedYield }: YieldComparisonProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Yield Comparison Across Conditions',
      },
    },
  };

  const data = {
    labels: ['Optimal', 'Current', 'Minimum', 'Maximum'],
    datasets: [
      {
        label: 'Yield (tons/hectare)',
        data: [
          predictedYield * 1.2,
          predictedYield,
          predictedYield * 0.7,
          predictedYield * 1.5
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  const downloadAsPNG = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement('a');
      link.download = 'yield-comparison.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const downloadAsPDF = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 190, 100);
      pdf.save('yield-comparison.pdf');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div ref={chartRef}>
        <Bar options={options} data={data} />
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={downloadAsPNG}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          <span>Download PNG</span>
        </button>
        <button
          onClick={downloadAsPDF}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
}