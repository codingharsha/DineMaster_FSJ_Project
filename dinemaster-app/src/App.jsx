import React from 'react'
import Navbar from './Components/Customer/Navbar/Navbar'
import Home from './Components/Customer/Home/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import OrderOnline from './Components/Customer/OrderOnline/OrderOnline';
import PlaceOrder from './Components/Customer/PlaceOrder/PlaceOrder';
import Cart from './Components/Customer/Cart/Cart';
const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/order-online' element ={<OrderOnline />} />
        <Route path='/order' element ={<PlaceOrder />} />
        <Route path='/cart' element = {<Cart />} />
      </Routes>

    </div>
  )
}

export default App