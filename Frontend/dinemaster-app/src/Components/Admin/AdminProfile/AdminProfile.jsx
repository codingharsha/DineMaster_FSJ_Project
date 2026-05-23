import React, { useMemo, useState } from 'react';
import './AdminProfile.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { FaUserEdit, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaLock, FaShieldAlt } from 'react-icons/fa';

const AdminProfile = () => {
    const name = localStorage.getItem("userName") || "Admin User";
    const [admin, setAdmin] = useState({
        name,
        role: "Administrator",
        email: "admin@dinemaster.com",
        phone: "+91 98765 43210",
        location: "Coimbatore, TN",
        employeeId: "DM-ADM-1024",
        joined: "Jan 12, 2024",
        lastLogin: new Date().toLocaleString(),
        shift: "General Shift",
        branch: "DineMaster Main Branch",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop"
    });
    const [editing, setEditing] = useState(false);

    const stats = useMemo(() => ([
        { label: "Orders Overseen", value: "1,284" },
        { label: "Monthly Revenue Managed", value: "Rs.18.6L" },
        { label: "Staff Supervised", value: "26" },
        { label: "Performance Score", value: "94%" }
    ]), []);

    const permissions = [
        "User Management", "Menu & Pricing", "Financial Reports", "Inventory Controls",
        "Review Moderation", "Payroll Oversight", "Reservation Controls", "Kitchen Operations"
    ];

    const recentActions = [
        "Approved seasonal menu update",
        "Resolved 3 flagged customer reviews",
        "Adjusted service charge settings",
        "Promoted customer to kitchen staff"
    ];

    const updateField = (key, value) => setAdmin((p) => ({ ...p, [key]: value }));

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content">
                <div className="profile-container">
                    <div className="profile-header">
                        <div className="user-intro">
                            <div className="avatar-wrapper"><img src={admin.avatar} alt="Admin" /></div>
                            <div className="intro-text">
                                <h1>{admin.name}</h1>
                                <span className="role-badge">{admin.role}</span>
                                <p style={{ margin: '6px 0 0', color: '#8f9ab0' }}>{admin.branch} | {admin.shift}</p>
                            </div>
                            <div className="header-actions">
                                <button className="secondary-btn"><FaLock /> Change Password</button>
                                <button className="primary-btn" onClick={() => setEditing((e) => !e)}><FaUserEdit /> {editing ? 'Stop Editing' : 'Edit Profile'}</button>
                            </div>
                        </div>
                    </div>

                    <div className="profile-grid">
                        <div className="profile-card">
                            <h3>Personal Information</h3>
                            <div className="info-list">
                                <div className="info-item"><div className="icon"><FaEnvelope /></div><div><label>Email</label>{editing ? <input value={admin.email} onChange={(e) => updateField('email', e.target.value)} /> : <p>{admin.email}</p>}</div></div>
                                <div className="info-item"><div className="icon"><FaPhone /></div><div><label>Phone</label>{editing ? <input value={admin.phone} onChange={(e) => updateField('phone', e.target.value)} /> : <p>{admin.phone}</p>}</div></div>
                                <div className="info-item"><div className="icon"><FaMapMarkerAlt /></div><div><label>Location</label>{editing ? <input value={admin.location} onChange={(e) => updateField('location', e.target.value)} /> : <p>{admin.location}</p>}</div></div>
                                <div className="info-item"><div className="icon"><FaCalendarAlt /></div><div><label>Joined</label><p>{admin.joined}</p></div></div>
                                <div className="info-item"><div className="icon"><FaShieldAlt /></div><div><label>Employee ID</label><p>{admin.employeeId}</p></div></div>
                            </div>
                        </div>

                        <div className="profile-card stats-card">
                            <h3>Operational Stats</h3>
                            <div className="stats-grid">
                                {stats.map((s) => <div key={s.label} className="stat-box"><h2>{s.value}</h2><span>{s.label}</span></div>)}
                            </div>

                            <h3 style={{ marginTop: '24px' }}>Permissions Overview</h3>
                            <div className="tags-container">{permissions.map((p) => <span key={p} className="tag">{p}</span>)}</div>

                            <h3 style={{ marginTop: '24px' }}>Account Activity</h3>
                            <p style={{ color: '#99a5b9' }}>Last Login: {admin.lastLogin}</p>
                            <ul style={{ margin: 0, paddingLeft: 18 }}>
                                {recentActions.map((a) => <li key={a} style={{ marginBottom: 8 }}>{a}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
