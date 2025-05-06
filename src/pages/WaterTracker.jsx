import React, { useState, useEffect } from 'react';

function WaterTracker() {
  const [waterIntake, setWaterIntake] = useState(0);
  const [goal, setGoal] = useState(8); 
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedIntake = localStorage.getItem('waterIntake');
    const savedGoal = localStorage.getItem('waterGoal');
    const savedHistory = localStorage.getItem('waterHistory');

    if (savedIntake) setWaterIntake(parseInt(savedIntake));
    if (savedGoal) setGoal(parseInt(savedGoal));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const addWater = (amount) => {
    const newIntake = waterIntake + amount;
    setWaterIntake(newIntake);
    localStorage.setItem('waterIntake', newIntake.toString());

    
    const newHistory = [...history, { amount, timestamp: new Date().toISOString() }];
    setHistory(newHistory);
    localStorage.setItem('waterHistory', JSON.stringify(newHistory));
  };

  const resetDaily = () => {
    setWaterIntake(0);
    setHistory([]);
    localStorage.setItem('waterIntake', '0');
    localStorage.setItem('waterHistory', JSON.stringify([]));
  };

  const updateGoal = (newGoal) => {
    setGoal(newGoal);
    localStorage.setItem('waterGoal', newGoal.toString());
  };

  const progress = (waterIntake / goal) * 100;

  return (
    <div className="water-tracker-container">
      <h1>Water Tracker</h1>
      
      <div className="water-goal-section">
        <h2>Daily Goal</h2>
        <div className="goal-selector">
          <button onClick={() => updateGoal(goal - 1)} disabled={goal <= 1}>-</button>
          <span>{goal} glasses</span>
          <button onClick={() => updateGoal(goal + 1)}>+</button>
        </div>
      </div>

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

      <div className="water-history">
        <h2>Today's History</h2>
        {history.length === 0 ? (
          <p>No water intake recorded today</p>
        ) : (
          <ul className="history-list">
            {history.map((entry, index) => (
              <li key={index}>
                {entry.amount} glass(es) at {new Date(entry.timestamp).toLocaleTimeString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default WaterTracker; 