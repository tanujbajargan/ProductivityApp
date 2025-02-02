import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import TodoList from './pages/Todolistmain';
import PomodoroTimer from './pages/PomodoroTimer';
import HabitTracker from './pages/HabitTracker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import './App.css';

const Navigation = () => (
  <nav>
    <div className="container">
      <NavLink to="/" className="logo">
        Life Management App
      </NavLink>
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
            end
          >
            Todo List
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/pomodoro" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Pomodoro
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/habits" 
            className={({ isActive }) => 
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Habits
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

function App() {
  return (
    <Router>
      <Navigation />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/pomodoro" element={<PomodoroTimer />} />
          <Route path="/habits" element={<HabitTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;