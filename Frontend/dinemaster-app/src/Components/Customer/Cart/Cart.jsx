import React, { useContext } from 'react';
import './Cart.scss';
import { StoreContext } from '../../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaChair, FaTrash } from 'react-icons/fa';
import axios from "axios";

const Cart = () => {
    console.log("ENV KEY =", import.meta.env.VITE_RAZORPAY_KEY_ID);

    const { cartItems, food_list, removeFromCart, getTotalCartAmount, bookingDetails } = useContext(StoreContext);
    const navigate = useNavigate();

    const foodTotal = getTotalCartAmount();
    const reservationFee = bookingDetails?.bookingFee ?? (bookingDetails ? 50 : 0);
    const grandTotal = foodTotal + reservationFee;
    const hasFoodItems = food_list.some((item) => cartItems[item._id] > 0);

    const ORDER_SERVICE_URL = "http://localhost:8082";
    const handlePayment = async () => {
        try {
            const response = await axios.post(
                `${ORDER_SERVICE_URL}/orders/place-and-pay`,
                {
                    tableNumber: bookingDetails.table,
                    items: Object.keys(cartItems).map(id => ({
                        foodId: id,
                        quantity: cartItems[id]
                    })),
                }
            );

            const { razorpayOrderId, amount, currency} = response.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount,
                currency,
                order_id: razorpayOrderId,
                name: "DineMaster",
                description: "Table Reservation & Food Order",

                handler: function (response) {
                    navigate("/payment-success", {
                        state: {
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,

                            tableNumber: bookingDetails.table,
                            date: bookingDetails.date,
                            time: bookingDetails.time,
                            amount,

                            items: food_list
                                .filter(item => cartItems[item._id] > 0)
                                .map(item => ({
                                    name: item.name,
                                    price: item.price,
                                    quantity: cartItems[item._id]
                                }))
                        }
                    });
                },
                theme: {
                    color: "#ff4500"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment failed:", error);
            alert("Payment initiation failed");
        }
    };

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Item</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Qty</p>
                    <p>Total</p>
                    <p></p>
                </div>
                <hr />

                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index} className="cart-row">
                                <img src={item.image} alt={item.name} />
                                <p className="item-name">{item.name}</p>
                                <p>Rs.{item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p className="item-total">Rs.{item.price * cartItems[item._id]}</p>
                                <FaTrash className="cross" onClick={() => removeFromCart(item._id)} />
                            </div>
                        );
                    }

                    return null;
                })}

                {!hasFoodItems && (
                    <p className="cart-list-empty">
                        No food items added yet. You can still continue with table reservation checkout.
                    </p>
                )}
            </div>

            <div className="checkout-card">
                <h2>Final Checkout</h2>

                <div className="table-info">
                    <h4>
                        <FaCalendarAlt /> Reservation
                    </h4>

                    {bookingDetails ? (
                        <>
                            <p>
                                <FaChair /> Table <b>{bookingDetails.table}</b>
                            </p>
                            <span>{bookingDetails.date} | {bookingDetails.time}</span>
                        </>
                    ) : (
                        <button className="assign-btn" onClick={() => navigate('/book-table')}>
                            Reserve a Table to Continue
                        </button>
                    )}
                </div>

                <div className="bill">
                    <div className="bill-row">
                        <span>Food Total</span>
                        <span>Rs.{foodTotal}</span>
                    </div>
                    <div className="bill-row">
                        <span>Reservation Fee</span>
                        <span>Rs.{reservationFee}</span>
                    </div>
                    <div className="bill-row total">
                        <span>Grand Total</span>
                        <span>Rs.{grandTotal}</span>
                    </div>
                </div>

                {bookingDetails && foodTotal === 0 && (
                    <p className="cart-empty-note">
                        Food is optional. You are paying reservation fee only.
                    </p>
                )}

                {!bookingDetails && (
                    <p className="no-table-note">
                        Please reserve a table before proceeding to payment.
                    </p>
                )}

                <button
                    disabled={!bookingDetails}
                    onClick={handlePayment}
                >
                    PAY VIA RAZORPAY
                </button>

                <p className="secure-text">Secure payment powered by Razorpay</p>
            </div>
        </div>
    );
};

export default Cart;
