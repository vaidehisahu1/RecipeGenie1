import React, { useState } from 'react';
import {
  SPOONACULAR_API_KEY,
  SPOONACULAR_BASE_URL,
  EDAMAM_APP_ID,
  EDAMAM_APP_KEY,
  EDAMAM_BASE_URL
} from '../config';

function RecipeCard({ recipe, source }) {
  const addToGroceryList = () => {
    const existingItems = JSON.parse(localStorage.getItem('groceryItems') || '[]');
    const newItems = recipe.ingredients.map(ingredient => ({
      id: Date.now() + Math.random(),
      name: ingredient,
      category: 'Recipe Ingredients',
      completed: false
    }));
    
    localStorage.setItem('groceryItems', JSON.stringify([...existingItems, ...newItems]));
    alert('Ingredients added to grocery list!');
  };

  const addToProgressTracker = () => {
    const entry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      meals: `${recipe.title}\nCalories: ${recipe.calories}\nProtein: ${recipe.protein}g\nCarbs: ${recipe.carbs}g\nFat: ${recipe.fat}g`,
      water: 0,
      exercise: '',
      notes: ''
    };

    const existingEntries = JSON.parse(localStorage.getItem('progressEntries') || '[]');
    localStorage.setItem('progressEntries', JSON.stringify([...existingEntries, entry]));
    alert('Recipe added to progress tracker!');
  };

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <div className="recipe-content">
        <h3>{recipe.title}</h3>
        <div className="recipe-meta">
          <span>🕒 {recipe.readyInMinutes || recipe.totalTime} mins</span>
          <span>👥 {recipe.servings} servings</span>
          <span>🔥 {Math.round(recipe.calories)} cal</span>
        </div>
        <div className="nutrition-info">
          <span>🥩 Protein: {Math.round(recipe.protein)}g</span>
          <span>🍚 Carbs: {Math.round(recipe.carbs)}g</span>
          <span>🥑 Fat: {Math.round(recipe.fat)}g</span>
        </div>
        <p className="recipe-summary" dangerouslySetInnerHTML={{ __html: recipe.summary || recipe.description }} />
        <div className="recipe-tags">
          {recipe.dishTypes?.map((type, index) => (
            <span key={index} className="recipe-tag">{type}</span>
          ))}
          {recipe.cuisineType?.map((type, index) => (
            <span key={index} className="recipe-tag">{type}</span>
          ))}
        </div>
        <div className="recipe-actions">
          <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="view-recipe-btn">
            View Recipe
          </a>
          <button onClick={addToGroceryList} className="add-grocery-btn">
            Add to Grocery List
          </button>
          <button onClick={addToProgressTracker} className="add-progress-btn">
            Track Meal
          </button>
        </div>
        <div className="recipe-source">
          Source: {source}
        </div>
      </div>
    </div>
  );
}

function RecipeFinder() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const processSpoonacularRecipe = (recipe) => ({
    ...recipe,
    calories: recipe.nutrition?.nutrients.find(n => n.name === 'Calories')?.amount || 0,
    protein: recipe.nutrition?.nutrients.find(n => n.name === 'Protein')?.amount || 0,
    carbs: recipe.nutrition?.nutrients.find(n => n.name === 'Carbohydrates')?.amount || 0,
    fat: recipe.nutrition?.nutrients.find(n => n.name === 'Fat')?.amount || 0,
    ingredients: recipe.extendedIngredients?.map(i => i.original) || [],
    source: 'Spoonacular'
  });

  const processEdamamRecipe = (recipe) => ({
    id: recipe.uri,
    title: recipe.label,
    image: recipe.image,
    sourceUrl: recipe.url,
    readyInMinutes: recipe.totalTime || 30,
    servings: recipe.yield,
    summary: recipe.summary || `A delicious ${recipe.cuisineType?.[0]} recipe`,
    calories: recipe.calories,
    protein: recipe.totalNutrients?.PROCNT?.quantity || 0,
    carbs: recipe.totalNutrients?.CHOCDF?.quantity || 0,
    fat: recipe.totalNutrients?.FAT?.quantity || 0,
    dishTypes: recipe.dishType || [],
    cuisineType: recipe.cuisineType || [],
    ingredients: recipe.ingredientLines || [],
    source: 'Edamam'
  });

  const searchRecipes = async (query) => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Search using Spoonacular API
      const spoonacularResponse = await fetch(
        `${SPOONACULAR_BASE_URL}/complexSearch?apiKey=${SPOONACULAR_API_KEY}&query=${encodeURIComponent(query)}&addRecipeInformation=true&addRecipeNutrition=true&number=6`
      );
      
      // Search using Edamam API
      const edamamResponse = await fetch(
        `${EDAMAM_BASE_URL}?type=public&q=${encodeURIComponent(query)}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&random=true`
      );
      
      if (!spoonacularResponse.ok && !edamamResponse.ok) {
        throw new Error('Failed to fetch recipes from both APIs');
      }
      
      const spoonacularData = await spoonacularResponse.json();
      const edamamData = await edamamResponse.json();
      
      const spoonacularRecipes = spoonacularData.results?.map(processSpoonacularRecipe) || [];
      const edamamRecipes = edamamData.hits?.map(hit => processEdamamRecipe(hit.recipe)) || [];
      
      const allRecipes = [...spoonacularRecipes, ...edamamRecipes];
      
      if (allRecipes.length === 0) {
        setError('No recipes found. Try different search terms.');
        setRecipes([]);
      } else {
        setRecipes(allRecipes);
      }
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(err.message || 'Failed to fetch recipes. Please try again later.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchRecipes(searchQuery);
  };

  return (
    <div className="recipe-finder-container">
      <div className="search-section">
        <h1>Find Your Perfect Recipe</h1>
        <p className="search-description">
          Search for recipes based on ingredients, nutrition goals, or dietary preferences.
          Get detailed nutrition information and add ingredients to your grocery list.
        </p>
        <form className="search-container" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search for recipes or ingredients..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {recipes.length > 0 && (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} source={recipe.source} />
          ))}
        </div>
      )}

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Finding delicious recipes...</p>
        </div>
      )}

      {!loading && !error && recipes.length === 0 && (
        <div className="search-tips">
          <h2>Search Tips</h2>
          <ul>
            <li>Search by ingredients (e.g., "chicken pasta")</li>
            <li>Search by cuisine (e.g., "italian dinner")</li>
            <li>Search by dietary preferences (e.g., "vegetarian lunch")</li>
            <li>Search by cooking time (e.g., "quick breakfast")</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default RecipeFinder; 