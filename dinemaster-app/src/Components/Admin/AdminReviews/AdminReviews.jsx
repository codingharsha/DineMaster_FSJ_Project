import React, { useState } from 'react';
import './AdminReviews.css';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { admin_reviews_data } from '../../../assets/assets';

const AdminReviews = () => {
    
    const [reviews, setReviews] = useState(admin_reviews_data);
    const [filter, setFilter] = useState("All");

    const filteredReviews = filter === "All" ? reviews : reviews.filter(r => r.type.includes(filter));

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content">
                <header className="admin-header">
                    <h1>📢 Reviews & Reports Center</h1>
                </header>

                <div className="filter-tabs">
                    <button className={filter === "All" ? "active" : ""} onClick={() => setFilter("All")}>All</button>
                    <button className={filter === "Customer" ? "active" : ""} onClick={() => setFilter("Customer")}>Customer Feedback</button>
                    <button className={filter === "Staff" ? "active" : ""} onClick={() => setFilter("Staff")}>Staff Reports</button>
                </div>

                <div className="reviews-list">
                    {filteredReviews.map((item) => (
                        <div key={item.id} className={`review-card ₹{item.sentiment.toLowerCase()}`}>
                            <div className="r-header">
                                <span className="r-type">{item.type}</span>
                                <span className="r-date">{item.date}</span>
                            </div>
                            <h3>{item.content}</h3>
                            <div className="r-footer">
                                <span>Author: <b>{item.author}</b></span>
                                {item.target && <span>Target: <b style={{color:'red'}}>{item.target}</b></span>}
                            </div>
                            <div className="r-actions">
                                <button>Resolve</button>
                                <button>Dismiss</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminReviews;