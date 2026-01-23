import React, { useState } from 'react';

import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar from './Components/Customer/Navbar/Navbar';
import Home from './Components/Customer/Home/Home';
import LoginPopup from './Components/Customer/LoginPopup/LoginPopup';
import TableReservation from './Components/Customer/TableReservation/TableReservation';
import OrderOnline from './Components/Customer/OrderOnline/OrderOnline';
import HappinessCardsPage from './Components/Customer/HappinessCardsPage/HappinessCardsPage';
import OffersPage from './Components/Customer/OffersPage/OffersPage';
import Cart from './Components/Customer/Cart/Cart';

const KitchenDisplay = () => <h1 style={{padding: '100px'}}>Kitchen Display System</h1>;

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<TableReservation />} />
        <Route path="/order-online" element={<OrderOnline />} />
        <Route path="/happiness-cards" element={<HappinessCardsPage />} />
        <Route path="/kitchen/orders" element={<KitchenDisplay />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

    </>
  );
};

export default App;