import React from 'react';
import AdminSidebar from '../../Admin/Sidebar/AdminSidebar';

const MenuManagement = () => {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ marginLeft: '250px', padding: '40px', width: '100%' }}>
        <h1>Menu Management</h1>
        <p>Coming Soon: Add, Edit, and Delete Food Items.</p>
      </div>
    </div>
  );
};
export default MenuManagement;