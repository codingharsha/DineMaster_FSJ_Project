import React, { useState } from 'react';
import './AdminStaff.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { FaUserPlus, FaTrophy, FaExclamationTriangle, FaEye, FaCalendarCheck } from 'react-icons/fa';
import { admin_staff_data } from '../../../assets/assets';

const AdminStaff = () => {
    
    const [staffList, setStaffList] = useState(admin_staff_data);
    const [selectedStaff, setSelectedStaff] = useState(null); 

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content">
                <header className="admin-header">
                    <h1>👥 Staff & Payroll</h1>
                    <button className="add-staff-btn"><FaUserPlus /> Add New Staff</button>
                </header>

                <div className="staff-highlights">
                    <div className="highlight-card best">
                        <FaTrophy className="h-icon" />
                        <div>
                            <h3>Employee of the Month</h3>
                            <p>{staffList.find(s => s.isEmployeeOfMonth)?.name || "Not Selected"}</p>
                        </div>
                    </div>
                    <div className="highlight-card issues">
                        <FaExclamationTriangle className="h-icon" />
                        <div>
                            <h3>Attention Needed</h3>
                            <p>{staffList.filter(s => s.issuesReported > 2).length} Staff Members</p>
                        </div>
                    </div>
                    <div className="highlight-card payroll">
                        <FaCalendarCheck className="h-icon" />
                        <div>
                            <h3>Next Auto-Payroll</h3>
                            <p>Feb 1st, 2026</p>
                        </div>
                    </div>
                </div>

                <div className="report-section">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Performance</th>
                                <th>Status</th>
                                <th>Payroll Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffList.map((staff) => (
                                <tr key={staff.id} className={staff.issuesReported > 2 ? "row-warning" : ""}>
                                    <td>
                                        <b>{staff.name}</b>
                                        {staff.isEmployeeOfMonth && <span className="badge-star">⭐ Star</span>}
                                    </td>
                                    <td>{staff.role}</td>
                                    <td>
                                        <div className="progress-bar">
                                            <div 
                                                className="progress-fill" 
                                                style={{width: `₹{staff.performanceScore}%`, background: staff.performanceScore > 80 ? '#4caf50' : staff.performanceScore < 70 ? '#f44336' : '#ff9800'}}
                                            ></div>
                                        </div>
                                        <span className="score-text">{staff.performanceScore}/100</span>
                                    </td>
                                    <td><span className={`badge ₹{staff.status === 'Active' ? 'active-staff' : 'inactive-staff'}`}>{staff.status}</span></td>
                                    <td>
                                        <div className="payroll-status">
                                            <span className="auto-pay-badge">⚡ Auto-Scheduled</span>
                                            <small>{staff.nextPaymentDate}</small>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="view-btn" onClick={() => setSelectedStaff(staff)}><FaEye /> View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedStaff && (
                    <div className="modal-overlay">
                        <div className="modal-content staff-modal">
                            <h2>👤 {selectedStaff.name}</h2>
                            <hr />
                            <div className="staff-details-grid">
                                <p><strong>ID:</strong> {selectedStaff.id}</p>
                                <p><strong>Role:</strong> {selectedStaff.role}</p>
                                <p><strong>Phone:</strong> {selectedStaff.contact}</p>
                                <p><strong>Email:</strong> {selectedStaff.email}</p>
                                <p><strong>Experience:</strong> {selectedStaff.experience}</p>
                                <p><strong>Joined:</strong> {selectedStaff.joinDate}</p>
                                <p><strong>Salary:</strong> ₹{selectedStaff.salary.toLocaleString()}/mo</p>
                                <p><strong>Issues Reported:</strong> <span style={{color: selectedStaff.issuesReported > 0 ? 'red' : 'green'}}>{selectedStaff.issuesReported}</span></p>
                            </div>
                            <div className="modal-actions">
                                <button className="close-modal" onClick={() => setSelectedStaff(null)}>Close</button>
                                <button className="report-btn">Report Issue</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminStaff;