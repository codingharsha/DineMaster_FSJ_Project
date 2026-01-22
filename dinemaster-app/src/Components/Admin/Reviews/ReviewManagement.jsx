import React from 'react';
import AdminSidebar from '../../Admin/Sidebar/AdminSidebar';

const ReviewManagement = () => {
  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />
      <div style={{ marginLeft: '250px', padding: '40px', width: '100%' }}>
        <h1>Customer Reviews</h1>
        <p>Coming Soon: View and Reply to Feedback.</p>
      </div>
    </div>
  );
};
export default ReviewManagement;