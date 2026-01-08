import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthPage from './Components/AuthenticationPage/AuthPage'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/auth' element = {<AuthPage />} />
      </Routes>

    </div>
  )
}

export default App