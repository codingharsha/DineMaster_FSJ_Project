import React from 'react';
import './AdminSidebar.css';
import { FaChartPie, FaUsers, FaUtensils, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate('/');
    window.location.reload(); 
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-logo">
        <h2>DM Admin</h2>
      </div>

      <ul className="admin-menu">
        <li onClick={() => navigate('/admin/dashboard')}>
            <FaChartPie /> Dashboard
        </li>
        <li onClick={() => navigate('/admin/revenue')}>
            <FaClipboardList /> Revenue & Stats
        </li>
        <li onClick={() => navigate('/admin/users')}>
            <FaUsers /> User Roles
        </li>
        <li onClick={() => navigate('/admin/menu')}>
            <FaUtensils /> Menu Management
        </li>
        <li onClick={() => navigate('/admin/reviews')}>
            <MdRateReview /> Reviews
        </li>
      </ul>

      <div className="admin-logout" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </div>
    </div>
  );
};

export default AdminSidebar;