import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../../Context/StoreContext';
import { FaCreditCard, FaGift, FaMoneyBillWave } from "react-icons/fa";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  
  const [paymentMethod, setPaymentMethod] = useState("cod");

  return (
    <form className='place-order'>
      
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First name' />
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder='Email address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b>
            </div>
          </div>
        </div>

        <div className="payment-options">
            <h2>Payment Method</h2>
            
            <div 
                className={`payment-option ₹{paymentMethod === "happiness" ? "selected" : ""}`} 
                onClick={() => setPaymentMethod("happiness")}
            >
                <FaGift className="pay-icon color-orange"/>
                <span>Happiness Card Balance</span>
            </div>

            <div 
                className={`payment-option ₹{paymentMethod === "card" ? "selected" : ""}`} 
                onClick={() => setPaymentMethod("card")}
            >
                <FaCreditCard className="pay-icon"/>
                <span>Credit / Debit Card</span>
            </div>

            <div 
                className={`payment-option ₹{paymentMethod === "cod" ? "selected" : ""}`} 
                onClick={() => setPaymentMethod("cod")}
            >
                <FaMoneyBillWave className="pay-icon"/>
                <span>Cash on Delivery</span>
            </div>
        </div>

        <button type='submit'>PLACE ORDER</button>
      </div>
    </form>
  )
}

export default PlaceOrder;