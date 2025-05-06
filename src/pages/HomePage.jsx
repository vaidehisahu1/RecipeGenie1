import React from 'react';
import { Link } from 'react-router-dom';

function FeatureCard({ title, description, icon, color, link }) {
  return (
    <div className="feature-card" style={{ borderColor: color }}>
      <div className="card-icon" style={{ backgroundColor: color }}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link} className="card-button" style={{ backgroundColor: color }}>Explore</Link>
    </div>
  );
}

function HomePage() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>RecipeGenie</h1>
        <p className="tagline">Your AI-Powered Culinary Companion</p>
        <p className="description">
          Discover exciting recipes, master new cooking techniques, and elevate your culinary skills
          with our intelligent recipe and meal planning system.
        </p>
        <Link to="/recipes" className="get-started-button">Start Cooking</Link>
      </div>

      <div className="features-container">
        <FeatureCard 
          title="Smart Recipe Finder" 
          description="Input your available ingredients and get creative recipe suggestions that match your cooking style and preferences."
          icon="🔍"
          color="#ff9f43"
          link="/recipes"
        />
        <FeatureCard 
          title="Water Intake Tracker" 
          description="Stay hydrated while cooking with our smart water tracking system and timely reminders."
          icon="💧"
          color="#0abde3"
          link="/water"
        />
        <FeatureCard 
          title="Smart Grocery List" 
          description="Generate organized shopping lists based on your meal plans and keep track of your kitchen essentials."
          icon="🛒"
          color="#10ac84"
          link="/grocery"
        />
        <FeatureCard 
          title="Progress Tracker" 
          description="Track your culinary journey with daily and weekly summaries of your cooking adventures and achievements."
          icon="📊"
          color="#ee5253"
          link="/progress"
        />
      </div>

      <div className="get-started-section">
        <h2>Your Culinary Journey Begins Here</h2>
        <p>Join thousands of home chefs who are exploring new flavors and mastering the art of cooking with RecipeGenie.</p>
        <Link to="/recipes" className="get-started-button">Start Your Culinary Adventure</Link>
      </div>
    </div>
  );
}

export default HomePage; 