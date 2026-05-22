import React, { useState, useEffect, useContext } from 'react';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { StoreContext } from '../../../Context/StoreContext';
import { FaArrowUp, FaChartBar, FaUtensils, FaCalendarAlt } from 'react-icons/fa';
import './AdminSalesReport.scss';

const AdminSalesReport = () => {
    const { fetchTodaySales, fetchWeeklySales, fetchMonthlySales } = useContext(StoreContext);

    const [tab, setTab]             = useState('today');
    const [todayData, setToday]     = useState(null);
    const [weekData, setWeek]       = useState([]);
    const [monthData, setMonth]     = useState([]);
    const [loading, setLoading]     = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [t, w, m] = await Promise.all([
                    fetchTodaySales(),
                    fetchWeeklySales(),
                    fetchMonthlySales(),
                ]);
                setToday(t.data);
                setWeek(w.data);
                setMonth(m.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [fetchTodaySales, fetchWeeklySales, fetchMonthlySales]);

    const maxRevenue = (arr) => Math.max(...arr.map(r => r.totalRevenue), 1);

    if (loading) return (
        <div className="admin-container"><AdminSidebar />
            <div className="admin-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading sales data…</p>
            </div>
        </div>
    );

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content">
                <header className="admin-header">
                    <h1>📊 Sales Reports</h1>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {['today', 'weekly', 'monthly'].map(t => (
                            <button key={t}
                                    onClick={() => setTab(t)}
                                    style={{
                                        padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer',
                                        background: tab === t ? '#f26622' : '#f5f5f5',
                                        color: tab === t ? '#fff' : '#333', fontWeight: 600
                                    }}>
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>
                </header>

                {/* TODAY */}
                {tab === 'today' && todayData && (
                    <div>
                        <div className="stats-grid" style={{ marginBottom: 24 }}>
                            <div className="stat-card">
                                <div className="stat-icon revenue"><FaArrowUp /></div>
                                <div className="stat-info">
                                    <h3>₹{todayData.totalRevenue?.toLocaleString()}</h3>
                                    <p>Today's Revenue</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon orders"><FaChartBar /></div>
                                <div className="stat-info">
                                    <h3>{todayData.totalOrders}</h3>
                                    <p>Orders Today</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon users"><FaUtensils /></div>
                                <div className="stat-info">
                                    <h3>{todayData.totalCovers}</h3>
                                    <p>Covers Served</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon pending"><FaCalendarAlt /></div>
                                <div className="stat-info">
                                    <h3>₹{todayData.avgOrderValue?.toFixed(0)}</h3>
                                    <p>Avg Order Value</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            <div className="dashboard-widget">
                                <div className="widget-header"><h2>🔥 Top Dishes Today</h2></div>
                                <table className="admin-table">
                                    <thead><tr><th>Dish</th><th>Units Sold</th></tr></thead>
                                    <tbody>
                                    {Object.entries(todayData.topDishes || {}).map(([dish, sold]) => (
                                        <tr key={dish}>
                                            <td><b>{dish}</b></td>
                                            <td>{sold}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="dashboard-widget">
                                <div className="widget-header"><h2>Revenue by Category</h2></div>
                                <div style={{ padding: '8px 0' }}>
                                    {Object.entries(todayData.revenueByCategory || {}).map(([cat, rev]) => (
                                        <div key={cat} style={{ marginBottom: 14 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                                                <span>{cat}</span>
                                                <span>₹{rev.toFixed(0)}</span>
                                            </div>
                                            <div style={{ background: '#f0f0f0', borderRadius: 4, height: 8 }}>
                                                <div style={{
                                                    width: `${(rev / todayData.totalRevenue) * 100}%`,
                                                    background: '#f26622', borderRadius: 4, height: '100%'
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* WEEKLY */}
                {tab === 'weekly' && (
                    <div className="dashboard-widget">
                        <div className="widget-header"><h2>Weekly Revenue Breakdown</h2></div>
                        {weekData.length === 0
                            ? <p style={{ color: '#aaa', textAlign: 'center', padding: 40 }}>No weekly data available yet.</p>
                            : (
                                <>
                                    <div className="chart-container" style={{ height: 200 }}>
                                        {weekData.map((day, i) => (
                                            <div key={i} className="bar-group">
                                                <div className="bar"
                                                     style={{ height: `${(day.totalRevenue / maxRevenue(weekData)) * 100}%` }}
                                                     title={`₹${day.totalRevenue}`}></div>
                                                <span className="day">{new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <table className="admin-table" style={{ marginTop: 16 }}>
                                        <thead><tr><th>Date</th><th>Orders</th><th>Revenue</th><th>Avg Order</th></tr></thead>
                                        <tbody>
                                        {weekData.map((day, i) => (
                                            <tr key={i}>
                                                <td>{new Date(day.date).toLocaleDateString()}</td>
                                                <td>{day.totalOrders}</td>
                                                <td>₹{day.totalRevenue.toLocaleString()}</td>
                                                <td>₹{day.avgOrderValue?.toFixed(0)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </>
                            )
                        }
                    </div>
                )}

                {/* MONTHLY */}
                {tab === 'monthly' && (
                    <div className="dashboard-widget">
                        <div className="widget-header"><h2>Monthly Revenue Trend</h2></div>
                        {monthData.length === 0
                            ? <p style={{ color: '#aaa', textAlign: 'center', padding: 40 }}>No monthly data available yet.</p>
                            : (
                                <table className="admin-table">
                                    <thead><tr><th>Date</th><th>Orders</th><th>Revenue</th><th>Avg Order</th><th>Covers</th></tr></thead>
                                    <tbody>
                                    {monthData.map((day, i) => (
                                        <tr key={i}>
                                            <td>{new Date(day.date).toLocaleDateString()}</td>
                                            <td>{day.totalOrders}</td>
                                            <td>₹{day.totalRevenue.toLocaleString()}</td>
                                            <td>₹{day.avgOrderValue?.toFixed(0)}</td>
                                            <td>{day.totalCovers}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSalesReport;
