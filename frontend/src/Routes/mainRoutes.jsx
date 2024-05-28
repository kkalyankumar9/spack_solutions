import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Components/homepage'
import Registration from '../Components/registration'
import Login from '../Components/login'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/'element={<Homepage/>}/>
        <Route path='/register'element={<Registration/>}/>
        <Route path='/login'element={<Login/>}/>
        </Routes>
  )
}

export default MainRoutes