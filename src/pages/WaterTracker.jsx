import React, { useState } from 'react';

function WaterTracker() {
  const [waterIntake, setWaterIntake] = useState(0);
  const [goal] = useState(8); // Fixed goal of 8 glasses

  const addWater = (amount) => {
    setWaterIntake(prev => prev + amount);
  };

  const resetDaily = () => {
    setWaterIntake(0);
  };

  const progress = (waterIntake / goal) * 100;

  return (
    <div className="water-tracker-container">
      <h1>Water Tracker</h1>
      
      <div className="water-progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {waterIntake} / {goal} glasses
        </p>
      </div>

      <div className="water-actions">
        <button onClick={() => addWater(1)} className="add-water-btn">
          Add 1 Glass
        </button>
        <button onClick={() => addWater(0.5)} className="add-water-btn">
          Add 0.5 Glass
        </button>
        <button onClick={resetDaily} className="reset-btn">
          Reset Daily
        </button>
      </div>
    </div>
  );
}

export default WaterTracker; 