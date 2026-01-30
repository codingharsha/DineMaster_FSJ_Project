import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaCircle, FaChair, FaCalendarAlt, FaClock } from 'react-icons/fa';

const MyOrders = () => {

  const { token, bookings } = useContext(StoreContext); 
  const navigate = useNavigate();
  
  const [view, setView] = useState("orders"); 
  const [orders, setOrders] = useState([]);

  const mockOrders = [
    {
      _id: "ORD001",
      items: [
        { name: "Chicken Biryani", quantity: 2 },
        { name: "Paneer Tikka", quantity: 1 }
      ],
      amount: 850.00,
      status: "Food Processing",
      itemsCount: 3,
      date: "2025-09-20"
    },
    {
      _id: "ORD002",
      items: [
        { name: "Veg Burger", quantity: 1 },
        { name: "Coke", quantity: 2 }
      ],
      amount: 350.00,
      status: "Out for delivery",
      itemsCount: 3,
      date: "2025-09-18"
    },
    {
      _id: "ORD003",
      items: [
        { name: "Masala Dosa", quantity: 2 },
        { name: "Filter Coffee", quantity: 2 }
      ],
      amount: 240.00,
      status: "Delivered",
      itemsCount: 4,
      date: "2025-09-15"
    }
  ];

  useEffect(() => {
    if (token) {
      setOrders(mockOrders); 
    } else {
      setOrders(mockOrders); 
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Activity</h2>

      <div className="order-tabs">
          <button 
            className={view === 'orders' ? 'active' : ''} 
            onClick={() => setView('orders')}
          >
            Food Orders
          </button>
          <button 
            className={view === 'bookings' ? 'active' : ''} 
            onClick={() => setView('bookings')}
          >
            Table Reservations
          </button>
      </div>

      <div className="container">
        
        {view === 'orders' && (
          orders.length > 0 ? orders.map((order, index) => (
            <div key={index} className="my-orders-order">
              <FaBoxOpen className='order-icon' /> 
              
              <div className="order-main-info">
                <p className="order-items-text">
                  {order.items.map((item, idx) => {
                    return idx === order.items.length - 1 
                      ? item.name + " x " + item.quantity
                      : item.name + " x " + item.quantity + ", "
                  })}
                </p>
                <span className="order-date">{order.date}</span>
              </div>
              
              <p className='order-price'>₹{order.amount}.00</p>
              
              <p className='order-status'>
                <FaCircle style={{ 
                    color: order.status === 'Delivered' ? 'green' : 
                           order.status === 'Out for delivery' ? 'orange' : '#f26622',
                    fontSize: '10px',
                    marginRight: '8px'
                }} /> 
                <b>{order.status}</b>
              </p>
              
              <button onClick={() => navigate(`/track-order/${order._id}`)}>Track Order</button>
            </div>
          )) : <p className="empty-state">No food orders yet.</p>
        )}

        {view === 'bookings' && (
            bookings && bookings.length > 0 ? bookings.map((bkg, index) => (
                <div key={index} className="my-orders-order booking-card">
                    
                    <div className="booking-icon-wrapper">
                        <FaChair className='order-icon' style={{color:'#f26622'}} />
                    </div>

                    <div className="booking-details">
                        <h4>Table {bkg.table} <span className="badge">{bkg.type}</span></h4>
                        <p>{bkg.guests} Guests</p>
                    </div>

                    <div className="booking-time">
                        <p><FaCalendarAlt /> {bkg.date}</p>
                        <p><FaClock /> {bkg.time}</p>
                    </div>

                    <p className='order-status'> 
                        <FaCircle style={{color:'green',fontSize:'10px',marginRight:'5px'}}/> 
                        <b>Confirmed</b>
                    </p>

                    <button className="ticket-btn">View Ticket</button>
                </div>
            )) : (
              <div className="empty-state">
                  <p>No table reservations found.</p>
                  <button className="go-book-btn" onClick={() => navigate('/book-table')}>Book a Table Now</button>
              </div>
            )
        )}

      </div>
    </div>
  )
}

export default MyOrders;