import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function Recipe({ userName }) {
  let params = useParams(); // Fetch route params
  // States to manage various data
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('Instructions');
  const [editedIngredients, setEditedIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch recipe details from the API
  const fetchDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
      const detailData = await response.json();
      // Filter duplicate UID's
      if (detailData && Array.isArray(detailData.extendedIngredients)) {
        const uniqueIngredients = [];
        const ingredientIds = new Set();
        detailData.extendedIngredients.forEach(ingredient => {
          if (!ingredientIds.has(ingredient.id)) {
            ingredientIds.add(ingredient.id);
            uniqueIngredients.push(ingredient);
          }
        });
        // Set the state with unique ingredients and recipe details
        setEditedIngredients(uniqueIngredients);
        setDetails(detailData);
      } else {
        setEditedIngredients([]);
        setDetails({});
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setIsLoading(false);
    }
}, [params.name]);

  // Function to save recipe details
  const handleSaveRecipe = async (modify = false) => {
    setIsLoading(true);
    try {
      // Determine the URL based on whether it's a personal or regular save
      const url = modify ? 'https://api.jsonbin.io/v3/b/66205154ad19ca34f85bd7c2' // Personal Cookbook bin
                         : 'https://api.jsonbin.io/v3/b/660c85aae41b4d34e4de2620'; // Family Cookbook bin
      
      const headers = {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$pgcUy1BSS91nEfEZDFUYAOkv.jLnPaFmqyc4UIYfJCuKceurtGYYm',
      };

      // Fetch existing recipes
      const getResponse = await fetch(url, { headers });
      if (!getResponse.ok) {
        throw new Error(`Failed to fetch existing recipes: ${getResponse.statusText}`);
      }
      const jsonData = await getResponse.json();
      let existingRecipes = jsonData.record || [];

      // If existing recipe is not an array, throw error
      if (!Array.isArray(existingRecipes)) {
        console.error('Expected an array of recipes, but received:', existingRecipes);
        existingRecipes = [];
      }

      // Prepare the new recipe details
      const newDetails = {
        ...details,
        extendedIngredients: editedIngredients,
        title: modify ? `${details.title} (${userName} modified)` : details.title,
      };

      // Update exisitn existing recipes array
      const updatedRecipes = existingRecipes.filter(recipe => recipe.id !== details.id);
      updatedRecipes.push(newDetails);

      // PUT req. to update the recipes
      const putResponse = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updatedRecipes),
      });

      if (!putResponse.ok) {
        throw new Error(`Failed to save recipe: ${putResponse.statusText}`);
      }
      alert(modify ? 'Recipe personally saved successfully!' : 'Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert(`Error saving recipe: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
};
  

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  // Loading screen. Not necessary, but good to let user know when the app is stalling
  if (isLoading || !details.extendedIngredients) {
    return <div>Loading...</div>;
  }

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <ButtonContainer>
          <Button className={activeTab === 'Instructions' ? 'active' : ''} onClick={() => setActiveTab('Instructions')}>Instructions</Button>
          <Button className={activeTab === 'Ingredients' ? 'active' : ''} onClick={() => setActiveTab('Ingredients')}>Ingredients</Button>
          <Button className={activeTab === 'Save' ? 'active' : ''} onClick={() => handleSaveRecipe()}>Save</Button>
          <Button className={activeTab === 'Personal Save' ? 'active' : ''} onClick={() => handleSaveRecipe(true)}>Personal Save</Button>
        </ButtonContainer>
        {activeTab === 'Instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === 'Ingredients' && (
          <ul>
            {details.extendedIngredients.map(ingredient => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; // This will center your buttons on the page
  gap: 10px; // This will add space between your buttons

  @media (max-width: 768px) {
    justify-content: space-around; // Adjust the spacing on smaller screens
  }
`;

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  flex-directions: column;
  align-items: center; 
  justify-content: center; 
  
  .active{
    background: linear-gradient(35deg, #6a6a6a, #313131);
    color: white;
  }

  h2{
    margin-bottom: 2rem;
  }

  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 2rem;
  }

  ul{
    margin-top: 2rem;
  }

  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
`

const Button = styled.div`
  display: inline;
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`

const Info = styled.div`
  margin-left: 10rem;
`




export default Recipe
