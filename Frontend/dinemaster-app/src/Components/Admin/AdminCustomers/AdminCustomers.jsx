import React, { useEffect, useMemo, useState } from 'react';
import './AdminCustomers.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { FaCrown, FaSearch } from 'react-icons/fa';
import { demoCustomers } from '../adminDemoData';

const AdminCustomers = () => {
    const [query, setQuery] = useState('');
    const [loyaltyFilter, setLoyaltyFilter] = useState('ALL');
    const [liveCustomers, setLiveCustomers] = useState([]);

    useEffect(() => {
        const pull = () => {
            const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            const grouped = bookings.reduce((acc, b) => {
                const key = b.customerPhone || b.userName || b.email || 'Guest Customer';
                if (!acc[key]) {
                    acc[key] = {
                        id: key,
                        name: b.userName || 'Guest Customer',
                        email: b.email || 'customer@dinemaster.com',
                        phone: b.customerPhone || 'N/A',
                        totalOrders: 0,
                        totalSpent: 0,
                        loyalty: 'Silver',
                        favoriteDish: 'Mixed Menu',
                        lastVisit: b.orderedAt || new Date().toISOString(),
                        repeat: false
                    };
                }
                acc[key].totalOrders += 1;
                acc[key].totalSpent += Number(b.paymentAmount || 0);
                acc[key].repeat = acc[key].totalOrders > 1;
                acc[key].lastVisit = b.orderedAt || acc[key].lastVisit;
                acc[key].loyalty = acc[key].totalSpent > 5000 ? 'Platinum' : acc[key].totalSpent > 2500 ? 'Gold' : 'Silver';
                return acc;
            }, {});
            setLiveCustomers(Object.values(grouped));
        };
        pull();
        const timer = setInterval(pull, 8000);
        return () => clearInterval(timer);
    }, []);

    const sourceCustomers = liveCustomers.length > 0 ? liveCustomers : demoCustomers;

    const filtered = useMemo(() => sourceCustomers.filter((c) => {
        const q = query.toLowerCase().trim();
        const matches = !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q);
        const tier = loyaltyFilter === 'ALL' || c.loyalty === loyaltyFilter;
        return matches && tier;
    }), [query, loyaltyFilter, sourceCustomers]);

    const vip = sourceCustomers.filter(c => c.loyalty === 'Platinum').length;
    const inactive = sourceCustomers.filter(c => new Date(c.lastVisit) < new Date(Date.now() - 45 * 86400000)).length;
    const topSpenders = sourceCustomers.filter(c => c.totalSpent > 50000).length;
    const newThisMonth = sourceCustomers.filter(c => new Date(c.lastVisit).getMonth() === new Date().getMonth()).length;
    const repeatCustomers = sourceCustomers.filter((c) => c.repeat).length;
    const avgOrderValue = sourceCustomers.length
        ? Math.round(sourceCustomers.reduce((sum, c) => sum + (c.totalSpent / Math.max(1, c.totalOrders)), 0) / sourceCustomers.length)
        : 0;
    const crmSegments = [
        { title: 'Loyal Champions', count: sourceCustomers.filter((c) => c.loyalty === 'Platinum' && c.repeat).length, note: 'High-value repeat diners' },
        { title: 'At-Risk Guests', count: inactive, note: 'No visit in last 45 days' },
        { title: 'Rising Regulars', count: sourceCustomers.filter((c) => c.loyalty === 'Gold' && c.totalOrders >= 2).length, note: 'Good conversion potential' }
    ];

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content">
                <div className="admin-header">
                    <h1>Customers & CRM Intelligence</h1>
                    <p>Understand loyalty, retention, and spend patterns.</p>
                </div>

                <div className="crm-stats-row">
                    <div className="crm-stat-box"><h3>{vip}</h3><p>VIP Customers</p></div>
                    <div className="crm-stat-box"><h3>{inactive}</h3><p>Inactive Customers</p></div>
                    <div className="crm-stat-box"><h3>{topSpenders}</h3><p>Top Spenders</p></div>
                    <div className="crm-stat-box"><h3>{newThisMonth}</h3><p>New This Month</p></div>
                </div>
                <div className="crm-stats-row secondary">
                    <div className="crm-stat-box"><h3>{repeatCustomers}</h3><p>Repeat Customers</p></div>
                    <div className="crm-stat-box"><h3>Rs.{avgOrderValue.toLocaleString()}</h3><p>Avg Order Value</p></div>
                    <div className="crm-stat-box"><h3>{filtered.length}</h3><p>Visible Records</p></div>
                </div>

                <div className="crm-filter-row report-section">
                    <div className="crm-search-box">
                        <FaSearch />
                        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name/email/phone..." />
                    </div>
                    <select value={loyaltyFilter} onChange={(e) => setLoyaltyFilter(e.target.value)} className="crm-select">
                        <option value="ALL">All Loyalty</option>
                        <option value="Platinum">Platinum</option>
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                        <option value="Bronze">Bronze</option>
                    </select>
                </div>

                <div className="report-section">
                    <h2>Customer Master Table</h2>
                    <table className="admin-table">
                        <thead>
                        <tr>
                            <th>Name</th><th>Contact</th><th>Total Orders</th><th>Total Spending</th><th>Loyalty</th><th>Favorite Dish</th><th>Last Visit</th><th>Repeat</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filtered.map((cust) => (
                            <tr key={cust.id}>
                                <td><b>{cust.name}</b></td>
                                <td>{cust.email}<div style={{ fontSize: 12, color: '#8b94a6' }}>{cust.phone}</div></td>
                                <td>{cust.totalOrders}</td>
                                <td>Rs.{cust.totalSpent.toLocaleString()}</td>
                                <td><span className={`tier-badge ${cust.loyalty.toLowerCase()}`}>{cust.loyalty === 'Platinum' && <FaCrown />} {cust.loyalty}</span></td>
                                <td>{cust.favoriteDish}</td>
                                <td>{new Date(cust.lastVisit).toLocaleDateString()}</td>
                                <td>{cust.repeat ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="report-section">
                    <h2>CRM Segments</h2>
                    <div className="crm-segments-grid">
                        {crmSegments.map((segment) => (
                            <div key={segment.title} className="crm-segment-card">
                                <h4>{segment.title}</h4>
                                <h3>{segment.count}</h3>
                                <p>{segment.note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="report-section" style={{ marginTop: 16 }}>
                    <h2>Customer Activity Timeline</h2>
                    {filtered.slice(0, 4).map((c) => (
                        <div key={`timeline-${c.id}`} style={{ borderLeft: '2px solid #f26622', marginLeft: 8, paddingLeft: 12, marginBottom: 12 }}>
                            <b>{c.name}</b> placed {c.totalOrders} orders and spent Rs.{c.totalSpent.toLocaleString()}. Last visit: {new Date(c.lastVisit).toLocaleDateString()}.
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminCustomers;
