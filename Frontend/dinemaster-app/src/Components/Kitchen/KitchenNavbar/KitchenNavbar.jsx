import React, { useContext } from 'react';
import './KitchenNavbar.scss';
import { StoreContext } from '../../../Context/StoreContext';
import { FaBoxOpen, FaClipboardList, FaFireAlt, FaHistory, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const KitchenNavbar = () => {
  const { setToken, setUserName, setUserRole, kitchenTab, setKitchenTab, userName } = useContext(StoreContext);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setToken('');
    setUserName('');
    setUserRole('customer');
    setKitchenTab('live');
    navigate('/');
  };

  return (
    <header className="k-navbar">
      <div className="k-brand">
        <div className="fire-wrap"><FaFireAlt /></div>
        <div>
          <h2>DineMaster Kitchen</h2>
          <p>Production Console</p>
        </div>
      </div>

      <nav className="k-tabs">
        <button className={kitchenTab === 'live' ? 'active' : ''} onClick={() => setKitchenTab('live')}>
          <FaClipboardList /> Live
        </button>
        <button className={kitchenTab === 'history' ? 'active' : ''} onClick={() => setKitchenTab('history')}>
          <FaHistory /> History
        </button>
        <button className={kitchenTab === 'inventory' ? 'active' : ''} onClick={() => setKitchenTab('inventory')}>
          <FaBoxOpen /> Inventory
        </button>
      </nav>

      <div className="k-user-strip">
        <span><FaUserCircle /> {userName || 'Kitchen Staff'}</span>
        <button onClick={onLogout}><FaSignOutAlt /> Logout</button>
      </div>
    </header>
  );
};

export default KitchenNavbar;
