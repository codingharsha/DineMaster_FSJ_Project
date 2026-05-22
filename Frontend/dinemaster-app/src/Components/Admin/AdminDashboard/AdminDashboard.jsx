import React, { useContext, useEffect, useState } from 'react';
import './AdminDashboard.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { FaWallet, FaShoppingCart, FaUserFriends, FaArrowUp, FaStar, FaClock } from 'react-icons/fa';
import { MdOutlineRestaurantMenu, MdDeliveryDining } from 'react-icons/md';
import { StoreContext } from '../../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { fetchDashboardStats, fetchTodaySales, fetchAllFeedback, fetchStaff } = useContext(StoreContext);

    const [stats, setStats]           = useState(null);
    const [todaySales, setTodaySales] = useState(null);
    const [recentReviews, setReviews] = useState([]);
    const [staffOnDuty, setStaff]     = useState([]);
    const [loading, setLoading]       = useState(true);
    const [period, setPeriod]         = useState('This Week');
    const chartData = [35, 52, 44, 60, 80, 65, 72];

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role !== "ADMIN") navigate("/");
    }, [navigate]);

    useEffect(() => {
        const load = async () => {
            try {
                const [statsRes, salesRes, feedbackRes, staffRes] = await Promise.all([
                    fetchDashboardStats(),
                    fetchTodaySales(),
                    fetchAllFeedback(),
                    fetchStaff(),
                ]);
                setStats(statsRes.data);
                setTodaySales(salesRes.data);
                setReviews(feedbackRes.data.slice(0, 3));
                setStaff(staffRes.data.filter(s => s.status === 'Active').slice(0, 3));
            } catch (err) {
                console.error("Dashboard load error:", err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [fetchDashboardStats, fetchTodaySales, fetchAllFeedback, fetchStaff]);

    const topDishes = todaySales?.topDishes
        ? Object.entries(todaySales.topDishes).map(([name, sold]) => ({ name, sold }))
        : [];

    if (loading) return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="loading-spinner">Loading dashboard…</div>
            </div>
        </div>
    );

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
                            <h3>₹{todaySales?.totalRevenue?.toLocaleString() ?? stats?.totalRevenueEstimate?.toLocaleString() ?? '–'}</h3>
                            <p>Today's Revenue</p>
                            <span className="trend positive"><FaArrowUp /> Live</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon orders"><FaShoppingCart /></div>
                        <div className="stat-info">
                            <h3>{todaySales?.totalOrders ?? stats?.totalOrdersCount ?? '–'}</h3>
                            <p>Total Orders</p>
                            <span className="trend positive"><FaArrowUp /> +8%</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon users"><FaUserFriends /></div>
                        <div className="stat-info">
                            <h3>{stats?.totalReservationsCount ?? '–'}</h3>
                            <p>Reservations</p>
                            <span className="trend positive"><FaArrowUp /> +12%</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon pending"><MdDeliveryDining /></div>
                        <div className="stat-info">
                            <h3>{stats?.totalMenuCount ?? '–'}</h3>
                            <p>Menu Items</p>
                            <span className="trend neutral"><FaClock /> Active</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid-layout">
                    <div className="dashboard-left">

                        <div className="dashboard-widget chart-widget">
                            <div className="widget-header">
                                <h2>Revenue Analytics</h2>
                                <select value={period} onChange={e => setPeriod(e.target.value)}>
                                    <option>This Week</option>
                                    <option>Monthly</option>
                                </select>
                            </div>
                            <div className="chart-container">
                                {chartData.map((height, i) => (
                                    <div key={i} className="bar-group">
                                        <div className="bar" style={{ height: `${height}%` }} title={`Day ${i + 1}`}></div>
                                        <span className="day">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="dashboard-widget">
                            <div className="widget-header">
                                <h2>🔥 Most Popular Dishes</h2>
                                <a href="/admin/inventory" className="view-link">View Menu</a>
                            </div>
                            <div className="table-wrapper">
                                <table className="admin-table">
                                    <thead>
                                    <tr><th>Item Name</th><th>Sold Today</th><th>Status</th></tr>
                                    </thead>
                                    <tbody>
                                    {topDishes.length > 0 ? topDishes.map((dish, i) => (
                                        <tr key={i}>
                                            <td><b>{dish.name}</b></td>
                                            <td>{dish.sold}</td>
                                            <td><span className="badge trending">Trending</span></td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={3} style={{ textAlign: 'center', color: '#aaa' }}>No data yet today</td></tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-right">
                        <div className="dashboard-widget">
                            <div className="widget-header"><h2>Staff On Duty</h2></div>
                            <div className="staff-list">
                                {staffOnDuty.length > 0 ? staffOnDuty.map((staff, i) => (
                                    <div key={i} className="staff-item">
                                        <div className="staff-avatar">{staff.name?.charAt(0)}</div>
                                        <div className="staff-info">
                                            <h4>{staff.name}</h4>
                                            <p>{staff.role}</p>
                                        </div>
                                        <span className="staff-badge active">{staff.status}</span>
                                    </div>
                                )) : <p style={{ color: '#aaa', padding: '10px 0' }}>No staff data</p>}
                            </div>
                            <button className="widget-btn" onClick={() => navigate('/admin/staff')}>Manage Staff</button>
                        </div>

                        <div className="dashboard-widget">
                            <div className="widget-header"><h2>Recent Reviews</h2></div>
                            <div className="reviews-list">
                                {recentReviews.length > 0 ? recentReviews.map((rev, i) => (
                                    <div key={i} className="review-item">
                                        <div className="review-top">
                                            <strong>{rev.customerName}</strong>
                                            <span className="star-rating">{rev.dishRating} <FaStar /></span>
                                        </div>
                                        <p>"{rev.comment}"</p>
                                    </div>
                                )) : <p style={{ color: '#aaa' }}>No reviews yet</p>}
                            </div>
                        </div>

                        <div className="dashboard-widget quick-actions">
                            <h2>Quick Actions</h2>
                            <div className="action-buttons">
                                <button onClick={() => navigate('/admin/inventory')}><MdOutlineRestaurantMenu /> Add Item</button>
                                <button onClick={() => navigate('/admin/staff')}><FaUserFriends /> Add Staff</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
