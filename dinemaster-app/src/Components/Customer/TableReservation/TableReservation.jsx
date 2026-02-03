import React, { useState, useContext } from 'react';
import './TableReservation.scss';
import { FaUserFriends, FaCalendarAlt, FaClock, FaCheckCircle, FaUtensils, FaChair } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../Context/StoreContext';

const TableReservation = () => {
  
  const navigate = useNavigate();
  const { addBooking } = useContext(StoreContext); 

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [selectedTable, setSelectedTable] = useState(null);
  const [preOrderFood, setPreOrderFood] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const tables = [
      { id: 1, size: 2, status: "available", type: "round", label: "T1" },
      { id: 2, size: 2, status: "unavailable", type: "round", label: "T2" },
      { id: 3, size: 4, status: "available", type: "rect", label: "T3" },
      { id: 4, size: 4, status: "unavailable", type: "rect", label: "T4" },
      { id: 5, size: 6, status: "available", type: "rect", label: "Family" },
      { id: 6, size: 2, status: "available", type: "round", label: "T6" },
      { id: 7, size: 4, status: "available", type: "rect", label: "T7" },
      { id: 8, size: 4, status: "unavailable", type: "rect", label: "T8" },
      { id: 9, size: 2, status: "available", type: "round", label: "T9" },
      { id: 10, size: 6, status: "available", type: "rect", label: "Center" },
      { id: 11, size: 8, status: "available", type: "rect", label: "P1" }, 
      { id: 12, size: 2, status: "unavailable", type: "round", label: "T11" },
      { id: 13, size: 4, status: "available", type: "rect", label: "T12" },
      { id: 14, size: 2, status: "available", type: "round", label: "T13" },
      { id: 15, size: 8, status: "unavailable", type: "rect", label: "P2" }, 
      { id: 16, size: 4, status: "available", type: "rect", label: "T14" },
      { id: 17, size: 4, status: "available", type: "rect", label: "T15" },
      { id: 18, size: 6, status: "available", type: "rect", label: "Window" },
      { id: 19, size: 2, status: "available", type: "round", label: "T17" },
      { id: 20, size: 2, status: "available", type: "round", label: "T18" },
  ];

  const handleTableClick = (table) => {
      if (table.status === "unavailable") return;
      if (table.size < partySize) {
          alert(`This table is too small for ${partySize} people! Please choose a larger table.`);
          return;
      }
      setSelectedTable(table);
  };

  const handleConfirmClick = () => {
      if(!date || !time) { 
          alert("Please select Date and Time"); 
          return; 
      }
      if(!selectedTable) { 
          alert("Please select a table from the floor plan"); 
          return; 
      }
      
      const bookingData = {
          table: selectedTable.label,
          size: selectedTable.size,
          date,
          time,
          guests: partySize,
          type: selectedTable.type
      };

      if(preOrderFood) {
          addBooking(bookingData);
          const confirm = window.confirm(`Table ${selectedTable.label} reserved! Proceed to order food?`);
          if(confirm) navigate('/order-online');
      } else {
          addBooking(bookingData);
          setShowConfirm(true);
      }
  };

  return (
    <div className="reservation-container">
        
        <div className="res-header">
            <h1>Book A Table</h1>
            <p>Select your preferences and choose a table from the floor plan.</p>
        </div>

        <div className="res-content">
            
            <div className="res-filters">
                <h3><FaChair /> Preferences</h3>
                <div className="filter-row">
                    <div className="filter-group half">
                        <label>Date</label>
                        <div className="input-wrapper">
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="filter-group half">
                        <label>Time</label>
                        <div className="input-wrapper">
                            <select value={time} onChange={(e) => setTime(e.target.value)}>
                                <option value="">Select</option>
                                <option>12:00 PM</option>
                                <option>01:00 PM</option>
                                <option>07:00 PM</option>
                                <option>08:00 PM</option>
                                <option>09:00 PM</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="filter-group">
                    <label>Party Size</label>
                    <div className="input-wrapper">
                        <FaUserFriends className="f-icon"/>
                        <input type="number" min="1" max="10" value={partySize} onChange={(e) => setPartySize(e.target.value)} />
                    </div>
                </div>

                <div className="pre-order-section">
                    <label className="checkbox-container">
                        <input type="checkbox" checked={preOrderFood} onChange={(e) => setPreOrderFood(e.target.checked)} />
                        <span className="checkmark"></span>
                        <span className="label-text">Pre-order Food?</span>
                    </label>
                </div>

                <div className="legend">
                    <div className="legend-item"><span className="dot free"></span> Available</div>
                    <div className="legend-item"><span className="dot reserved"></span> Unavailable</div>
                </div>

                {selectedTable && (
                    <div className="selected-info">
                        <div className="selected-text">
                            <h3>Selected: <span className="highlight">{selectedTable.label}</span></h3>
                            <span>({selectedTable.size} People)</span>
                        </div>
                        <button className="confirm-btn" onClick={handleConfirmClick}>
                            {preOrderFood ? "Order Food >" : "Confirm Booking"}
                        </button>
                    </div>
                )}
            </div>

            <div className="floor-plan-wrapper">
                <div className="floor-plan">
                    {tables.map(table => (
                        <div 
                            key={table.id}
                            className={`table-node ${table.type} ${table.status} ${selectedTable?.id === table.id ? 'selected' : ''}`}
                            onClick={() => handleTableClick(table)}
                        >
                            <span className="table-label">{table.label}</span>
                            <span className="table-capacity"><FaUserFriends /> {table.size}</span>
                        </div>
                    ))}
                    <div className="entrance">
                        <span>Main Entrance</span>
                    </div>
                </div>
            </div>
        </div>

        {showConfirm && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <FaCheckCircle className="success-icon" />
                    <h2>Booking Confirmed!</h2>
                    <p style={{color:'#555'}}>Your table <b>{selectedTable?.label}</b> is reserved.</p>
                    <div className="booking-summary">
                        <p><strong>Date:</strong> {date}</p>
                        <p><strong>Time:</strong> {time}</p>
                        <p><strong>Guests:</strong> {partySize}</p>
                    </div>
                    <button onClick={() => window.location.href='/'} className="modal-home-btn">Go to Home</button>
                </div>
            </div>
        )}
    </div>
  )
}

export default TableReservation;