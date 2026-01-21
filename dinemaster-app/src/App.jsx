import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import TableReservation from './Components/TableReservation/TableReservation';
import OrderOnline from './Components/OrderOnline/OrderOnline';
const AdminDashboard = () => <h1 style={{padding: '100px'}}>Manager Dashboard</h1>;
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
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/kitchen/orders" element={<KitchenDisplay />} />
      </Routes>

    </>
  );
};

export default App;