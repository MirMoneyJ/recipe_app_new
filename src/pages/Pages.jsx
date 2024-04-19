import React from 'react'
import Home from './Home'
import Searched from './Searched'
import Cuisine from './Cuisine'
import Recipe from './Recipe'
import FamilyCookbook from './FamilyCookbook'
import PersonalCookbook from './PersonalCookbook'
import {Route, Routes} from 'react-router-dom'

//Routes to the pages
function Pages({ userName }) {
  return (
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cuisine/:type' element={<Cuisine/>}></Route>
        <Route path='/searched/:search' element={<Searched/>}></Route>
        <Route path='/recipe/:name' element={<Recipe userName={userName}/>}></Route>
        <Route path="/family-cookbook" element={<FamilyCookbook userName={userName}/>} />
        <Route path="/personal-cookbook" element={<PersonalCookbook userName={userName} />} />
      </Routes>
  )
}

export default Pages 