import React, { useState } from 'react';


function RecipeCard({ recipe }) {
  const addToGroceryList = () => {
    alert('This feature will be available soon!');
  };

  const addToProgressTracker = () => {
    alert('This feature will be available soon!');
  };

  return (
    <div className="recipe-card">
   
      <div className="recipe-content">
        <h3>{recipe.title}</h3>
        <div className="recipe-meta">
          <span>🕒 {recipe.readyInMinutes} mins</span>
          <span>👥 {recipe.servings} servings</span>
          <span>🔥 {recipe.difficulty}</span>
        </div>
        <div className="nutrition-info">
          <span>👨‍🍳 Chef Level: {recipe.chefLevel}</span>
          <span>🍳 Cooking Method: {recipe.cookingMethod}</span>
          <span>🌡️ Temperature: {recipe.temperature}</span>
        </div>
        <p className="recipe-summary">{recipe.description}</p>
        <div className="recipe-tags">
          {recipe.tags.map((tag, index) => (
            <span key={index} className="recipe-tag">{tag}</span>
          ))}
        </div>
        <div className="recipe-actions">
          <button className="view-recipe-btn">
            View Recipe
          </button>
          <button onClick={addToGroceryList} className="add-grocery-btn">
            Add to Grocery List
          </button>
          <button onClick={addToProgressTracker} className="add-progress-btn">
            Save Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

function RecipeFinder() {
  const [ingredients, setIngredients] = useState('');
  const [cookingPreferences, setCookingPreferences] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample recipes for demonstration
  const sampleRecipes = [
    {
      id: 1,
      title: "Cheese Pasta",
     
      readyInMinutes: 120,
      servings: 4,
      difficulty: "Medium",
      chefLevel: "Intermediate",
      cookingMethod: "Braising",
      temperature: "350°F",
      description: "A traditional French dish featuring chicken braised in wine, lardons, mushrooms, and pearl onions. Perfect for mastering classic French cooking techniques.",
      tags: ["French", "Classic", "Wine-based"]
    },
    {
      id: 2,
      title: "Paneer Tikka",
     
      readyInMinutes: 90,
      servings: 2,
      difficulty: "Advanced",
      chefLevel: "Expert",
      cookingMethod: "Fresh Pasta",
      temperature: "Boiling",
      description: "Master the art of fresh pasta making with this spring-inspired dish featuring homemade fettuccine and seasonal vegetables.",
      tags: ["Italian", "Fresh Pasta", "Seasonal"]
    },
    {
      id: 3,
      title: "Tacos",
     
      readyInMinutes: 45,
      servings: 2,
      difficulty: "Medium",
      chefLevel: "Intermediate",
      cookingMethod: "Pan-Seared",
      temperature: "Medium-High",
      description: "A delicate sea bass fillet with crispy skin, served with a citrus butter sauce and fresh herbs. Perfect for mastering fish cooking techniques.",
      tags: ["Seafood", "Quick", "Elegant"]
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const cookingOptions = [
    "Quick & Easy",
    "Classic French",
    "Italian",
    "Asian Fusion",
    "Mediterranean",
    "Baking"
  ];

  const toggleCookingPreference = (preference) => {
    if (cookingPreferences.includes(preference)) {
      setCookingPreferences(cookingPreferences.filter(p => p !== preference));
    } else {
      setCookingPreferences([...cookingPreferences, preference]);
    }
  };

  return (
    <div className="recipe-finder-container">
      <div className="search-section">
        <h1>Discover Your Next Culinary Creation</h1>
        <p className="search-description">
          Enter the ingredients you have, and our AI will suggest inspiring recipes
          that match your cooking style and culinary preferences.
        </p>
        <form className="search-container" onSubmit={handleSearch}>
          <div className="search-row">
            <div className="ingredients-input">
              <input 
                type="text" 
                placeholder="Enter ingredients (e.g., chicken, herbs, vegetables)" 
                className="search-input"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
            <button type="submit" className="search-button">
              {loading ? 'Finding...' : 'Find'}
            </button>
          </div>
          <div className="cooking-preferences">
            <h3>Cooking Style</h3>
            <div className="preference-tags">
              {cookingOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`preference-tag ${cookingPreferences.includes(option) ? 'active' : ''}`}
                  onClick={() => toggleCookingPreference(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Discovering culinary inspiration...</p>
        </div>
      )}

      {!loading && (
        <div className="recipes-grid">
          {sampleRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      {!loading && (
        <div className="search-tips">
          <h2>Tips for Better Results</h2>
          <ul>
            <li>List main ingredients you have in your pantry</li>
            <li>Specify your preferred cooking style or cuisine</li>
         
            <li>Mention your desired cooking time or complexity level</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecipeFinder; 