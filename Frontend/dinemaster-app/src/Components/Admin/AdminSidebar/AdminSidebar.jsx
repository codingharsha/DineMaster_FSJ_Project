import React, { useContext } from 'react';
import './AdminSidebar.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FaChartLine, FaFileInvoiceDollar, FaFire, FaUsersCog,
    FaCogs, FaSignOutAlt, FaUsers, FaBullhorn, FaUtensils,
    FaUserCircle, FaChartBar
} from 'react-icons/fa';
import { StoreContext } from '../../../Context/StoreContext';

const AdminSidebar = () => {
    const { resetCustomerState } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        resetCustomerState();
        navigate("/");
    };

    const links = [
        { to: "/admin/dashboard",  icon: <FaChartLine />,         label: "Dashboard"         },
        { to: "/admin/sales",      icon: <FaChartBar />,          label: "Sales Reports"     },
        { to: "/admin/billing",    icon: <FaFileInvoiceDollar />,  label: "Billing & Invoices"},
        { to: "/admin/inventory",  icon: <FaUtensils />,          label: "Menu & Inventory"  },
        { to: "/admin/staff",      icon: <FaUsersCog />,          label: "Staff & Payroll"   },
        { to: "/admin/customers",  icon: <FaUsers />,             label: "Customers & CRM"   },
        { to: "/admin/reviews",    icon: <FaBullhorn />,          label: "Reviews & Reports" },
        { to: "/admin/settings",   icon: <FaCogs />,              label: "Settings"          },
        { to: "/admin/profile",    icon: <FaUserCircle />,        label: "Profile"           },
    ];

    return (
        <div className="admin-sidebar">
            <div className="admin-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaFire style={{ fontSize: '28px', color: '#f26622' }} />
                <div>
                    <h2 style={{ margin: 0, lineHeight: 1 }}>DineMaster</h2>
                    <span style={{ fontSize: '10px', letterSpacing: '1px', color: '#888' }}>ADMIN PANEL</span>
                </div>
            </div>

            <div className="admin-nav">
                {links.map(({ to, icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => isActive ? "admin-link active" : "admin-link"}
                    >
                        {icon} {label}
                    </NavLink>
                ))}
            </div>

            <div className="admin-footer">
                <button className="admin-logout" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
