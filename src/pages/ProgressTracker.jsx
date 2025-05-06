import React, { useState } from 'react';

function ProgressTracker() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    meals: '',
    waterIntake: '',
    exercise: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      ...formData
    };
    setEntries([newEntry, ...entries]);
    setFormData({
      date: '',
      meals: '',
      waterIntake: '',
      exercise: '',
      notes: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="progress-tracker-container">
      <h1>Progress Tracker</h1>
      
      <form className="entry-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="meals">Meals</label>
          <textarea
            id="meals"
            name="meals"
            value={formData.meals}
            onChange={handleChange}
            placeholder="List your meals for the day..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="waterIntake">Water Intake (ml)</label>
          <input
            type="number"
            id="waterIntake"
            name="waterIntake"
            value={formData.waterIntake}
            onChange={handleChange}
            placeholder="Enter amount in ml"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="exercise">Exercise</label>
          <textarea
            id="exercise"
            name="exercise"
            value={formData.exercise}
            onChange={handleChange}
            placeholder="Describe your exercise routine..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Additional notes or observations..."
          />
        </div>

        <button type="submit" className="submit-button">Add Entry</button>
      </form>

      <div className="entries-list">
        {entries.length === 0 ? (
          <div className="empty-message">
            <p>No entries yet. Start tracking your progress!</p>
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="entry-card">
              <div className="entry-header">
                <h3>{new Date(entry.date).toLocaleDateString()}</h3>
              </div>
              
              <div className="entry-section">
                <h4>Meals</h4>
                <p>{entry.meals}</p>
              </div>

              <div className="entry-section">
                <h4>Water Intake</h4>
                <p>{entry.waterIntake} ml</p>
              </div>

              <div className="entry-section">
                <h4>Exercise</h4>
                <p>{entry.exercise}</p>
              </div>

              {entry.notes && (
                <div className="entry-section">
                  <h4>Notes</h4>
                  <p>{entry.notes}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProgressTracker; 