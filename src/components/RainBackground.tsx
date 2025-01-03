import React from 'react';
import './RainBackground.css';

export default function RainBackground() {
  return (
    <div className="rain-container">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="rain-drop" style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${0.5 + Math.random() * 0.5}s`
        }} />
      ))}
    </div>
  );
}