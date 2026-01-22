import React, { useState } from 'react';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import TableReservation from './Components/TableReservation/TableReservation';
import OrderOnline from './Components/OrderOnline/OrderOnline';
import HappinessCardsPage from './Components/HappinessCardsPage/HappinessCardsPage';
import OffersPage from './Components/OffersPage/OffersPage';
import Cart from './Components/Cart/Cart';

import AdminDashboard from './Components/Admin/Dashboard/AdminDashboard';
import MenuManagement from './Components/Admin/Menu/MenuManagement';
import ReviewManagement from './Components/Admin/Reviews/ReviewManagement';

const KitchenDisplay = () => <h1 style={{padding: '100px'}}>Kitchen Display System</h1>;

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isAdminOrKitchen = location.pathname.startsWith('/admin') || location.pathname.startsWith('/kitchen');

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {!isAdminOrKitchen && <Navbar setShowLogin={setShowLogin} />}

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<TableReservation />} />
        <Route path="/order-online" element={<OrderOnline />} />
        <Route path="/happiness-cards" element={<HappinessCardsPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/kitchen/orders" element={<KitchenDisplay />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/menu" element={<MenuManagement />} />
        <Route path="/admin/reviews" element={<ReviewManagement />} />
      </Routes>

    </>
  );
};

export default App;