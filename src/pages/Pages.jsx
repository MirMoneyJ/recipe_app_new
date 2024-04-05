import React from 'react'
import Home from './Home'
import Searched from './Searched'
import Cuisine from './Cuisine'
import Recipe from './Recipe'
import FamilyCookbook from './FamilyCookbook'
import {Route, Routes} from 'react-router-dom'

function Pages() {
  return (
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cuisine/:type' element={<Cuisine/>}></Route>
        <Route path='/searched/:search' element={<Searched/>}></Route>
        <Route path='/recipe/:name' element={<Recipe/>}></Route>
        <Route path="/family-cookbook" element={<FamilyCookbook />} />
      </Routes>
  )
}

export default Pages 