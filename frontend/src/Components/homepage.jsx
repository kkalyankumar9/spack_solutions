import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './navBar'
import SubscriptionsPlans from './subscribtions'
import SubscriptionForm from './subform'

const Homepage = () => {
  return (
    <div className='text-center text-4xl p-4'>
      <Navbar/>
      <SubscriptionsPlans/>
      
     
    </div>
  )
}

export default Homepage