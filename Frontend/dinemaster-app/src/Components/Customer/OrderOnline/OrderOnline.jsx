import React, { useContext, useState } from 'react';
import './OrderOnline.scss';
import { StoreContext } from '../../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { useNavigate } from 'react-router-dom';
import CategorySelectorPopup from '../CategorySelectorPopup/CategorySelectorPopup';

const CATEGORIES = ['All', 'Rolls', 'Salad', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles'];

const OrderOnline = () => {
    const { food_list, getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();
    const [category, setCategory] = useState("All");

    const orderedCategories = CATEGORIES.filter((cat) => cat !== 'All');
    const dynamicCategories = [...new Set(food_list.map((item) => item.category))]
        .filter((cat) => !orderedCategories.includes(cat));
    const categorySequence = [...orderedCategories, ...dynamicCategories];
    const availableCategories = categorySequence.filter((cat) =>
        food_list.some((item) => item.category === cat)
    );

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    return (
        <div className='order-online'>
            <div className="menu-header">
                <h1>Food Menu</h1>
                <p>Choose from a diverse menu featuring a delectable array of dishes.</p>
            </div>

            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return <FoodItem
                            key={index}
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.imgUrl}
                            rating={item.rating || "4.5"}
                            time="30 min"
                            type={item.veg ? "Veg" : "Non-Veg"}
                        />;
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
                    <button onClick={() => navigate('/book-table')}>
                        Choose Your Table &rarr;
                    </button>
                </div>
            )}

            <CategorySelectorPopup
                activeCategory={category}
                categories={availableCategories}
                onCategorySelect={handleCategorySelect}
                bottomOffsetClass={getTotalCartAmount() > 0 ? 'offset-cart' : ''}
            />
        </div>
    );
};

export default OrderOnline;
