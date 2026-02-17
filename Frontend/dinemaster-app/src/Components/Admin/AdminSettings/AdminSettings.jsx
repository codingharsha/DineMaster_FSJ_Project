import React, { useState } from 'react';
import './AdminSettings.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { FaSave, FaStore, FaClock, FaPercentage, FaRupeeSign } from 'react-icons/fa';

const AdminSettings = () => {
    
  const [hotelName, setHotelName] = useState("DineMaster");
  
  return (
    <div className="admin-container">
        <AdminSidebar />
        <div className="admin-content">
            <header className="admin-header">
                <h1>⚙️ Restaurant Settings</h1>
            </header>

            <div className="settings-grid">
                
                <div className="setting-card">
                    <div className="s-card-header"><FaStore /> <h3>General Info</h3></div>
                    <div className="form-group">
                        <label>Restaurant Name</label>
                        <input 
                            type="text" 
                            value={hotelName} 
                            onChange={(e) => setHotelName(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact Phone</label>
                        <input type="text" defaultValue="+91 99887 76655" />
                    </div>
                    <div className="form-group">
                        <label>Current Status</label>
                        <select>
                            <option>Open for Business</option>
                            <option>Temporarily Closed</option>
                            <option>Busy (High Wait Time)</option>
                        </select>
                    </div>
                </div>

                <div className="setting-card">
                    <div className="s-card-header"><FaRupeeSign /> <h3>Financials</h3></div>
                    <div className="form-group">
                        <label>GST / Tax Rate (%)</label>
                        <input type="number" defaultValue="5" />
                    </div>
                    <div className="form-group">
                        <label>Service Charge (%)</label>
                        <input type="number" defaultValue="10" />
                    </div>
                    <div className="form-group">
                        <label>Currency</label>
                        <input type="text" value="Indian Rupee (₹)" disabled style={{background:'#eee'}}/>
                    </div>
                </div>

                <div className="setting-card">
                    <div className="s-card-header"><FaClock /> <h3>Operating Hours</h3></div>
                    <div className="hours-row">
                        <span>Weekdays:</span>
                        <input type="time" defaultValue="09:00" /> - <input type="time" defaultValue="22:00" />
                    </div>
                    <div className="hours-row">
                        <span>Weekends:</span>
                        <input type="time" defaultValue="10:00" /> - <input type="time" defaultValue="23:00" />
                    </div>
                </div>

            </div>

            <button className="save-settings-btn" onClick={() => alert(`Settings Saved! Hotel Name is now: ${hotelName}`)}>
                <FaSave /> Save Changes
            </button>
        </div>
    </div>
  )
}

export default AdminSettings;