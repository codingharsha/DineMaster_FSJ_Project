import React from 'react';
import './AdminDashboard.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { FaWallet, FaShoppingCart, FaUserFriends, FaArrowUp, FaStar, FaCircle, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { MdOutlineRestaurantMenu, MdDeliveryDining } from "react-icons/md";

const AdminDashboard = () => {

  const popularDishes = [
      { name: "Chicken Biryani", sold: 120, revenue: "₹1400" },
      { name: "Paneer Butter Masala", sold: 95, revenue: "₹950" },
      { name: "Butter Naan", sold: 300, revenue: "₹600" },
  ];

  const recentOrders = [
    { id: "#1023", customer: "Arjun K.", items: 3, total: "₹450", status: "Cooking" },
    { id: "#1022", customer: "Priya S.", items: 1, total: "₹120", status: "Delivered" },
    { id: "#1021", customer: "Rahul V.", items: 4, total: "₹850", status: "Pending" },
  ];

  const staffOnDuty = [
    { name: "Chef Anand", role: "Head Chef", status: "Busy" },
    { name: "Rajesh Kumar", role: "Waiter", status: "Active" },
    { name: "Sita Devi", role: "Cashier", status: "Active" },
  ];

  const recentReviews = [
    { name: "John Doe", rating: 5, comment: "Amazing Biryani!" },
    { name: "Anita Roy", rating: 4, comment: "Good food, fast service." },
  ];

  const chartData = [40, 70, 50, 90, 60, 80, 100]; 

  return (
    <div className="admin-container">
        <AdminSidebar />
        
        <div className="admin-content">
            <header className="admin-header">
                <div>
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back, Admin</p>
                </div>
                <div className="header-date">
                    <span>{new Date().toDateString()}</span>
                </div>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon revenue"><FaWallet /></div>
                    <div className="stat-info">
                        <h3>₹12,340</h3>
                        <p>Total Revenue</p>
                        <span className="trend positive"><FaArrowUp /> +15%</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon orders"><FaShoppingCart /></div>
                    <div className="stat-info">
                        <h3>1,205</h3>
                        <p>Total Orders</p>
                        <span className="trend positive"><FaArrowUp /> +8%</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon users"><FaUserFriends /></div>
                    <div className="stat-info">
                        <h3>450</h3>
                        <p>New Customers</p>
                        <span className="trend positive"><FaArrowUp /> +12%</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon pending"><MdDeliveryDining /></div>
                    <div className="stat-info">
                        <h3>12</h3>
                        <p>Pending Deliveries</p>
                        <span className="trend neutral"><FaClock /> Active</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid-layout">
                
                <div className="dashboard-left">
                    
                    <div className="dashboard-widget chart-widget">
                        <div className="widget-header">
                            <h2>Revenue Analytics</h2>
                            <select><option>This Week</option><option>Monthly</option></select>
                        </div>
                        <div className="chart-container">
                             {chartData.map((height, i) => (
                                 <div key={i} className="bar-group">
                                     <div className="bar" style={{height: `${height}%`}} title={`₹${height}00`}></div>
                                     <span className="day">{['M','T','W','T','F','S','S'][i]}</span>
                                 </div>
                             ))}
                        </div>
                    </div>

                    <div className="dashboard-widget">
                        <div className="widget-header">
                            <h2>🔥 Most Popular Dishes</h2>
                            <a href="#" className="view-link">View Menu</a>
                        </div>
                        <div className="table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Sold</th>
                                        <th>Revenue</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {popularDishes.map((dish, index) => (
                                        <tr key={index}>
                                            <td><b>{dish.name}</b></td>
                                            <td>{dish.sold}</td>
                                            <td>{dish.revenue}</td>
                                            <td><span className="badge trending">Trending</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="dashboard-widget">
                        <div className="widget-header">
                            <h2>Recent Orders</h2>
                            <a href="#" className="view-link">View All</a>
                        </div>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, i) => (
                                    <tr key={i}>
                                        <td>{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>{order.total}</td>
                                        <td>
                                            <span className={`status-dot ${order.status.toLowerCase()}`}>
                                                {order.status === 'Delivered' ? <FaCheckCircle/> : order.status === 'Cooking' ? <FaClock/> : <FaCircle/>} 
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="dashboard-right">
                    
                    <div className="dashboard-widget">
                        <div className="widget-header">
                            <h2>Staff On Duty</h2>
                        </div>
                        <div className="staff-list">
                            {staffOnDuty.map((staff, i) => (
                                <div key={i} className="staff-item">
                                    <div className="staff-avatar">{staff.name.charAt(0)}</div>
                                    <div className="staff-info">
                                        <h4>{staff.name}</h4>
                                        <p>{staff.role}</p>
                                    </div>
                                    <span className={`staff-badge ${staff.status.toLowerCase()}`}>{staff.status}</span>
                                </div>
                            ))}
                        </div>
                        <button className="widget-btn">Manage Staff</button>
                    </div>

                    <div className="dashboard-widget">
                        <div className="widget-header">
                            <h2>Recent Reviews</h2>
                        </div>
                        <div className="reviews-list">
                            {recentReviews.map((rev, i) => (
                                <div key={i} className="review-item">
                                    <div className="review-top">
                                        <strong>{rev.name}</strong>
                                        <span className="star-rating">{rev.rating} <FaStar /></span>
                                    </div>
                                    <p>"{rev.comment}"</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="dashboard-widget quick-actions">
                         <h2>Quick Actions</h2>
                         <div className="action-buttons">
                             <button><MdOutlineRestaurantMenu /> Add Item</button>
                             <button><FaUserFriends /> Add Staff</button>
                         </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
  )
}

export default AdminDashboard;