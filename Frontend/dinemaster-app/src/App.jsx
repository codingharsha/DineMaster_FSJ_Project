import React, {useContext, useState} from 'react'
import Navbar from './Components/Customer/Navbar/Navbar'
import Home from './Components/Customer/Home/Home';
import {Routes, Route, useLocation} from 'react-router-dom';
import OrderOnline from './Components/Customer/OrderOnline/OrderOnline';
import PlaceOrder from './Components/Customer/PlaceOrder/PlaceOrder';
import Cart from './Components/Customer/Cart/Cart';
import Deals from './Components/Customer/Deals/Deals';
import HappinessCardsPage from './Components/Customer/HappinessCardsPage/HappinessCardsPage';
import Restaurants from './Components/Customer/Restaurants/Restaurants';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import Profile from './Components/Customer/Profile/Profile';
import TableReservation from './Components/Customer/TableReservation/TableReservation';
import MyOrders from './Components/Customer/MyOrders/MyOrders';
import TrackOrder from './Components/Customer/TrackOrder/TrackOrder';
import GalleryPage from './Components/Customer/GalleryPage/GalleryPage';
import { StoreContext } from './Context/StoreContext';

import ErrorPopup from './Components/Common/ErrorPopup';
import { ErrorContext } from './Context/ErrorContext';

import KitchenDashboard from './Components/Kitchen/KitchenDashboard/KitchenDashboard';
import KitchenNavbar from './Components/Kitchen/KitchenNavbar/KitchenNavbar';
import AdminSidebar from './Components/Admin/AdminSidebar/AdminSidebar'; 
import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard';
import AdminBilling from './Components/Admin/AdminBilling/AdminBilling';
import AdminStaff from './Components/Admin/AdminStaff/AdminStaff';
import AdminSettings from './Components/Admin/AdminSettings/AdminSettings';
import AdminCustomers from './Components/Admin/AdminCustomers/AdminCustomers';
import AdminReviews from './Components/Admin/AdminReviews/AdminReviews';
import AdminMenuInventory from './Components/Admin/AdminMenuInventory/AdminMenuInventory';
import AdminProfile from './Components/Admin/AdminProfile/AdminProfile';
import AdminRoute from './Components/Admin/AdminRoute/AdminRoute';
const App = () => {

  const { error, clearError } = useContext(ErrorContext);
  const [showLogin, setShowLogin] = useState(false);
  const {userRole} = useContext(StoreContext);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
    
      <div className='app'>
        {isAdminRoute && <AdminSidebar />}
        {isAdminRoute ? (
          <></>
        ):
        userRole === "KITCHEN_STAFF" ? (
          <KitchenNavbar />
        ) : (
          <Navbar setShowLogin={setShowLogin} />
        )}

            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/order-online' element ={<OrderOnline />} />
              <Route path='/order' element ={<PlaceOrder />} />
              <Route path='/cart' element = {<Cart />} />
              <Route path='/offers' element = {<Deals />} />
              <Route path='/happiness-cards' element={<HappinessCardsPage />} />
              <Route path='/restaurants' element={<Restaurants />} />
              <Route path='/myprofile' element={<Profile />} />
              <Route path='/book-table' element={<TableReservation />} />
              <Route path='/track-order/:orderId' element={<TrackOrder />} />
              <Route path='/myorders' element={<MyOrders />} />
              <Route path='/gallery' element ={<GalleryPage />}/>

              <Route path='/kitchen' element = {<KitchenDashboard />} />
              <Route path='/admin/dashboard' element = {<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path='/admin/billing' element={<AdminBilling />} />
              <Route path='/admin/staff' element={<AdminStaff />} />
              <Route path='/admin/settings' element={<AdminSettings />} />
              <Route path='/admin/customers' element={<AdminCustomers />} />
              <Route path='/admin/reviews' element={<AdminReviews />} />
              <Route path='/admin/inventory' element={<AdminMenuInventory />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
            </Routes>

            <ErrorPopup message={error} onClose={clearError} />
      </div>
    </>
  )
}

export default App