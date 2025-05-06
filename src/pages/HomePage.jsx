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
        <h1>Your Personal Health & Nutrition Assistant</h1>
        <p className="tagline">Discover, Track, and Achieve Your Health Goals</p>
        <p className="description">
          A comprehensive platform that helps you find delicious recipes, track your nutrition,
          manage your grocery list, and monitor your progress towards a healthier lifestyle.
        </p>
        <Link to="/recipes" className="get-started-button">Get Started</Link>
      </div>

      <div className="features-container">
        <FeatureCard 
          title="Smart Recipe Finder" 
          description="Find recipes based on ingredients, nutrition goals, and dietary preferences."
          icon="🔍"
          color="#ff9f43"
          link="/recipes"
        />
        <FeatureCard 
          title="Water Tracker" 
          description="Track your daily water intake and stay hydrated throughout the day."
          icon="💧"
          color="#0abde3"
          link="/water"
        />
        <FeatureCard 
          title="Grocery List" 
          description="Create and manage your shopping list with smart organization."
          icon="🛒"
          color="#10ac84"
          link="/grocery"
        />
        <FeatureCard 
          title="Progress Tracker" 
          description="Monitor your nutrition goals and track your daily meals."
          icon="📊"
          color="#ee5253"
          link="/progress"
        />
      </div>

      <div className="get-started-section">
        <h2>Start Your Healthy Journey Today</h2>
        <p>Join thousands of users who are discovering delicious recipes and tracking their nutrition goals.</p>
        <Link to="/recipes" className="get-started-button">Find Recipes</Link>
      </div>
    </div>
  );
}

export default HomePage; 