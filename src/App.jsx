import React, { useState, useEffect } from 'react';
import Pages from './pages/Pages';
import Category from './components/Category';
import Search from './components/Search';
import WelcomeModal from './pages/WelcomeModal';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [userName, setUserName] = useState('');
  const [whitelist, setWhitelist] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchWhitelist = async () => {
      try {
        const response = await fetch('https://api.jsonbin.io/v3/b/662148e2acd3cb34a83aba3e', {
          headers: {
            'X-Master-Key': '$2a$10$pgcUy1BSS91nEfEZDFUYAOkv.jLnPaFmqyc4UIYfJCuKceurtGYYm'
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.record && Array.isArray(data.record.whitelist)) {
            setWhitelist(data.record.whitelist);
          } else {
            setWhitelist([]);
          }
        } else {
          throw new Error(`Failed to fetch, status code: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to fetch whitelist:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWhitelist();
  }, []);

  const handleNameSubmit = (name) => {
    if (loading) {
      alert('Still checking the guest list, please wait.');
      return;
    }
    if (whitelist.map(n => n.toLowerCase()).includes(name.trim().toLowerCase())) {
      setUserName(name);
      setIsModalVisible(false);
    } else {
      alert('Sorry, you are not on the guest list.');
    }
  };

  return (
    <div className="App">
      {isModalVisible && <WelcomeModal onNameSubmit={handleNameSubmit} />}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Nav>
          <GiKnifeFork />
          <Logo to={'/'}>Recipe Realm</Logo>
        </Nav>
        <Search />
        <LinksContainer>
          <StyledLink to="/family-cookbook">Family Cookbook</StyledLink>
          <StyledLink to="/personal-cookbook">Personal Cookbook</StyledLink>
        </LinksContainer>
        <Category />
        <Pages userName={userName} />
      </BrowserRouter>
    </div>
  );
}

const LinksContainer = styled.div`
  display: flex;
  justify-content: center; 
  padding: 20px 0; 
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 3rem; /* Increas logo size */
  font-family: 'Lobster Two', cursive;
  color: #313131; 
`;

const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2.5rem; 
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  background-color: #f0f0f0;
  color: #313131;
  padding: 10px 20px;
  margin: 10px 20px;
  text-decoration: none;
  border-radius: 10px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: background-color 0.3s, color 0.3s;
  
  &:hover {
    background-color: #e9e9e9;
    color: #000;
  }
`;

export default App;