import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  // 1. Get Tools from Context
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      
      {/* 2. CART ITEMS TABLE */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        
        {food_list.map((item, index) => {
          // Only display if item is in cart
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>
                    <FaTrash />
                  </p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>

      {/* 3. CART TOTALS & PROMO CODE */}
      <div className="cart-bottom">
        
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
              {/* Logic: Free delivery if cart is empty, else ₹40 */}
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

       <div className="cart-promocode">
          <div>
            <p>Have a coupon? Enter it here</p> 
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Coupon Code' /> {/* Changed Placeholder */}
              <button>Apply</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart;