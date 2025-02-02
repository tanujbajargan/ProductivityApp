import React, { useState, useEffect } from 'react';

const WeeklyProgress = ({ progress, onToggle }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 
  return (
    <div className="week-progress">
      {days.map((day, index) => (
        <div key={day} className="day-container">
          <div className="day-label">{day}</div>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={progress[index]}
              onChange={() => onToggle(index)}
              className="habit-checkbox"
            />
          </label>
        </div>
      ))}
    </div>
  );
};

const HabitTracker = () => {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newHabit.trim() === '') {
      alert('Habit name cannot be empty!');
      return;
    }
    setHabits([...habits, {
      id: Date.now(),
      name: newHabit,
      progress: Array(7).fill(false)
    }]);
    setNewHabit('');
  };

  const toggleProgress = (habitIndex, dayIndex) => {
    setHabits(habits.map((habit, index) => {
      if (index === habitIndex) {
        const newProgress = [...habit.progress];
        newProgress[dayIndex] = !newProgress[dayIndex];
        return { ...habit, progress: newProgress };
      }
      return habit;
    }));
  };

  const deleteHabit = (habitId) => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      setHabits(habits.filter(habit => habit.id !== habitId));
    }
  };

  const currentDay = new Date().getDay();

  useEffect(() => {
    const lastResetDay = localStorage.getItem('lastResetDay');
    const today = new Date().toLocaleDateString();

    if (lastResetDay !== today && currentDay === 0) {
      setHabits(habits.map(habit => ({
        ...habit,
        progress: Array(7).fill(false)
      })));
      localStorage.setItem('lastResetDay', today);
    }
  }, [currentDay]);

  return (
    <div className="habit-section">
      <h2 className="section-title">Weekly Habit Tracker</h2>
      
      <form onSubmit={handleSubmit} className="habit-form">
        <input
          type="text"
          className="habit-input"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Enter a new habit..."
        />
        <button type="submit" className="add-btn">
          Add Habit
        </button>
      </form>

      <div className="habits-container">
        {habits.length === 0 ? (
          <p className="no-habits">No habits added yet. Add your first habit above!</p>
        ) : (
          habits.map((habit, habitIndex) => (
            <div key={habit.id} className="habit-card">
              <div className="habit-header">
                <h3 className="habit-name">{habit.name}</h3>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="delete-btn"
                  aria-label="Delete habit"
                >
                  ×
                </button>
              </div>
              <WeeklyProgress
                progress={habit.progress}
                onToggle={(dayIndex) => toggleProgress(habitIndex, dayIndex)}
              />
              <div className="progress-status">
                Completed: {habit.progress.filter(Boolean).length}/7 days
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HabitTracker;