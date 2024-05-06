import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import {Link, useParams} from 'react-router-dom'

function Cuisine() {
  const [cuisine, setCuisine] = useState([]); // State to hold list of recipes for specific cuisine
  let params = useParams(); // Gets params from the URL

  // Function to fetch recipes based on cuisine name
  const getCuisine = async(name)=>{
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}&number=9`);
    const recipes = await data.json();
    setCuisine(recipes.results) // Update the state with fetched recipes
  };

  // Effect hook to fetch recipes when the cuisine type changes
  useEffect(()=>{
    getCuisine(params.type)
  },[params.type])

  return (
    // Grid container with animation
    <Grid
    animate={{opacity: 1}}
    initial={{opacity: 0}}
    transition={{duration: 0.5}}
    >
      {/* Mapping over the list of recipes */}
      {cuisine.map((item)=>{
        return(
          <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
              <img src={item.image} alt=''/>
              <h4>{item.title}</h4>
            </Link>
          </Card>
        )
      })}
    </Grid>
  )
}

// Styling: Lines 44 - END
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2.5rem;
`;

const Card = styled.div`
  img{
    width: 100%;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }

  a{
    text-decoration: none;
  }

  h4{
    text-align: center;
    padding: 1rem;
  }
`

export default Cuisine 
