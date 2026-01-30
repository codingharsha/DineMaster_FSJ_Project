import React, { useContext } from 'react';
import './Profile.css';
import { StoreContext } from '../../../Context/StoreContext';

const Profile = () => {
  const { userName } = useContext(StoreContext);

  return (
    <div className='profile-page'>
       <div className="profile-container">
           <h1>My Profile</h1>
           <p>Welcome, <b>{userName}</b>. Here you can edit your details.</p>
           <div className="profile-details-placeholder">
               <p>Name: {userName}</p>
               <p>Email: user@example.com</p>
               <p>Phone: +91 98765 43210</p>
               <button className="edit-btn">Edit Details</button>
           </div>
       </div>
    </div>
  )
}

export default Profile;