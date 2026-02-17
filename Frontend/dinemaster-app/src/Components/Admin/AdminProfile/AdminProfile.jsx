import React, { useState } from 'react';
import './AdminProfile.scss';
import { FaUserEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaCamera, FaLock } from 'react-icons/fa';

const AdminProfile = () => {
    //eslint-disable-next-line no-unused-vars
    const [admin, setAdmin] = useState({
        name: "Siva Kumar",
        role: "Super Admin",
        email: "admin@dinemaster.com",
        phone: "+91 98765 43210",
        location: "Coimbatore, TN",
        joined: "Jan 12, 2024",
        avatar: "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?w=600&auto=format&fit=crop",
        cover: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
    });

    return (
        <div className="admin-content">
            <div className="profile-container">
                
                <div className="profile-header">
                    <div className="cover-image" style={{backgroundImage: `url(${admin.cover})`}}>
                        <button className="edit-cover-btn"><FaCamera /> Edit Cover</button>
                    </div>
                    <div className="user-intro">
                        <div className="avatar-wrapper">
                            <img src={admin.avatar} alt="Admin" />
                            <button className="edit-avatar-btn"><FaCamera /></button>
                        </div>
                        <div className="intro-text">
                            <h1>{admin.name}</h1>
                            <span className="role-badge">{admin.role}</span>
                        </div>
                        <div className="header-actions">
                            <button className="secondary-btn"><FaLock /> Change Password</button>
                            <button className="primary-btn"><FaUserEdit /> Edit Profile</button>
                        </div>
                    </div>
                </div>

                <div className="profile-grid">
                    
                    <div className="profile-card">
                        <h3>Personal Information</h3>
                        <div className="info-list">
                            <div className="info-item">
                                <div className="icon"><FaEnvelope /></div>
                                <div>
                                    <label>Email Address</label>
                                    <p>{admin.email}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="icon"><FaPhone /></div>
                                <div>
                                    <label>Phone Number</label>
                                    <p>{admin.phone}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="icon"><FaMapMarkerAlt /></div>
                                <div>
                                    <label>Location</label>
                                    <p>{admin.location}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="icon"><FaCalendarAlt /></div>
                                <div>
                                    <label>Joining Date</label>
                                    <p>{admin.joined}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-card stats-card">
                        <h3>Account Overview</h3>
                        <div className="stats-grid">
                            <div className="stat-box">
                                <h2>12</h2>
                                <span>Pending Tasks</span>
                            </div>
                            <div className="stat-box">
                                <h2>1.2k</h2>
                                <span>Orders Managed</span>
                            </div>
                            <div className="stat-box">
                                <h2>4.8</h2>
                                <span>Avg Rating</span>
                            </div>
                            <div className="stat-box">
                                <h2>15</h2>
                                <span>Staff Under</span>
                            </div>
                        </div>

                        <h3 style={{marginTop: '30px'}}>System Permissions</h3>
                        <div className="tags-container">
                            <span className="tag">User Management</span>
                            <span className="tag">Menu Editing</span>
                            <span className="tag">Financial Reports</span>
                            <span className="tag">Inventory Control</span>
                            <span className="tag">Refund Processing</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminProfile;