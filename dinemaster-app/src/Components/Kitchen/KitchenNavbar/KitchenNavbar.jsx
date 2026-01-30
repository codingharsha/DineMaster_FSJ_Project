import React, { useContext } from 'react';
import './KitchenNavbar.css';
import { StoreContext } from '../../../Context/StoreContext';
import { FaFire, FaHistory, FaBoxOpen, FaSignOutAlt, FaClipboardList, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const KitchenNavbar = () => {
    
    const { setToken, setUserName, setUserRole, kitchenTab, setKitchenTab } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");

        setToken("");
        setUserName("");
        setUserRole("customer"); 
        setKitchenTab("live");

        navigate("/");
        window.location.reload();
    }

    return (
        <div className="kitchen-navbar">
            <div className="k-logo-container">
                 <div className="k-icon-wrapper">
                    <FaFire className='k-logo-icon'/>
                 </div>
                 <div className="k-logo-txt-container">
                    <div className='k-logo-txt'>DineMaster</div>
                    <div className='k-logo-slogan'>KITCHEN STATION</div>
                 </div>
            </div>

           <div className="k-nav-links">
                <div className={`k-link ₹{kitchenTab === 'live' ? 'active' : ''}`} 
                    onClick={() => setKitchenTab('live')}>
                    <FaClipboardList /> Live Orders</div>
                <div className={`k-link ₹{kitchenTab === 'history' ? 'active' : ''}`}
                    onClick={() => setKitchenTab('history')}>
                    <FaHistory /> History</div>
                <div className={`k-link ₹{kitchenTab === 'inventory' ? 'active' : ''}`}
                    onClick={() => setKitchenTab('inventory')}>
                    <FaBoxOpen /> Inventory</div>
            </div>

            <div className="k-nav-right">
                 <div className="k-profile-pill">
                    <FaUserTie /> <span>Chef Manager</span>
                 </div>
                 
                 <button onClick={logout} className="k-logout-btn">
                    <FaSignOutAlt /> Logout
                 </button>
            </div>
        </div>
    )
}

export default KitchenNavbar;