import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Components/homepage'
import Registration from '../Components/registration'
import Login from '../Components/login'

import PrivateRoute from './privateRoute'
import SubscriptionsPlans from '../Components/subscribtions'
import SubscriptionForm from '../Components/subform'
import DisplayMovies from '../Components/displayMovies'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/'element={<Homepage/>}/>
        <Route path='/register'element={<Registration/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/subscribtion_plans'element={<SubscriptionsPlans/>} />
        <Route path='/subscribes'element={<PrivateRoute><SubscriptionForm/></PrivateRoute>} />
        <Route path='/displayMovies'element={<PrivateRoute><DisplayMovies/></PrivateRoute>} />
        
        </Routes>
  )
}

export default MainRoutes