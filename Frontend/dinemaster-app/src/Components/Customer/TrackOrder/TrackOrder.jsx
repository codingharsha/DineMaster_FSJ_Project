import React from 'react';
import './TrackOrder.scss';
import { FaCheckCircle, FaMapMarkerAlt, FaMotorcycle, FaUtensils, FaClipboardCheck } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const TrackOrder = () => {
  const { orderId } = useParams();

  const orderDetails = {
    _id: orderId || 'ORD001',
    status: 'Out for delivery',
    items: [
      { name: 'Chicken Biryani', quantity: 1, price: 12 },
      { name: 'Paneer Butter Masala', quantity: 1, price: 10 },
    ],
    amount: 24.0,
    address: {
      street: '123, Gandhi Road',
      city: 'Coimbatore',
      zip: '641001',
    },
    estimatedTime: '25-30 mins',
  };

  const steps = [
    { status: 'Order Placed', icon: FaClipboardCheck },
    { status: 'Food Processing', icon: FaUtensils },
    { status: 'Out for delivery', icon: FaMotorcycle },
    { status: 'Delivered', icon: FaCheckCircle },
  ];

  const currentStepIndex = steps.findIndex((step) => step.status === orderDetails.status);

  return (
    <div className='track-order'>
      <div className="track-header">
        <h2>Track Order</h2>
        <p>Order ID: <span>#{orderDetails._id}</span></p>
      </div>

      <div className="track-container">
        <div className="status-timeline">
          {steps.map((step, index) => (
            <div key={index} className={`timeline-item ${index <= currentStepIndex ? 'active' : ''}`}>
              <div className="timeline-icon">
                <step.icon />
              </div>
              <div className="timeline-content">
                <h4>{step.status}</h4>
                <p>{index <= currentStepIndex ? 'Completed' : 'Pending'}</p>
              </div>
              {index < steps.length - 1 && <div className="timeline-line"></div>}
            </div>
          ))}
        </div>

        <div className="order-summary-card">
          <h3>Delivery Details</h3>
          <div className="info-row">
            <FaMapMarkerAlt className="icon" />
            <div>
              <p className="label">Delivery Address</p>
              <p className="value">{orderDetails.address.street}, {orderDetails.address.city}</p>
            </div>
          </div>

          <div className="info-row">
            <FaMotorcycle className="icon" />
            <div>
              <p className="label">Estimated Time</p>
              <p className="value highlight">{orderDetails.estimatedTime}</p>
            </div>
          </div>

          <hr />

          <div className="item-list">
            {orderDetails.items.map((item, idx) => (
              <div key={idx} className="item-row">
                <span>{item.quantity} x {item.name}</span>
                <span>Rs.{item.price}</span>
              </div>
            ))}
          </div>

          <hr />

          <div className="total-row">
            <span>Total Amount</span>
            <span>Rs.{orderDetails.amount}</span>
          </div>

          <button className="help-btn">Need Help?</button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
