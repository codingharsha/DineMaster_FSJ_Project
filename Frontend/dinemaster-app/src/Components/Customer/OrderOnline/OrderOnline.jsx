import React, { useContext, useState } from 'react';
import './OrderOnline.scss';
import { StoreContext } from '../../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { useNavigate } from 'react-router-dom';

const OrderOnline = () => {
    const { food_list, getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();
    const [category, setCategory] = useState("All");

    return (
        <div className='order-online'>
            <div className="menu-header">
                <h1>Food Menu</h1>
                <p>Choose from a diverse menu featuring a delectable array of dishes.</p>
                <div className="category-list">
                    {["All", "Rolls", "Salad", "Deserts"].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setCategory(cat)} 
                            className={category === cat ? "active" : ""}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return <FoodItem key={index} id={item._id} name={item.name} 
                                description={item.category} price={item.price} 
                                image={item.image} rating={item.rating} 
                                time={item.time} type={item.type} />;
                    }
                    return null;
                })}
            </div>

            {getTotalCartAmount() > 0 && (
                <div className="floating-cart-bar">
                    <div className="cart-summary">
                        <p>Total Items Value</p>
                        <h3>₹{getTotalCartAmount()}</h3>
                    </div>
                    <button onClick={() => navigate('/table-reservation')}>
                        Choose Your Table &rarr;
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderOnline;