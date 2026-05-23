import React from 'react';
import AdminSidebar from '../AdminSidebar/AdminSidebar';

const AdminPageLayout = ({ children, contentClassName = '' }) => (
    <div className="admin-container">
        <AdminSidebar />
        <div className={`admin-content ${contentClassName}`.trim()}>
            {children}
        </div>
    </div>
);

export default AdminPageLayout;
