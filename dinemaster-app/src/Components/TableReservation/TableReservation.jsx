import React, { useState } from 'react';
import './TableReservation.css';
import { BiRestaurant } from "react-icons/bi";
import { MdOutlineFastfood, MdTableRestaurant } from "react-icons/md";

const TableReservation = ({ setShowLogin }) => {
  const [selectedDate, setSelectedDate] = useState(0);
  const [mealType, setMealType] = useState('Lunch');
  const [selectedTime, setSelectedTime] = useState(null);
  const [guests, setGuests] = useState(2);
  
  const [tableSize, setTableSize] = useState(4); 

  const isLoggedIn = localStorage.getItem('token'); 

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  const lunchSlots = ["12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "03:00 PM"];
  const dinnerSlots = ["07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "10:00 PM"];
  const activeSlots = mealType === 'Lunch' ? lunchSlots : dinnerSlots;

  const tableOptions = [
    { size: 4, label: "4 Seater", desc: "Standard Table" },
    { size: 6, label: "6 Seater", desc: "Family Table" },
    { size: 8, label: "8 Seater", desc: "Large Group" },
    { size: 10, label: "10+ Seater", desc: "Party Table" }
  ];

  return (
    <div className="reservation-page">
      <div className="reservation-container">
        
        <div className="res-header">
          <h2 className="page-title">Reserve your Table</h2>
          <div className="header-actions">
            <button className="ghost-btn"><MdOutlineFastfood /> Menu</button>
            <button className="ghost-btn"><BiRestaurant /> Amenities</button>
          </div>
        </div>

        <div className="section-label">Select Date</div>
        <div className="date-slider">
          {dates.map((item, index) => (
            <div key={index} className={`date-card ${selectedDate === index ? 'active-date' : ''}`} onClick={() => setSelectedDate(index)}>
              <span className="day-name">{item.day}</span>
              <span className="day-num">{item.date} {item.month}</span>
            </div>
          ))}
        </div>

        <div className="controls-row">
          <div className="meal-toggle">
            <button className={`toggle-btn ${mealType === 'Lunch' ? 'active-meal' : ''}`} onClick={() => setMealType('Lunch')}>☀ Lunch</button>
            <button className={`toggle-btn ${mealType === 'Dinner' ? 'active-meal' : ''}`} onClick={() => setMealType('Dinner')}>☾ Dinner</button>
          </div>
          <div className="guest-counter">
             <span className="section-label" style={{marginBottom:0, marginRight:'15px'}}>Guests:</span>
             <button onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
             <span>{guests}</span>
             <button onClick={() => setGuests(Math.min(20, guests + 1))}>+</button>
          </div>
        </div>

        <div className="section-label">Select Time Slot</div>
        <div className="time-grid">
          {activeSlots.map((time, index) => (
             <button key={index} className={`time-btn ${selectedTime === time ? 'selected-time' : ''}`} onClick={() => setSelectedTime(time)}>{time}</button>
          ))}
        </div>

        <div className="section-label">Select Table Type</div>
        <div className="table-options-grid">
          {tableOptions.map((option) => (
            <div 
              key={option.size} 
              className={`table-card ${tableSize === option.size ? 'active-table' : ''}`}
              onClick={() => setTableSize(option.size)}
            >
              <div className="table-icon-box">
                <MdTableRestaurant />
              </div>
              <div className="table-info">
                <span className="table-label">{option.label}</span>
                <span className="table-desc">{option.desc}</span>
              </div>
              {tableSize === option.size && <div className="active-dot"></div>}
            </div>
          ))}
        </div>

        <div className="user-details-section">
           {isLoggedIn ? (
             <div className="logged-in-view">
                <div className="section-label">Booking Summary</div>
                <div className="user-summary">
                  <p>Booking for: <strong>Harsha</strong> (Verified)</p>
                  <p className="contact-info">Table: <strong>{tableSize} Seater</strong> | Guests: <strong>{guests}</strong></p>
                </div>
                <textarea placeholder="Any special request? (e.g. Birthday, Corner Table)" className="res-textarea"></textarea>
                <button className="confirm-booking-btn">Confirm Reservation</button>
             </div>
           ) : (
             <div className="login-prompt-box">
                <h3>Please Log In to Reserve</h3>
                <p>We need your details to secure your <strong>{tableSize} Seater</strong> table.</p>
                <button className="login-trigger-btn" onClick={() => setShowLogin(true)}>
                  Log In / Sign Up
                </button>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default TableReservation;