import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function PersonalCookbook({ userName }) {
  const [recipes, setRecipes] = useState([]); // State to hold list of recipes
  const [modifiedRecipe, setModifiedRecipe] = useState(null); // Store the recipe being modified
  // State to store new ingredients being appended
  const [newIngredient, setNewIngredient] = useState({
    id: Math.random(), // generate a UID
    consistency: "SOLID",
    name: "",
    amount: 1,
  });

  // Fetch recipes from JSONBin 
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('https://api.jsonbin.io/v3/b/66205154ad19ca34f85bd7c2', {
        headers: { 'X-Master-Key': '$2a$10$pgcUy1BSS91nEfEZDFUYAOkv.jLnPaFmqyc4UIYfJCuKceurtGYYm' }
      });
      if (response.ok) {
        const data = await response.json();
        // Ensure data is an array
        if (Array.isArray(data.record)) {
          // Format recipes to ensure each recipe has an ingredients array even if empty
          const formattedRecipes = data.record.map(recipe => ({
            ...recipe,
            // Ensure each recipe has an ingredients array even if it's empty
            ingredients: recipe.ingredients || []
          }));
          setRecipes(formattedRecipes);
        } else {
          console.error("Data received is not an array:", data.record);
          setRecipes([]);
        }
      } else {
        console.error("Failed to fetch recipes:", response.statusText);
        setRecipes([]);
      }
    };
  
    fetchRecipes();
  }, []);
  
  // Load ingredients from modify button
  const toggleModify = (recipe) => {
    if (modifiedRecipe && modifiedRecipe.id === recipe.id) {
      setModifiedRecipe(null);
    } else {
      setModifiedRecipe({ ...recipe, ingredients: recipe.extendedIngredients || [] });
    }
  };
  
  // Handles changing of ingredients
  const handleIngredientChange = (ingredient, action) => {
    if (!modifiedRecipe) return;
    let updatedIngredients;
    if (action === 'remove') {
      updatedIngredients = modifiedRecipe.ingredients.filter(i => i.id !== ingredient.id);
    } else {
      updatedIngredients = [...modifiedRecipe.ingredients, ingredient];
    }
    setModifiedRecipe({ ...modifiedRecipe, ingredients: updatedIngredients });
  };

  // Add a new ingredient to the modified recipe
  const addNewIngredient = () => {
    if (!modifiedRecipe || !newIngredient.name.trim()) return; // Check if the new ingredient name is not empty
  
    const newIngredientToAdd = {
      ...newIngredient,
      id: Math.random(), 
      original: newIngredient.original.trim(), 
      name: newIngredient.name.trim() 
    };
  
    setModifiedRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredientToAdd]
    }));
  
    // Reset the new ingredient input fields
    setNewIngredient({ id: Math.random(), consistency: "SOLID", name: "", original: "", amount: 1 });
  };
  
  //Save edits from Personal Cookbook
  const saveModifications = async () => {
    const updatedRecipes = recipes.map(recipe => recipe.id === modifiedRecipe.id ? modifiedRecipe : recipe);
    try {
      const response = await fetch('https://api.jsonbin.io/v3/b/66205154ad19ca34f85bd7c2', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$pgcUy1BSS91nEfEZDFUYAOkv.jLnPaFmqyc4UIYfJCuKceurtGYYm'
        },
        body: JSON.stringify(updatedRecipes),
      });
      if (response.ok) {
        setRecipes(updatedRecipes);
        alert('Recipe updated successfully!');
      } else {
        throw new Error('Failed to update the recipe.');
      }
    } catch (error) {
      console.error('Error updating the recipe:', error);
    }
  };

  // Delete a recipe from PersonalCookbook
  const deleteRecipe = async (recipeId) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
    setRecipes(updatedRecipes);

    try {
      const response = await fetch('https://api.jsonbin.io/v3/b/66205154ad19ca34f85bd7c2', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$pgcUy1BSS91nEfEZDFUYAOkv.jLnPaFmqyc4UIYfJCuKceurtGYYm'
        },
        body: JSON.stringify(updatedRecipes),
      });

      if (!response.ok) {
        throw new Error('Failed to delete the recipe.');
      }
    } catch (error) {
      console.error('Error deleting recipe from Personal Cookbook:', error);
    }
  };

  return (
    <div>
      <h2>Personal Cookbook</h2>
      <ul>
        {recipes.map(recipe => (
          <RecipeItem key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            <button onClick={() => toggleModify(recipe)}>Modify</button>
            {modifiedRecipe && modifiedRecipe.id === recipe.id && (
              <ul>
                {modifiedRecipe.ingredients.map(ingredient => (
                  <li key={ingredient.id}>
                    {ingredient.original}
                    <button onClick={() => handleIngredientChange(ingredient, 'remove')}>Remove</button>
                  </li>
                ))}
                <input type="text" placeholder="Ingredient name" value={newIngredient.name} onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})} />
                <input type="text" placeholder="Description" value={newIngredient.original} onChange={(e) => setNewIngredient({...newIngredient, original: e.target.value})} />
                <button onClick={addNewIngredient}>Add Ingredient</button>
                <button onClick={saveModifications}>Save Changes</button>
              </ul>
            )}
            <DeleteButton onClick={() => deleteRecipe(recipe.id)}>✕</DeleteButton>
          </RecipeItem>
        ))}
      </ul>
    </div>
  );
}

const RecipeItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 10px;
`;

export default PersonalCookbook;
