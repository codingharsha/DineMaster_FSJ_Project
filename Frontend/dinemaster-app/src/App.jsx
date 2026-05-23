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
import LocationsPage from './Components/Customer/LocationsPage/LocationsPage';
import LoginPopup from './Components/LoginPopup/LoginPopup';
import Profile from './Components/Customer/Profile/Profile';
import TableReservation from './Components/Customer/TableReservation/TableReservation';
import MyOrders from './Components/Customer/MyOrders/MyOrders';
import TrackOrder from './Components/Customer/TrackOrder/TrackOrder';
import GalleryPage from './Components/Customer/GalleryPage/GalleryPage';
import PaymentSuccess from "./Components/Customer/PaymentSuccess/PaymentSuccess.jsx";
import Menu from './Components/Customer/Menu/Menu';

import { StoreContext } from './Context/StoreContext';
import ErrorPopup from './Components/Common/ErrorPopup';
import SuccessToast from './Components/Common/SuccessToast';
import FirstLoginPasswordChange from './Components/Common/FirstLoginPasswordChange';
import { ErrorContext } from './Context/ErrorContextValue';

import KitchenDashboard from './Components/Kitchen/KitchenDashboard/KitchenDashboard';
import KitchenNavbar from './Components/Kitchen/KitchenNavbar/KitchenNavbar';
import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard';
import AdminBilling from './Components/Admin/AdminBilling/AdminBilling';
import AdminStaff from './Components/Admin/AdminStaff/AdminStaff';
import AdminSettings from './Components/Admin/AdminSettings/AdminSettings';
import AdminCustomers from './Components/Admin/AdminCustomers/AdminCustomers';
import AdminReviews from './Components/Admin/AdminReviews/AdminReviews';
import AdminMenuInventory from './Components/Admin/AdminMenuInventory/AdminMenuInventory';
import AdminProfile from './Components/Admin/AdminProfile/AdminProfile';
import AdminRoute from './Components/Admin/AdminRoute/AdminRoute';
import AdminSalesReport  from './Components/Admin/AdminSalesReport/AdminSalesReport';
import FeedbackForm      from './Components/Customer/FeedbackForm/FeedbackForm';
import Support from './Components/Customer/Support/Support';
import KitchenRoute from './Components/Kitchen/KitchenRoute/KitchenRoute';
const App = () => {

  const { error, clearError } = useContext(ErrorContext);
  const [showLogin, setShowLogin] = useState(false);
  const {userRole, successMessage, clearSuccess} = useContext(StoreContext);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isKitchenRoute = location.pathname.startsWith('/kitchen');
  const isPasswordChangeRoute = location.pathname === "/change-password-first";

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
    
      <div className='app'>
        {isAdminRoute ? (
          <></>
        ) :
        isKitchenRoute && userRole === "KITCHEN_STAFF" ? (
          <KitchenNavbar />
        ) : isPasswordChangeRoute ? (
          <></>
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
              <Route path='/locations' element={<LocationsPage />} />
              <Route path='/myprofile' element={<Profile />} />
              <Route path='/book-table' element={<TableReservation />} />
              <Route path='/myorders' element={<MyOrders />} />
              <Route path="/menu" element={<Menu />} />
              <Route path='/gallery' element ={<GalleryPage />}/>
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/change-password-first" element={<FirstLoginPasswordChange />} />

              <Route path='/kitchen' element = {<KitchenRoute><KitchenDashboard /></KitchenRoute>} />
              <Route path="/admin/dashboard"  element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/sales"      element={<AdminRoute><AdminSalesReport /></AdminRoute>} />
              <Route path="/admin/billing"    element={<AdminRoute><AdminBilling /></AdminRoute>} />
              <Route path="/admin/inventory"  element={<AdminRoute><AdminMenuInventory /></AdminRoute>} />
              <Route path="/admin/staff"      element={<AdminRoute><AdminStaff /></AdminRoute>} />
              <Route path="/admin/customers"  element={<AdminRoute><AdminCustomers /></AdminRoute>} />
              <Route path="/admin/reviews"    element={<AdminRoute><AdminReviews /></AdminRoute>} />
              <Route path="/admin/settings"   element={<AdminRoute><AdminSettings /></AdminRoute>} />
              <Route path="/admin/profile"    element={<AdminRoute><AdminProfile /></AdminRoute>} />
              <Route path="/feedback" element={<FeedbackForm />} />
              <Route path="/support" element={<Support />} />
            </Routes>

            <ErrorPopup message={error} onClose={clearError} />
            <SuccessToast message={successMessage} onClose={clearSuccess} />
      </div>
    </>
  )
}

export default App
