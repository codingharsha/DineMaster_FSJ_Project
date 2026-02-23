import React, { useState, useContext } from 'react';
import { ErrorContext } from "../../../Context/ErrorContext";
import './TableReservation.scss';
import { FaUserFriends, FaChair, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../Context/StoreContext';

const TableReservation = () => {
    const navigate = useNavigate();
    const { addBooking } = useContext(StoreContext);
    const { showError } = useContext(ErrorContext); 

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [partySize, setPartySize] = useState(2);
    const [selectedTable, setSelectedTable] = useState(null);

    const tables = [
        { id: 1, size: 2, status: "available", type: "round", label: "T1" },
        { id: 2, size: 2, status: "unavailable", type: "round", label: "T2" },
        { id: 3, size: 4, status: "available", type: "rect", label: "T3" },
        { id: 4, size: 4, status: "available", type: "rect", label: "T4" },
        { id: 5, size: 6, status: "available", type: "rect", label: "Family" },
        { id: 6, size: 2, status: "available", type: "round", label: "T6" },
        { id: 7, size: 4, status: "available", type: "rect", label: "T7" },
        { id: 11, size: 8, status: "available", type: "rect", label: "P1" }, 
        { id: 13, size: 4, status: "available", type: "rect", label: "T12" },
        { id: 14, size: 2, status: "available", type: "round", label: "T13" },
        { id: 16, size: 4, status: "available", type: "rect", label: "T14" },
    ];

     

    const handleBookingAction = (targetPath) => {
        if(!date || !time || !selectedTable) { 
            showError("Please complete the reservation details first."); 
            return; 
        }
        addBooking({
            table: selectedTable.label,
            size: selectedTable.size,
            date,
            time,
            guests: partySize,
        });
        navigate(targetPath);
    };

   return (
        <div className="reservation-page">
            <div className="res-header">
                <h1>Reserve Your Table</h1>
                <p>A table must be reserved to complete your food order.</p>
            </div>

            <div className="res-main-container">
                <div className="res-card">
                    <h3><FaChair /> Reservation Details</h3>

                    <div className="res-form">
                        <div className="res-input-group">
                            <label><FaCalendarAlt /> Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className="res-input-group">
                            <label><FaClock /> Time</label>
                            <select
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            >
                                <option value="">Select Time</option>
                                <option>07:00 PM</option>
                                <option>08:00 PM</option>
                                <option>09:00 PM</option>
                            </select>
                        </div>

                        <div className="res-input-group">
                            <label><FaUserFriends /> Party Size</label>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={partySize}
                                onChange={(e) => setPartySize(e.target.value)}
                            />
                        </div>
                    </div>

                    {selectedTable && (
                        <div className="res-actions">
                            <p>Table <b>{selectedTable.label}</b> Selected</p>
                            <div className="btn-stack">
                                <button
                                    className="secondary-btn"
                                    onClick={() => handleBookingAction('/order-online')}
                                >
                                    Add Food Items
                                </button>
                                <button
                                    className="primary-btn"
                                    onClick={() => handleBookingAction('/cart')}
                                >
                                    Go to Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="floor-plan-card">
                    <div className="floor-grid">
                        {tables.map((table) => (
                            <div
                                key={table.id}
                                className={`table-box ${table.type} ${table.status} ${
                                    selectedTable?.id === table.id ? 'active' : ''
                                }`}
                                onClick={() =>
                                    table.status === "available" && setSelectedTable(table)
                                }
                            >
                                <span className="lbl">{table.label}</span>
                                <span className="cap">
                                    <FaUserFriends /> {table.size}
                                </span>
                            </div>
                        ))}

                        <div className="entrance-indicator">
                            <div className="door-line"></div>
                            <span>MAIN ENTRANCE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableReservation;