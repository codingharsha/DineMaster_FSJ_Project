import React, { useContext } from 'react';
import './AdminSidebar.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaChartLine, FaFileInvoiceDollar, FaFire, FaUsersCog, FaCogs, FaSignOutAlt, FaUsers, FaBullhorn, FaUtensils } from 'react-icons/fa';
import { StoreContext } from '../../../Context/StoreContext';

const AdminSidebar = () => {
    const { setToken, setUserName, setUserRole } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");

      setToken("");
      setUserName("");
      setUserRole("customer"); 

      navigate("/");
      window.location.reload();
  }
  return (
    <div className="admin-sidebar">
        <div className="admin-logo" style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <FaFire style={{fontSize:'28px', color:'#f26622'}}/>
            <div>
                <h2 style={{margin:0, lineHeight:1}}>DineMaster</h2>
                <span style={{fontSize:'10px', letterSpacing:'1px', color:'#888'}}>ADMIN PANEL</span>
            </div>
        </div>

        <div className="admin-nav">
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                <FaChartLine /> Dashboard
            </NavLink>
            
            <NavLink to="/admin/billing" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                <FaFileInvoiceDollar /> Billing & Invoices
            </NavLink>

            <NavLink to="/admin/inventory" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                <FaUtensils /> Menu & Inventory
            </NavLink>
            
            <NavLink to="/admin/staff" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                <FaUsersCog /> Staff & Payroll
            </NavLink>
            
            <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                <FaCogs /> Settings
            </NavLink>

            <NavLink to="/admin/customers" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                <FaUsers /> Customers & CRM
            </NavLink>

            <NavLink to="/admin/reviews" className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}>
                <FaBullhorn /> Reviews & Reports
            </NavLink>
        </div>

        <div className="admin-footer">
            <button className="admin-logout" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
            </button>
        </div>
    </div>
  )
}

export default AdminSidebar;