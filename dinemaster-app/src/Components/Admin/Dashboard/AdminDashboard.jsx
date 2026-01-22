import React from 'react';
import './AdminDashboard.css';
import AdminSidebar from '../Sidebar/AdminSidebar';
import { FaShoppingBag, FaWallet, FaUserFriends, FaClipboardCheck } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <div className="admin-content">
        <div className="dashboard-header">
            <h1>Dashboard Overview</h1>
            <p>Welcome back, Manager</p>
        </div>
        
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-icon orders"><FaShoppingBag /></div>
                <div className="stat-info">
                    <h3>Total Orders</h3>
                    <p className="stat-num">124</p>
                    <span className="stat-sub">+12% from yesterday</span>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon revenue"><FaWallet /></div>
                <div className="stat-info">
                    <h3>Total Revenue</h3>
                    <p className="stat-num">₹45,230</p>
                    <span className="stat-sub">+5% from yesterday</span>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon users"><FaUserFriends /></div>
                <div className="stat-info">
                    <h3>Active Users</h3>
                    <p className="stat-num">1,205</p>
                    <span className="stat-sub">+24 new signups</span>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon reservations"><FaClipboardCheck /></div>
                <div className="stat-info">
                    <h3>Reservations</h3>
                    <p className="stat-num">8</p>
                    <span className="stat-sub">4 Pending Confirmation</span>
                </div>
            </div>
        </div>

        <div className="recent-activity-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
                <div className="activity-item">
                    <span className="time">10:30 AM</span>
                    <p><strong>Harsha</strong> placed a new order #ORD-4421</p>
                    <span className="status pending">Pending</span>
                </div>
                <div className="activity-item">
                    <span className="time">10:15 AM</span>
                    <p><strong>Chef John</strong> updated "Grilled Chicken" stock status</p>
                    <span className="status updated">System</span>
                </div>
                <div className="activity-item">
                    <span className="time">09:45 AM</span>
                    <p><strong>Table #4</strong> reserved by Alice for Dinner</p>
                    <span className="status new">New</span>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;