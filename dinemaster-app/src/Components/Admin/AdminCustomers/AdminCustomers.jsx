import React, { useState } from 'react';
import './AdminCustomers.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { FaCrown, FaBan, FaGift, FaSearch } from 'react-icons/fa';
import { admin_customer_data } from '../../../assets/assets';

const AdminCustomers = () => {
    
    const [customers, setCustomers] = useState(admin_customer_data);

    const toggleBlock = (id) => {
        setCustomers(customers.map(c => c.id === id ? {...c, isBlocked: !c.isBlocked} : c));
    };

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content">
                <div className="admin-header">
                    <h1>Customer Insights & Engagement</h1>
                    <p>Manage loyalty tiers and view traffic stats.</p>
                </div>
                <div className="crm-stats-row">
                    <div className="crm-stat-box">
                        <h3>1,240</h3>
                        <p>Total Customers</p>
                    </div>
                    <div className="crm-stat-box">
                        <h3>85%</h3>
                        <p>Returning Rate</p>
                    </div>
                    <div className="crm-stat-box">
                        <h3>45</h3>
                        <p>New this Month</p>
                    </div>
                </div>

                <div className="crm-stats">
                    <div className="crm-card platinum">
                        <h3>Platinum Users</h3>
                        <p>{customers.filter(c => c.tier === 'Platinum').length}</p>
                    </div>
                    <div className="crm-card blocked">
                        <h3>Blocked Users</h3>
                        <p>{customers.filter(c => c.isBlocked).length}</p>
                    </div>
                </div>

                <div className="report-section">
                    <h2>User Rankings</h2>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Tier</th>
                                <th>Total Spent</th>
                                <th>Safety Score</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.sort((a,b) => b.totalSpent - a.totalSpent).map((cust) => (
                                <tr key={cust.id} style={{opacity: cust.isBlocked ? 0.5 : 1}}>
                                    <td>
                                        <b>{cust.name}</b>
                                        <div style={{fontSize:'12px', color:'#888'}}>{cust.email}</div>
                                    </td>
                                    <td>
                                        <span className={`tier-badge ₹{cust.tier.toLowerCase()}`}>
                                            {cust.tier === 'Platinum' && <FaCrown />} {cust.tier}
                                        </span>
                                    </td>
                                    <td>₹{cust.totalSpent.toLocaleString()}</td>
                                    <td>
                                        {cust.safetyFlags > 2 ? <span style={{color:'red'}}>⚠ High Risk</span> : <span style={{color:'green'}}>Safe</span>}
                                    </td>
                                    <td className="action-buttons">
                                        {!cust.isBlocked && (
                                            <button className="loyalty-btn" title="Send Coupon"><FaGift /> Reward</button>
                                        )}
                                        <button 
                                            className={`block-btn ₹{cust.isBlocked ? 'unblock' : 'block'}`}
                                            onClick={() => toggleBlock(cust.id)}
                                        >
                                            {cust.isBlocked ? 'Unblock' : <><FaBan /> Block</>}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminCustomers;