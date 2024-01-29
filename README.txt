How to run
1. open terminal
2. type 'cd recipe_app' 
2. type 'npm start' (*check the directory)

### 2024/01/28 Update

'.env' file is an API key. (The custom environment variable should be named start with 'REACT_APP_')

*************npm library list**************
npm install [library name(below)]
    framer-motion //for animation
    react-icons 
    react-router-dom
    styled-components
    '@splidejs/react-splide' //for carousel


***************Card Format*****************
return (
    <div>
      {popular.map(recipe => {
        return(
          <Wrapper> 
            <h3>Popular Picks</h3>
            {popular.map((recipe)=>{
              return (
                <Card> 
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title}></img>
                </Card>
              )
            })}
          </Wrapper>
        );
      })}
    </div>
  )

const Wrapper = styled.div`
  margin: 4rem 0rem;
`

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;

  img{
    border-radius: 2rem;
  }
`