import React, { useContext } from 'react';
import './FoodItem.css';
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { StoreContext } from '../../../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image, rating, time, type }) => {
  
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img src={image} alt="" className="food-item-image" />
        </div>

        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <div className="rating-badge">
                   <span>{rating}</span> <FaStar className="star-icon"/>
                </div>
            </div>
            
            <div className="food-meta">
                <span className={`type-badge ${type === 'Veg' ? 'veg' : 'non-veg'}`}>
                    {type === 'Veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                </span>
                <span className="time-badge">⏱ {time}</span>
            </div>

            <p className="food-item-desc">{description}</p>

            <div className="food-item-action">

            <p className="food-item-price">₹{price}</p>
             {!cartItems[id] ? (
                <div className="add-btn" onClick={() => addToCart(id)}>
                   ADD +
                </div>
            ) : (
                <div className="food-item-counter">
                    <div className="counter-btn remove" onClick={() => removeFromCart(id)}>
                        <FaMinus />
                    </div>
                    <p>{cartItems[id]}</p>
                    <div className="counter-btn add" onClick={() => addToCart(id)}>
                        <FaPlus />
                    </div>
                </div>
            )}
            </div>
        </div>
    </div>
  )
}

export default FoodItem;