import React, { useContext, useState } from 'react';
import axios from 'axios';
import './TableReservation.scss';
import {
    FaCalendarAlt,
    FaChair,
    FaChevronDown,
    FaClock,
    FaConciergeBell,
    FaStar,
    FaUserFriends,
    FaUsers
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../Context/StoreContext';
import { ErrorContext } from '../../../Context/ErrorContextValue';

const TABLES = {
    leftWindow: [
        { id: 1, size: 2, status: 'available', type: 'round', label: 'L1' },
        { id: 2, size: 2, status: 'unavailable', type: 'round', label: 'L2' },
        { id: 3, size: 4, status: 'available', type: 'cozy', label: 'L3' }
    ],
    rightWindow: [
        { id: 4, size: 2, status: 'available', type: 'round', label: 'R1' },
        { id: 5, size: 2, status: 'available', type: 'round', label: 'R2' },
        { id: 6, size: 4, status: 'unavailable', type: 'cozy', label: 'R3' }
    ],
    bar: [
        { id: 7, size: 2, status: 'available', type: 'round', label: 'B1' },
        { id: 8, size: 2, status: 'available', type: 'round', label: 'B2' },
        { id: 9, size: 2, status: 'unavailable', type: 'round', label: 'B3' },
        { id: 10, size: 2, status: 'available', type: 'round', label: 'B4' }
    ],
    center: [
        { id: 11, size: 4, status: 'available', type: 'cozy', label: 'C1' },
        { id: 12, size: 4, status: 'available', type: 'cozy', label: 'C2' },
        { id: 13, size: 4, status: 'unavailable', type: 'cozy', label: 'C3' },
        { id: 14, size: 6, status: 'available', type: 'family', label: 'C4' },
        { id: 15, size: 6, status: 'available', type: 'family', label: 'C5' },
        { id: 16, size: 4, status: 'available', type: 'cozy', label: 'C6' }
    ],
    vip: [
        { id: 17, size: 6, status: 'available', type: 'family', label: 'VP1' },
        { id: 18, size: 8, status: 'available', type: 'banquet', label: 'VP2' },
        { id: 19, size: 8, status: 'unavailable', type: 'banquet', label: 'VP3' },
        { id: 20, size: 10, status: 'available', type: 'vip', label: 'VIP' }
    ]
};

const TableReservation = ({onReservationSuccess}) => {
    const navigate = useNavigate();
    const { addBooking, getTotalCartAmount } = useContext(StoreContext);
    const { showError } = useContext(ErrorContext);
    const { token } = useContext(StoreContext);

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [partySize, setPartySize] = useState(2);
    const [selectedTable, setSelectedTable] = useState(null);

    const reserveTable = async () => {
        if (!date || !time || partySize < 1 || !selectedTable) {
            showError("Please select date, time, party size and a table");
            return;
        }

        try {
            setLoading(true);
            console.log("TOKEN BEING SENT:", token);
            const response = await axios.post(
                "http://localhost:8083/reservations",
                {
                    date,
                    time,
                    guests: partySize,
                    tableLabel: selectedTable.label
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const reservationId = response.data.reservationId;

            localStorage.setItem("reservationId", reservationId);

            if (onReservationSuccess) {
                onReservationSuccess(reservationId);
            }
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                "Unable to reserve table. Please try again.";

            showError(message);
        } finally {
            setLoading(false);
        }
    };

    const hasFoodInCart = getTotalCartAmount() > 0;

    const handleTableClick = (table) => {
        if (table.status !== 'available') {
            return;
        }

        if (table.size < partySize) {
            showError(`Table ${table.label} seats ${table.size}, which is not enough for ${partySize} guests.`);
            return;
        }

        setSelectedTable(table);
    };

    const handleBookingAction = (targetPath) => {
        if (!date || !time || !selectedTable) {
            showError('Please select date, time, and table before continuing.');
            return;
        }
        addBooking({
            table: selectedTable.label,
            size: selectedTable.size,
            date,
            time,
            guests: partySize
        });

        navigate(targetPath);
    };

    const TableBox = ({ table }) => {
        const tooSmall = table.status === 'available' && table.size < partySize;
        const title = table.status === 'unavailable'
            ? `${table.label} is already booked`
            : tooSmall
                ? `${table.label} seats ${table.size}. Need at least ${partySize}.`
                : `${table.label} - ${table.size} seats - click to select`;

        return (
            <div
                className={`table-box ${table.type} ${table.status} ${selectedTable?.id === table.id ? 'active' : ''} ${tooSmall ? 'too-small' : ''}`}
                onClick={() => handleTableClick(table)}
                title={title}
            >
                <span className="lbl">{table.label}</span>
                <span className="cap">
                    <FaUserFriends /> {table.size}
                </span>
            </div>
        );
    };

    return (
        <div className="reservation-page">
            <div className="res-header">
                <h1>
                    <FaConciergeBell className="header-icon" /> Reserve Your Table
                </h1>
                <p>Reservation is required for checkout. Food items are optional.</p>
            </div>

            <div className="res-main-container">
                <div className="res-card">
                    <h3>
                        <FaChair /> Reservation Details
                    </h3>

                    <div className="res-form">
                        <div className="field-group">
                            <label htmlFor="res-date">
                                <FaCalendarAlt /> Date
                            </label>
                            <div className="input-shell">
                                <input
                                    id="res-date"
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field-group">
                            <label htmlFor="res-time">
                                <FaClock /> Time Slot
                            </label>
                            <div className="input-shell select-shell">
                                <select
                                    id="res-time"
                                    value={time}
                                    onChange={(event) => setTime(event.target.value)}
                                >
                                    <option value="" disabled>Choose a time</option>

                                    <option value="18:00:00">06:00 PM</option>
                                    <option value="19:00:00">07:00 PM</option>
                                    <option value="20:00:00">08:00 PM</option>
                                    <option value="21:00:00">09:00 PM</option>
                                    <option value="22:00:00">10:00 PM</option>
                                </select>
                                <FaChevronDown className="select-arrow" />
                            </div>
                        </div>

                        <div className="field-group">
                            <label htmlFor="res-party">
                                <FaUserFriends /> Party Size
                            </label>
                            <div className="input-shell select-shell">
                                <select
                                    id="res-party"
                                    value={partySize}
                                    onChange={(event) => {
                                        const nextPartySize = Number(event.target.value);
                                        setPartySize(nextPartySize);

                                        if (selectedTable && selectedTable.size < nextPartySize) {
                                            setSelectedTable(null);
                                        }
                                    }}
                                >
                                    {[2, 4, 6, 8, 10].map((size) => (
                                        <option key={size} value={size}>
                                            {size} people
                                        </option>
                                    ))}
                                </select>
                                <FaChevronDown className="select-arrow" />
                            </div>
                        </div>
                    </div>

                    <div className="legend">
                        <span>
                            <span className="dot avail" />
                            Available
                        </span>
                        <span>
                            <span className="dot booked" />
                            Booked
                        </span>
                        <span>
                            <span className="dot sel" />
                            Selected
                        </span>
                    </div>

                    {selectedTable && (
                        <div className="res-actions">
                            <p className="selected-badge">
                                <FaUsers /> Table <b>{selectedTable.label}</b> - {selectedTable.size} seats
                            </p>

                            {!hasFoodInCart && (
                                <p className="no-food-note">
                                    No food items in cart. You can still continue and pay reservation fee only.
                                </p>
                            )}

                            <div className="btn-stack">
                                <button className="sec-btn" onClick={() => handleBookingAction('/order-online')}>
                                    {hasFoodInCart ? 'Update Food Items' : 'Add Food Items (Optional)'}
                                </button>
                                <button
                                    className="pri-btn"
                                    onClick={async () => {
                                        await reserveTable();
                                        handleBookingAction('/cart');
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? 'Reserving...' : 'Proceed to Checkout'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="floor-plan-card">
                    <div className="bar-section">
                        <div className="bar-rail" />
                        <span className="zone-lbl bar-lbl">Bar Counter</span>
                        <div className="bar-tables">
                            {TABLES.bar.map((table) => (
                                <TableBox key={table.id} table={table} />
                            ))}
                        </div>
                    </div>

                    <div className="mid-floor">
                        <div className="win-col left-col">
                            <div className="win-strip left-strip">
                                {[0, 1, 2, 3].map((index) => (
                                    <div key={index} className="win-pane" />
                                ))}
                            </div>
                            <div className="win-inner">
                                <span className="zone-lbl win-lbl">Window</span>
                                {TABLES.leftWindow.map((table) => (
                                    <TableBox key={table.id} table={table} />
                                ))}
                            </div>
                        </div>

                        <div className="center-dining">
                            <span className="zone-lbl dining-lbl">Main Dining</span>
                            <div className="dining-grid">
                                {TABLES.center.map((table) => (
                                    <TableBox key={table.id} table={table} />
                                ))}
                            </div>
                        </div>

                        <div className="win-col right-col">
                            <div className="win-strip right-strip">
                                {[0, 1, 2, 3].map((index) => (
                                    <div key={index} className="win-pane" />
                                ))}
                            </div>
                            <div className="win-inner">
                                <span className="zone-lbl win-lbl">Window</span>
                                {TABLES.rightWindow.map((table) => (
                                    <TableBox key={table.id} table={table} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="vip-room">
                        <div className="vip-header">
                            <FaStar className="vip-star" />
                            <span>Private VIP Lounge</span>
                            <FaStar className="vip-star" />
                        </div>
                        <div className="vip-tables">
                            {TABLES.vip.map((table) => (
                                <TableBox key={table.id} table={table} />
                            ))}
                        </div>
                        <div className="vip-carpet" />
                    </div>

                    <div className="entrance-indicator">
                        <div className="door-line" />
                        <span>MAIN ENTRANCE</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableReservation;
