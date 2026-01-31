import React, { useState } from 'react';
import './AdminReviews.scss';
import { FaStar, FaRegStar, FaStarHalfAlt, FaUserTie, FaComments, FaArrowLeft, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

const AdminReviews = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const customerReviews = [
        { id: 1, name: "Alice Johnson", rating: 5, date: "2 days ago", text: "Absolutely loved the Biryani! The ambiance was great too.", sentiment: "positive" },
        { id: 2, name: "Rajdeep Singh", rating: 3, date: "5 days ago", text: "Food was good but service was a bit slow during rush hour.", sentiment: "neutral" },
        { id: 3, name: "Maria Garcia", rating: 1, date: "1 week ago", text: "Found a hair in my soup. Very disappointed.", sentiment: "negative" }
    ];

    const staffReports = [
        { id: 1, staff: "Rajesh Kumar (Chef)", type: "Inventory", date: "Today, 10:30 AM", text: "Oven #2 is overheating constantly. Needs repair.", status: "Pending" },
        { id: 2, staff: "Sita Devi (Manager)", type: "Conflict", date: "Yesterday", text: "Customer dispute at Table 5 regarding billing error.", status: "Resolved" }
    ];
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) stars.push(<FaStar key={i} className="star filled" />);
            else stars.push(<FaRegStar key={i} className="star" />);
        }
        return stars;
    };

    return (
        <div className="admin-content">
            <div className="reviews-header">
                <h1>Reports & Reviews Center</h1>
                {activeSection !== 'overview' && (
                    <button className="back-btn" onClick={() => setActiveSection('overview')}>
                        <FaArrowLeft /> Back to Dashboard
                    </button>
                )}
            </div>

            {activeSection === 'overview' && (
                <div className="overview-container">
                    
                    <div className="rating-hero-card">
                        <div className="rating-left">
                            <span className="rating-label">Overall Restaurant Rating</span>
                            <div className="rating-score">
                                4.7 <span className="max-score">/ 5.0</span>
                            </div>
                            <div className="stars-row">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                                <span className="review-count">(1,240 Reviews)</span>
                            </div>
                        </div>
                        <div className="rating-right">
                            <div className="stat-pill positive">
                                <FaCheckCircle /> 92% Positive Feedback
                            </div>
                            <div className="critical-areas">
                                <h4>Areas for Improvement:</h4>
                                <div className="tags">
                                    <span>Wait Time</span>
                                    <span>Parking</span>
                                    <span>Washroom Cleanliness</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="split-cards-row">
                        <div className="category-card customers" onClick={() => setActiveSection('customer')}>
                            <div className="icon-wrapper"><FaComments /></div>
                            <div className="card-info">
                                <h2>Customer Feedback</h2>
                                <p>View ratings, comments, and complaints from dining customers.</p>
                                <div className="mini-stats">
                                    <span><strong>12</strong> New today</span>
                                    <span><strong>3</strong> Critical</span>
                                </div>
                            </div>
                            <button className="enter-btn">View Reviews</button>
                        </div>

                        <div className="category-card staff" onClick={() => setActiveSection('staff')}>
                            <div className="icon-wrapper"><FaUserTie /></div>
                            <div className="card-info">
                                <h2>Staff Reports</h2>
                                <p>Internal logs regarding kitchen equipment, conflicts, and operational issues.</p>
                                <div className="mini-stats">
                                    <span><strong>2</strong> Pending Issues</span>
                                    <span><strong>100%</strong> Attendance</span>
                                </div>
                            </div>
                            <button className="enter-btn">View Reports</button>
                        </div>
                    </div>
                </div>
            )}

            {activeSection === 'customer' && (
                <div className="detail-section animate-fade">
                    <div className="section-title">
                        <h2>Customer Feedback Log</h2>
                        <div className="filter-pills">
                            <button className="active">All</button>
                            <button>Positive</button>
                            <button>Critical</button>
                        </div>
                    </div>
                    <div className="reviews-list">
                        {customerReviews.map(review => (
                            <div key={review.id} className={`review-item ${review.sentiment}`}>
                                <div className="r-head">
                                    <div className="r-user">
                                        <div className="avatar">{review.name.charAt(0)}</div>
                                        <div>
                                            <h4>{review.name}</h4>
                                            <small>{review.date}</small>
                                        </div>
                                    </div>
                                    <div className="r-stars">{renderStars(review.rating)}</div>
                                </div>
                                <p className="r-text">"{review.text}"</p>
                                <div className="r-actions">
                                    <button className="reply-btn">Reply</button>
                                    <button className="flag-btn">Flag</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeSection === 'staff' && (
                <div className="detail-section animate-fade">
                    <div className="section-title">
                        <h2>Internal Staff Reports</h2>
                        <button className="resolve-all-btn">Mark All Read</button>
                    </div>
                    <div className="reports-grid">
                        {staffReports.map(report => (
                            <div key={report.id} className="report-card">
                                <div className="report-header">
                                    <span className={`status-badge ${report.status.toLowerCase()}`}>{report.status}</span>
                                    <small>{report.date}</small>
                                </div>
                                <h3>{report.type} Issue</h3>
                                <p>{report.text}</p>
                                <div className="report-footer">
                                    <span className="reporter-name"><FaUserTie /> {report.staff}</span>
                                    {report.status === 'Pending' && <button className="resolve-btn">Mark Resolved</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminReviews;