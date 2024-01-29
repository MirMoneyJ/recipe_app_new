import Pages from './pages/Pages'
import Category from './components/Category';
import {BrowserRouter} from 'react-router-dom'
import Search from './components/Search';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {GiKnifeFork} from 'react-icons/gi'

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Nav>
          <GiKnifeFork/>
          <Logo to={'/'}>Recipe Realm</Logo>
        </Nav>
        <Search/>
        <Category/>
        <Pages/>
      </BrowserRouter>
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-family: 'Lobster Two', cursive;
`
const Nav = styled.h1`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg{
    font-size: 2rem;
  }
`

export default App;