import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function FamilyCookbook() {
  const [recipes, setRecipes] = useState([]); // State to hold list of recipes

  // Fetch recipes from JSONBin
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('https://api.jsonbin.io/v3/b/660c85aae41b4d34e4de2620', {
        headers: { 'X-Master-Key': process.env.REACT_APP_JSONBIN_KEY }
      });
      if (response.ok) {
        const data = await response.json();
        setRecipes(data.record);
      }
    };

    fetchRecipes();
  }, []);

  // Delete a recipe
  const removeRecipe = async (recipeId) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
    setRecipes(updatedRecipes);

    // Update recipes on JSONBin
    try {
      const putResponse = await fetch('https://api.jsonbin.io/v3/b/660c85aae41b4d34e4de2620', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$pgcUy1BSS91nEfEZDFUYAOkv.jLnPaFmqyc4UIYfJCuKceurtGYYm'
        },
        body: JSON.stringify(updatedRecipes),
      });

      // Error handling
      if (!putResponse.ok) {
        throw new Error('Failed to delete the recipe.');
      }
    } catch (error) {
      console.error('Error deleting recipe from JSONBin:', error);
    }
  };

  return (
    <div>
      <h2>Family Cookbook</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <RecipeItem key={recipe.id > 0 ? recipe.id : `recipe-${index}`}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            <DeleteButton onClick={() => removeRecipe(recipe.id)}>✕</DeleteButton>
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

export default FamilyCookbook;
