import React, { useState, useEffect, useContext, useCallback } from 'react';
import './AdminStaff.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { FaUserPlus, FaTrophy, FaExclamationTriangle, FaEye, FaCalendarCheck, FaTrash, FaTimes } from 'react-icons/fa';
import { StoreContext } from '../../../Context/StoreContext';

const EMPTY_STAFF = {
    name: '', role: '', contact: '', email: '',
    experience: '', joinDate: '', salary: '',
    status: 'Active', performanceScore: 80,
    issuesReported: 0, isEmployeeOfMonth: false,
    nextPaymentDate: 'Feb 1st, 2026', shiftStart: '09:00', shiftEnd: '17:00'
};

const AdminStaff = () => {
    const {
        fetchStaffMembers,
        addStaffMember,
        updateStaffMember,
        deleteStaffMember,
        deleteStaffAccount,
        reportStaffIssue,
        promoteCustomerToStaff,
    } = useContext(StoreContext);

    const [staffList, setStaffList] = useState([]);
    const [selectedStaff, setSelected] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showCreateStaffForm, setShowCreateStaffForm] = useState(false);
    const [formData, setFormData] = useState(EMPTY_STAFF);
    const [newStaffAccount, setNewStaffAccount] = useState({
        customerPhoneNumber: '',
        staffEmail: '',
        temporaryPassword: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [creatingAccount, setCreatingAccount] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const load = useCallback(async () => {
        try {
            const res = await fetchStaffMembers();
            const mappedStaff = (res.data || []).map((staff, index) => ({
                id: staff.id,
                name: staff.name || "Unnamed Staff",
                role: staff.role || "KITCHEN_STAFF",
                contact: staff.mobileNumber || "-",
                email: staff.email || "-",
                status: "Active",
                performanceScore: index === 1 ? 62 : 80,
                issuesReported: index === 1 ? 2 : 0,
                isEmployeeOfMonth: index === 0,
                nextPaymentDate: "1st of every month",
                experience: "N/A",
                joinDate: "N/A",
                salary: 25000,
                shiftStart: "09:00",
                shiftEnd: "17:00"
            }));
            setStaffList(mappedStaff);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [fetchStaffMembers]);

    useEffect(() => { load(); }, [load]);

    const handleSave = async () => {
        setSaving(true);
        try {
            if (formData.id) {
                await updateStaffMember(formData.id, formData);
            } else {
                await addStaffMember({ ...formData, salary: parseFloat(formData.salary) });
            }
            await load();
            setShowForm(false);
            setFormData(EMPTY_STAFF);
        } catch {
            console.error('Error saving staff');
        } finally {
            setSaving(false);
        }
    };

    const handlePromoteStaff = async () => {
        const customerPhoneNumber = newStaffAccount.customerPhoneNumber.trim().replace(/\D/g, '');
        if (!/^\d{10}$/.test(customerPhoneNumber)) {
            console.error('Enter a valid 10-digit customer phone number.');
            return;
        }
        if (!newStaffAccount.staffEmail.trim()) {
            console.error('Please enter staff email.');
            return;
        }
        if (newStaffAccount.temporaryPassword.trim().length < 6) {
            console.error('Temporary password should be at least 6 characters.');
            return;
        }

        setCreatingAccount(true);
        try {
            await promoteCustomerToStaff({
                customerPhoneNumber,
                staffEmail: newStaffAccount.staffEmail.trim(),
                temporaryPassword: newStaffAccount.temporaryPassword,
            });
            setShowCreateStaffForm(false);
            setNewStaffAccount({
                customerPhoneNumber: '',
                staffEmail: '',
                temporaryPassword: '',
            });
        } catch (e) {
            console.error(e);
            if (e?.response?.status === 404) {
                console.error('Promotion endpoint not found. Restart auth-service with latest code to enable /admin/users/promote-staff.');
                return;
            }
            const message = e?.response?.data?.message || 'Failed to promote customer to staff.';
            console.error(message);
        } finally {
            setCreatingAccount(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteStaffAccount(id);
        } catch {
            await deleteStaffMember(id);
        }
        await load();
    };

    const handleReportIssue = async (id) => {
        await reportStaffIssue(id);
        await load();
    };

    const openEdit = (staff) => {
        setFormData(staff);
        setShowForm(true);
    };

    if (loading) return (
        <div className="admin-container"><AdminSidebar />
            <div className="admin-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading staff...</p>
            </div>
        </div>
    );

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content">
                <header className="admin-header">
                    <h1>Staff and Payroll</h1>
                    <button className="add-staff-btn" onClick={() => setShowCreateStaffForm(true)}>
                        <FaUserPlus /> Add a New Staff
                    </button>
                </header>

                <div className="staff-highlights">
                    <div className="highlight-card best">
                        <FaTrophy className="h-icon" />
                        <div>
                            <h3>Employee of the Month</h3>
                            <p>{staffList.find((s) => s.isEmployeeOfMonth)?.name || 'Not Selected'}</p>
                        </div>
                    </div>
                    <div className="highlight-card issues">
                        <FaExclamationTriangle className="h-icon" />
                        <div>
                            <h3>Attention Needed</h3>
                            <p>{staffList.filter((s) => s.issuesReported > 0 || s.performanceScore < 70).length} Staff Members</p>
                        </div>
                    </div>
                    <div className="highlight-card payroll">
                        <FaCalendarCheck className="h-icon" />
                        <div>
                            <h3>Next Auto-Payroll</h3>
                            <p>{staffList[0]?.nextPaymentDate || 'Feb 1st, 2026'}</p>
                        </div>
                    </div>
                </div>

                <div className="report-section">
                    <table className="admin-table">
                        <thead>
                        <tr>
                            <th>Name</th><th>Role</th><th>Performance</th>
                            <th>Status</th><th>Payroll</th><th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {staffList.map((staff) => (
                            <tr key={staff.id} className={staff.issuesReported > 2 ? 'row-warning' : ''}>
                                <td>
                                    <b>{staff.name}</b>
                                    {staff.isEmployeeOfMonth && <span className="badge-star">Star</span>}
                                </td>
                                <td>{staff.role}</td>
                                <td>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{
                                            width: `${staff.performanceScore}%`,
                                            background: staff.performanceScore > 80 ? '#4caf50' : staff.performanceScore < 70 ? '#f44336' : '#ff9800'
                                        }} />
                                    </div>
                                    <span className="score-text">{staff.performanceScore}/100</span>
                                </td>
                                <td><span className={`badge ${staff.status === 'Active' ? 'active-staff' : 'inactive-staff'}`}>{staff.status}</span></td>
                                <td>
                                    <div className="payroll-status">
                                        <span className="auto-pay-badge">Auto-Scheduled</span>
                                        <small>{staff.nextPaymentDate}</small>
                                    </div>
                                </td>
                                <td style={{ display: 'flex', gap: '6px' }}>
                                    <button className="view-btn" onClick={() => setSelected(staff)}><FaEye /></button>
                                    <button className="view-btn" style={{ background: '#f0ad4e' }} onClick={() => openEdit(staff)}>Edit</button>
                                    <button className="view-btn" style={{ background: '#e74c3c' }} onClick={() => setDeleteTarget(staff)}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {selectedStaff && (
                    <div className="modal-overlay" onClick={() => setSelected(null)}>
                        <div className="modal-content staff-modal" onClick={(e) => e.stopPropagation()}>
                            <h2>{selectedStaff.name}</h2>
                            <hr />
                            <div className="staff-details-grid">
                                <p><strong>Role:</strong> {selectedStaff.role}</p>
                                <p><strong>Phone:</strong> {selectedStaff.contact}</p>
                                <p><strong>Email:</strong> {selectedStaff.email}</p>
                                <p><strong>Experience:</strong> {selectedStaff.experience}</p>
                                <p><strong>Joined:</strong> {selectedStaff.joinDate}</p>
                                <p><strong>Salary:</strong> Rs.{Number(selectedStaff.salary).toLocaleString()}/mo</p>
                                <p><strong>Shift:</strong> {selectedStaff.shiftStart} - {selectedStaff.shiftEnd}</p>
                                <p><strong>Issues:</strong> <span style={{ color: selectedStaff.issuesReported > 0 ? 'red' : 'green' }}>{selectedStaff.issuesReported}</span></p>
                            </div>
                            <div className="modal-actions">
                                <button className="close-modal" onClick={() => setSelected(null)}>Close</button>
                                <button className="report-btn" onClick={() => { handleReportIssue(selectedStaff.id); setSelected(null); }}>Report Issue</button>
                            </div>
                        </div>
                    </div>
                )}

                {deleteTarget && (
                    <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
                        <div className="modal-content staff-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
                            <h3>Remove Staff Member</h3>
                            <p>Are you sure you want to remove <b>{deleteTarget.name}</b> from active staff records?</p>
                            <div className="modal-actions">
                                <button className="close-modal" onClick={() => setDeleteTarget(null)}>Cancel</button>
                                <button
                                    className="report-btn"
                                    style={{ background: '#e74c3c' }}
                                    onClick={async () => {
                                        await handleDelete(deleteTarget.id);
                                        setDeleteTarget(null);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showForm && (
                    <div className="modal-overlay" onClick={() => setShowForm(false)}>
                        <div className="modal-content staff-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
                            <div className="modal-header">
                                <h2>{formData.id ? 'Edit Staff' : 'Add New Staff'}</h2>
                                <button className="icon-close-btn" onClick={() => setShowForm(false)}><FaTimes /></button>
                            </div>
                            <hr />
                            <div className="staff-details-grid">
                                {[
                                    { label: 'Full Name', key: 'name' },
                                    { label: 'Role', key: 'role' },
                                    { label: 'Contact', key: 'contact' },
                                    { label: 'Email', key: 'email' },
                                    { label: 'Experience', key: 'experience' },
                                    { label: 'Join Date', key: 'joinDate' },
                                    { label: 'Salary (Rs.)', key: 'salary', type: 'number' },
                                    { label: 'Shift Start', key: 'shiftStart', type: 'time' },
                                    { label: 'Shift End', key: 'shiftEnd', type: 'time' },
                                ].map(({ label, key, type }) => (
                                    <div key={key}>
                                        <label className="field-label">{label}</label>
                                        <input
                                            type={type || 'text'}
                                            value={formData[key] || ''}
                                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="field-label">Status</label>
                                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    >
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="field-label">Performance Score (0-100)</label>
                                    <input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={formData.performanceScore}
                                        onChange={(e) => setFormData({ ...formData, performanceScore: parseInt(e.target.value, 10) })}
                                    />
                                </div>
                            </div>
                            <div className="modal-actions" style={{ marginTop: 16 }}>
                                <button className="close-modal" onClick={() => setShowForm(false)}>Cancel</button>
                                <button className="save-btn"
                                        onClick={handleSave} disabled={saving}>
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showCreateStaffForm && (
                    <div className="modal-overlay" onClick={() => setShowCreateStaffForm(false)}>
                        <div className="modal-content staff-modal staff-form-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>Add a New Staff</h2>
                                <button className="icon-close-btn" onClick={() => setShowCreateStaffForm(false)}>
                                    <FaTimes />
                                </button>
                            </div>
                            <hr />

                            <div className="staff-account-form-grid">
                                <div>
                                    <label className="field-label">
                                        Customer Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={newStaffAccount.customerPhoneNumber}
                                        onChange={(e) => setNewStaffAccount({ ...newStaffAccount, customerPhoneNumber: e.target.value })}
                                        placeholder="9876543210"
                                    />
                                </div>

                                <div>
                                    <label className="field-label">
                                        Staff Email
                                    </label>
                                    <input
                                        type="email"
                                        value={newStaffAccount.staffEmail}
                                        onChange={(e) => setNewStaffAccount({ ...newStaffAccount, staffEmail: e.target.value })}
                                        placeholder="staff@dinemaster.com"
                                    />
                                </div>

                                <div>
                                    <label className="field-label">
                                        Temporary Password
                                    </label>
                                    <input
                                        type="password"
                                        value={newStaffAccount.temporaryPassword}
                                        onChange={(e) => setNewStaffAccount({ ...newStaffAccount, temporaryPassword: e.target.value })}
                                        placeholder="minimum 6 characters"
                                    />
                                </div>

                                <div className="form-helper-text">
                                    Existing customer account will be promoted to KITCHEN_STAFF and forced to change password at first login.
                                </div>
                            </div>

                            <div className="modal-actions" style={{ marginTop: 16 }}>
                                <button className="close-modal" onClick={() => setShowCreateStaffForm(false)}>Cancel</button>
                                <button
                                    className="save-btn"
                                    onClick={handlePromoteStaff}
                                    disabled={creatingAccount}
                                >
                                    {creatingAccount ? 'Creating...' : 'Create Staff Access'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminStaff;

