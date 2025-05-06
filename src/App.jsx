import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import RecipeFinder from './pages/RecipeFinder';
import WaterTracker from './pages/WaterTracker';
import GroceryList from './pages/GroceryList';
import ProgressTracker from './pages/ProgressTracker';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Health & Nutrition</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
        <Link to="/recipes" className={isActive('/recipes') ? 'active' : ''}>Recipes</Link>
        <Link to="/water" className={isActive('/water') ? 'active' : ''}>Water Tracker</Link>
        <Link to="/grocery" className={isActive('/grocery') ? 'active' : ''}>Grocery List</Link>
        <Link to="/progress" className={isActive('/progress') ? 'active' : ''}>Progress</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipeFinder />} />
            <Route path="/water" element={<WaterTracker />} />
            <Route path="/grocery" element={<GroceryList />} />
            <Route path="/progress" element={<ProgressTracker />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Health & Nutrition App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;


