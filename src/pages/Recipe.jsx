import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'

function Recipe() {
  let params = useParams();
  const [details, setDetail] = useState({});
  const [activeTab, setActiveTab] = useState('Instructions')

  const fetchDetails = async()=>{
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
    const detailData = await data.json();
    setDetail(detailData);
    console.log(detailData);
  }

  useEffect(()=>{
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params.name])


  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button className={activeTab === 'Instructions' ? 'active' : null} onClick={()=>{setActiveTab('Instructions')}}>Instructions</Button>
        <Button className={activeTab === 'Ingredients' ? 'active' : null} onClick={()=>{setActiveTab('Ingredients')}}>Ingredients</Button>

        {activeTab === 'Instructions' && (
        <div>
          <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
          <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
        </div>
        )}

        {activeTab === "Ingredients" && (
        <ul>
          {details.extendedIngredients.map((ingredient)=>{
            return(
              <li key={ingredient.id}>{ingredient.original}</li>
            )
          })}
        </ul>
        )}
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

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