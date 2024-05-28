import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className='text-center text-4xl p-4'>
      <Link to={"/register"}>register</Link>
      <Link to={"/login"}>login</Link>
    </div>
  )
}

export default Homepage