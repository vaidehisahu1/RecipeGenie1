import React, { useState, useEffect } from 'react';
import {
  DAILY_CALORIE_GOAL,
  DAILY_WATER_GOAL,
  DAILY_PROTEIN_GOAL,
  DAILY_CARBS_GOAL,
  DAILY_FAT_GOAL
} from '../config';

function NutritionProgress({ current, goal, label, color }) {
  const percentage = Math.min((current / goal) * 100, 100);
  
  return (
    <div className="nutrition-progress">
      <div className="nutrition-label">
        <span>{label}</span>
        <span>{Math.round(current)} / {goal}</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
}

function ProgressTracker() {
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState({
    calories: DAILY_CALORIE_GOAL,
    water: DAILY_WATER_GOAL,
    protein: DAILY_PROTEIN_GOAL,
    carbs: DAILY_CARBS_GOAL,
    fat: DAILY_FAT_GOAL
  });
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    meals: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    water: 0,
    exercise: '',
    notes: ''
  });

  useEffect(() => {
    const savedEntries = localStorage.getItem('progressEntries');
    const savedGoals = localStorage.getItem('nutritionGoals');
    
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const updateGoals = (newGoals) => {
    setGoals(newGoals);
    localStorage.setItem('nutritionGoals', JSON.stringify(newGoals));
  };

  const addEntry = (e) => {
    e.preventDefault();
    const entry = {
      ...newEntry,
      id: Date.now()
    };

    const newEntries = [...entries, entry].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );

    setEntries(newEntries);
    localStorage.setItem('progressEntries', JSON.stringify(newEntries));
    
    // Reset form
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      meals: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      water: 0,
      exercise: '',
      notes: ''
    });
  };

  const deleteEntry = (id) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    setEntries(newEntries);
    localStorage.setItem('progressEntries', JSON.stringify(newEntries));
  };

  // Calculate today's totals
  const today = new Date().toISOString().split('T')[0];
  const todayEntries = entries.filter(entry => entry.date === today);
  const todayTotals = todayEntries.reduce((acc, entry) => ({
    calories: acc.calories + Number(entry.calories),
    protein: acc.protein + Number(entry.protein),
    carbs: acc.carbs + Number(entry.carbs),
    fat: acc.fat + Number(entry.fat),
    water: acc.water + Number(entry.water)
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0 });

  return (
    <div className="progress-tracker-container">
      <h1>Daily Progress Tracker</h1>

      <div className="nutrition-goals">
        <h2>Today's Progress</h2>
        <div className="nutrition-grid">
          <NutritionProgress
            current={todayTotals.calories}
            goal={goals.calories}
            label="Calories"
            color="#ff9f43"
          />
          <NutritionProgress
            current={todayTotals.protein}
            goal={goals.protein}
            label="Protein (g)"
            color="#ee5253"
          />
          <NutritionProgress
            current={todayTotals.carbs}
            goal={goals.carbs}
            label="Carbs (g)"
            color="#10ac84"
          />
          <NutritionProgress
            current={todayTotals.fat}
            goal={goals.fat}
            label="Fat (g)"
            color="#0abde3"
          />
          <NutritionProgress
            current={todayTotals.water}
            goal={goals.water}
            label="Water (glasses)"
            color="#a55eea"
          />
        </div>
      </div>

      <form onSubmit={addEntry} className="entry-form">
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={newEntry.date}
            onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Meals:</label>
          <textarea
            value={newEntry.meals}
            onChange={(e) => setNewEntry({...newEntry, meals: e.target.value})}
            placeholder="What did you eat today?"
            required
          />
        </div>

        <div className="nutrition-inputs">
          <div className="form-group">
            <label>Calories:</label>
            <input
              type="number"
              value={newEntry.calories}
              onChange={(e) => setNewEntry({...newEntry, calories: e.target.value})}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Protein (g):</label>
            <input
              type="number"
              value={newEntry.protein}
              onChange={(e) => setNewEntry({...newEntry, protein: e.target.value})}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Carbs (g):</label>
            <input
              type="number"
              value={newEntry.carbs}
              onChange={(e) => setNewEntry({...newEntry, carbs: e.target.value})}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Fat (g):</label>
            <input
              type="number"
              value={newEntry.fat}
              onChange={(e) => setNewEntry({...newEntry, fat: e.target.value})}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Water (glasses):</label>
            <input
              type="number"
              value={newEntry.water}
              onChange={(e) => setNewEntry({...newEntry, water: e.target.value})}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Exercise:</label>
          <textarea
            value={newEntry.exercise}
            onChange={(e) => setNewEntry({...newEntry, exercise: e.target.value})}
            placeholder="What exercise did you do today?"
          />
        </div>

        <div className="form-group">
          <label>Notes:</label>
          <textarea
            value={newEntry.notes}
            onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
            placeholder="Any additional notes..."
          />
        </div>

        <button type="submit" className="submit-button">Add Entry</button>
      </form>

      <div className="entries-list">
        <h2>Your Progress History</h2>
        {entries.length === 0 ? (
          <p className="empty-message">No entries yet. Start tracking your progress!</p>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="entry-card">
              <div className="entry-header">
                <h3>{new Date(entry.date).toLocaleDateString()}</h3>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="delete-button"
                >
                  ×
                </button>
              </div>
              
              <div className="entry-content">
                <div className="entry-section">
                  <h4>Meals</h4>
                  <p>{entry.meals}</p>
                </div>
                
                <div className="entry-section nutrition-summary">
                  <h4>Nutrition</h4>
                  <div className="nutrition-grid">
                    <div>Calories: {Math.round(entry.calories)}</div>
                    <div>Protein: {Math.round(entry.protein)}g</div>
                    <div>Carbs: {Math.round(entry.carbs)}g</div>
                    <div>Fat: {Math.round(entry.fat)}g</div>
                    <div>Water: {entry.water} glasses</div>
                  </div>
                </div>
                
                {entry.exercise && (
                  <div className="entry-section">
                    <h4>Exercise</h4>
                    <p>{entry.exercise}</p>
                  </div>
                )}
                
                {entry.notes && (
                  <div className="entry-section">
                    <h4>Notes</h4>
                    <p>{entry.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProgressTracker; 