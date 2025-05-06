import React, { useState, useEffect } from 'react';

function GroceryList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const savedItems = localStorage.getItem('groceryItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    const newItems = [...items, {
      id: Date.now(),
      name: newItem,
      category: category || 'Other',
      completed: false
    }];

    setItems(newItems);
    localStorage.setItem('groceryItems', JSON.stringify(newItems));
    setNewItem('');
    setCategory('');
  };

  const toggleItem = (id) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(newItems);
    localStorage.setItem('groceryItems', JSON.stringify(newItems));
  };

  const deleteItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    localStorage.setItem('groceryItems', JSON.stringify(newItems));
  };

  const categories = ['Produce', 'Dairy', 'Meat', 'Bakery', 'Canned Goods', 'Frozen', 'Other'];

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="grocery-list-container">
      <h1>Grocery List</h1>

      <form onSubmit={addItem} className="add-item-form">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          className="item-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="add-button">Add Item</button>
      </form>

      <div className="grocery-list">
        {Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <ul className="items-list">
              {categoryItems.map(item => (
                <li key={item.id} className={`item ${item.completed ? 'completed' : ''}`}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleItem(item.id)}
                  />
                  <span className="item-name">{item.name}</span>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="delete-button"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="empty-message">Your grocery list is empty. Add some items!</p>
      )}
    </div>
  );
}

export default GroceryList; 