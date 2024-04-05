import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

function Recipe() {
  let params = useParams();
  const [details, setDetail] = useState({});
  const [activeTab, setActiveTab] = useState('Instructions');

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetail(detailData);
    console.log(detailData);
  };

 // Function to save recipe to JSONBin
const saveRecipe = async () => {
  const jsonBinApi = 'https://api.jsonbin.io/v3/b/';
  const binId = '660c85aae41b4d34e4de2620';

  try {
    // Get the existing recipes from JSONBin
    const getResponse = await fetch(`${jsonBinApi}${binId}`, {
      headers: {
        'X-Master-Key': '$2a$10$pgcUy1BSS91nEfEZDFUYAOkv.jLnPaFmqyc4UIYfJCuKceurtGYYm',
      },
    });
    
    let existingRecipes = [];
    if (getResponse.ok) {
      const data = await getResponse.json();
      existingRecipes = Array.isArray(data.record) ? data.record : [];
    }
    
    // Check if the recipe is already in the array to prevent duplicates
    const recipeExists = existingRecipes.some(recipe => recipe.id === details.id);
    if (!recipeExists) {
      // If not a duplicate, append the new details to the array
      const updatedRecipes = [...existingRecipes, details];

      // Save the updated array back to JSONBin
      const putResponse = await fetch(`${jsonBinApi}${binId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$pgcUy1BSS91nEfEZDFUYAOkv.jLnPaFmqyc4UIYfJCuKceurtGYYm',
        },
        body: JSON.stringify(updatedRecipes),
      });

      if (putResponse.ok) {
        alert('Recipe saved successfully!');
      } else {
        throw new Error('Failed to save recipe.');
      }
    } else {
      alert('This recipe is already saved.');
    }
  } catch (error) {
    console.error('Error saving recipe to JSONBin:', error);
  }
};


  useEffect(() => {
    fetchDetails();
  }, [params.name]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button className={activeTab === 'Instructions' ? 'active' : ''} onClick={() => setActiveTab('Instructions')}>
          Instructions
        </Button>
        <Button className={activeTab === 'Ingredients' ? 'active' : ''} onClick={() => setActiveTab('Ingredients')}>
          Ingredients
        </Button>
        <Button className={activeTab === 'Save' ? 'active' : ''} onClick={saveRecipe}>
          Save
        </Button>

        {activeTab === 'Instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === 'Ingredients' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.original}</li>;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  flex-directions: column;
  align-items: center; /* This aligns the flex children (your content) on the cross axis (horizontally if flex-direction is column) */
  justify-content: center; /* This will center the content vertically */
  text-align: center; /* This ensures that text within the flex children is also centered */
  
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
