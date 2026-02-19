import React, { useContext } from 'react';
import './Cart.scss';
import { StoreContext } from '../../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaCalendarAlt, FaChair } from "react-icons/fa";

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, bookingDetails } = useContext(StoreContext);
    const navigate = useNavigate();

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p><p>Title</p><p>Price</p><p>Qty</p><p>Total</p><p>Remove</p>
                </div>
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>₹{item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>₹{item.price * cartItems[item._id]}</p>
                                    <p onClick={() => removeFromCart(item._id)} className='cross'><FaTrash /></p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                    return null;
                })}
            </div>

            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Final Checkout</h2>
                    
                    <div className="booking-summary-section">
                        <h3><FaCalendarAlt /> Table Info</h3>
                        {bookingDetails ? (
                            <div className="res-box">
                                <p>Table: <b>{bookingDetails.table}</b></p>
                                <p>{bookingDetails.date} at {bookingDetails.time}</p>
                            </div>
                        ) : (
                            <button className="warn-btn" onClick={() => navigate('/table-reservation')}>
                                ! Assign a Table to Pay
                            </button>
                        )}
                    </div>

                    <div className="bill">
                        <div className="cart-total-details">
                            <p>Food Total</p><p>₹{getTotalCartAmount()}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>Reservation Fee</p><p>₹{bookingDetails ? 50 : 0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Grand Total</b>
                            <b>₹{getTotalCartAmount() + (bookingDetails ? 50 : 0)}</b>
                        </div>
                    </div>
                    <button disabled={!bookingDetails || getTotalCartAmount() === 0} onClick={() => navigate('/order')}>
                        PAY VIA RAZORPAY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;