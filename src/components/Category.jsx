import styled from 'styled-components'
import {NavLink} from 'react-router-dom' 

import React from 'react'

function Category() {
  return (
    <List>
      <SLink to={'/cuisine/Italian'}>
        <h4>Italian</h4>
      </SLink>
      <SLink to={'/cuisine/Vietnamese'}>
        <h4>Vietnamese</h4>
      </SLink>
      <SLink to={'/cuisine/Thai'}>
        <h4>Thai</h4>
      </SLink>
      <SLink to={'/cuisine/Korean'}>
        <h4>Korean</h4>
      </SLink>
    </List>
  )
}

const List = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0rem;
`

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-decoration: none;
  background: linear-gradient(35deg, #6a6a6a, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  h4{
    color: white;
    font-size: 0.8rem;
  }

  svg{
    color:white;
    font-size: 2rem;
}

&.active{
  background: linear-gradient(to right, #f27121, #e94057);
}
`

export default Category;  