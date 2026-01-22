import React, { useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { BiShoppingBag } from "react-icons/bi";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Grilled Chicken Bites (9 Pcs)",
      price: 189,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Royal Mutton Biryani",
      price: 350,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=150&q=80"
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const itemTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = itemTotal > 0 ? 40 : 0;
  const platformFee = itemTotal > 0 ? 10 : 0;
  const gst = itemTotal * 0.05; 
  const grandTotal = itemTotal + deliveryFee + platformFee + gst;

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <BiShoppingBag className="empty-icon"/>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <button className="browse-btn" onClick={() => navigate('/order-online')}>
           Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        
        <div className="cart-items-section">
          <div className="cart-header">
             <h2>Shopping Cart <span>({cartItems.length} Items)</span></h2>
          </div>

          <div className="items-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                
                <div className="item-img-box">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <span className="item-price">₹{item.price}</span>
                </div>

                <div className="item-controls">
                   <div className="qty-btn-group">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                   </div>
                   <div className="item-total-price">
                      ₹{item.price * item.quantity}
                   </div>
                   <button className="delete-btn" onClick={() => removeItem(item.id)}>
                      <FaTrash />
                   </button>
                </div>

              </div>
            ))}
          </div>
          
          <button className="back-to-menu" onClick={() => navigate('/order-online')}>
            <FaArrowLeft /> Add more items
          </button>
        </div>

        <div className="cart-summary-section">
           <div className="summary-card">
              <h3>Bill Details</h3>
              
              <div className="bill-row">
                <span>Item Total</span>
                <span>₹{itemTotal}</span>
              </div>
              <div className="bill-row">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="bill-row">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="bill-row">
                <span>GST (5%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>

              <div className="divider"></div>

              <div className="bill-row total">
                <span>TO PAY</span>
                <span>₹{grandTotal.toFixed(0)}</span>
              </div>

              <button className="checkout-btn">
                 PROCEED TO PAY
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;