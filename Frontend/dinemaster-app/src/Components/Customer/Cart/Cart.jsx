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
                    <p>Item</p><p>Title</p><p>Price</p><p>Qty</p><p>Total</p><p></p>
                </div>
                <hr />

                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index} className="cart-row">
                                <img src={item.image} alt="" />
                                <p className="item-name">{item.name}</p>
                                <p>₹{item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p className="item-total">₹{item.price * cartItems[item._id]}</p>
                                <FaTrash className="cross" onClick={() => removeFromCart(item._id)} />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {/* RIGHT – CHECKOUT CARD */}
            <div className="checkout-card">
                <h2>Final Checkout</h2>

                {/* TABLE INFO */}
                <div className="table-info">
                    <h4><FaCalendarAlt /> Reservation</h4>
                    {bookingDetails ? (
                        <>
                            <p><FaChair /> Table <b>{bookingDetails.table}</b></p>
                            <span>{bookingDetails.date} • {bookingDetails.time}</span>
                        </>
                    ) : (
                        <button className="assign-btn" onClick={() => navigate('/book-table')}>
                            Assign a Table to Continue
                        </button>
                    )}
                </div>

                {/* BILL */}
                <div className="bill">
                    <div className="bill-row">
                        <span>Food Total</span>
                        <span>₹{getTotalCartAmount()}</span>
                    </div>
                    <div className="bill-row">
                        <span>Reservation Fee</span>
                        <span>₹{bookingDetails ? 50 : 0}</span>
                    </div>
                    <div className="bill-row total">
                        <span>Grand Total</span>
                        <span>₹{getTotalCartAmount() + (bookingDetails ? 50 : 0)}</span>
                    </div>
                </div>

                <button
                    className="pay-btn"
                    disabled={!bookingDetails || getTotalCartAmount() === 0}
                    onClick={() => navigate('/order')}
                >
                    PAY VIA RAZORPAY
                </button>

                <p className="secure-text">🔒 Secure payment powered by Razorpay</p>
            </div>
        </div>
    );
};

export default Cart;