import React, { useState } from 'react';
import './OrderOnline.css';

import { FaSearch, FaMapMarkerAlt, FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineDeliveryDining, MdOutlineSecurity, MdOutlineRestaurantMenu } from "react-icons/md";
import { BiCurrentLocation } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CgDanger } from "react-icons/cg";
import { FaCircle } from "react-icons/fa"; 

const OrderOnline = () => {
  const [selectedOutlet, setSelectedOutlet] = useState(null); 
  const [vegOnly, setVegOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Recommended");

  const locations = [
    {
      city: "Coimbatore",
      areas: ["TownHall", "Gandhipuram", "Peelamedu", "RS Puram"]
    },
    {
      city: "Chennai",
      areas: ["Anna Nagar", "T-Nagar", "Velachery", "Adyar"]
    },
    {
      city: "Bangalore",
      areas: ["Indiranagar", "Koramangala", "Whitefield"]
    }
  ];

  const categories = ["Recommended", "BBQ Bites", "Biryani Bowls", "Drinks & Desserts"];
  
  const menuItems = [
    {
      id: 1,
      name: "Grilled Chicken Bites (9 Pcs)",
      desc: "Soft and juicy grilled chicken pieces seasoned with mild spices. Tasty, healthy and perfect for snacking.",
      price: 189,
      isVeg: false,
      category: "BBQ Bites",
      img: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      name: "Smoky Chicken Wings (6 Pcs)",
      desc: "Smoky, tender chicken wings coated in mild spices. Juicy, flavourful, and perfect for a quick snack.",
      price: 179,
      isVeg: false,
      category: "BBQ Bites",
      img: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      name: "Paneer Tikka Skewers",
      desc: "Cottage cheese marinated in indian spices and grilled to perfection.",
      price: 210,
      isVeg: true,
      category: "Recommended",
      img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      name: "Royal Mutton Biryani",
      desc: "Authentic hyderabadi style mutton biryani served with raita.",
      price: 350,
      isVeg: false,
      category: "Biryani Bowls",
      img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const displayItems = vegOnly 
    ? menuItems.filter(item => item.isVeg) 
    : menuItems;

  return (
    <div className="order-online-page">
      <div className="order-container">
        
        <div className="order-sidebar">
            
            <div className="veg-toggle-section">
                <span>Veg Only</span>
                <label className="switch">
                    <input type="checkbox" checked={vegOnly} onChange={() => setVegOnly(!vegOnly)} />
                    <span className="slider round"></span>
                </label>
            </div>

            {!selectedOutlet ? (
                <div className="location-list-view">
                    <div className="sidebar-header">
                        <FaMapMarkerAlt /> Select Outlet
                    </div>
                    
                    <div className="gps-location">
                        <BiCurrentLocation className="gps-icon"/>
                        <div>
                            <span className="gps-title">Near Me</span>
                            <span className="gps-desc">Using GPS</span>
                        </div>
                    </div>

                    <div className="sidebar-search">
                        <input type="text" placeholder="Search..." />
                        <FaSearch className="sidebar-search-icon"/>
                    </div>

                    <div className="city-list">
                        {locations.map((loc, idx) => (
                            <div key={idx} className="city-group">
                                <h4 className="city-name">{loc.city}</h4>
                                {loc.areas.map((area, i) => (
                                    <div 
                                      key={i} 
                                      className="area-item" 
                                      onClick={() => setSelectedOutlet(`${area}, ${loc.city}`)}
                                    >
                                        {area}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="category-list-view">
                    <div className="selected-outlet-card" onClick={() => setSelectedOutlet(null)}>
                        <div className="outlet-info">
                            <span className="so-label">Selected Outlet</span>
                            <span className="so-name">{selectedOutlet}</span>
                        </div>
                        <IoIosArrowUp /> 
                    </div>

                    <div className="menu-categories">
                        {categories.map((cat, index) => (
                            <div 
                              key={index} 
                              className={`cat-item ${activeCategory === cat ? 'active-cat' : ''}`}
                              onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        <div className="order-main">
            
            {!selectedOutlet ? (
                <div className="location-placeholder">
                    <div className="placeholder-content">
                        <FaMapMarkerAlt className="big-pin-icon"/>
                        <h2>Select Your Delivery Location</h2>
                        <p>To view the menu and place an order, please choose your delivery location from the sidebar.</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-box">
                            <MdOutlineRestaurantMenu className="f-icon"/>
                            <h4>No Minimum Order</h4>
                            <p>Delivery with no minimum order value</p>
                        </div>
                        <div className="feature-box">
                            <MdOutlineSecurity className="f-icon"/>
                            <h4>Safety First</h4>
                            <p>Ensuring best practices to keep you safe</p>
                        </div>
                        <div className="feature-box">
                            <MdOutlineDeliveryDining className="f-icon"/>
                            <h4>Super Fast Delivery</h4>
                            <p>The quickest way to get things delivered</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="food-menu-container">
                    
                    <div className="menu-search-bar">
                        <FaSearch className="ms-icon"/>
                        <input type="text" placeholder="Search for dishes, sides or desserts..." />
                    </div>

                    <h2 className="menu-category-title">{activeCategory}</h2>

                    <div className="food-items-list">
                        {displayItems.map((item) => (
                            <div className="food-card" key={item.id}>
                                <div className="food-img-container">
                                    <img src={item.img} alt={item.name} />
                                </div>
                                <div className="food-info">
                                    <div className="food-header">
                                        <h3 className="food-name">{item.name}</h3>
                                        <div className={`veg-badge ${item.isVeg ? 'green' : 'red'}`}>
                                            <FaCircle className="dot" />
                                        </div>
                                    </div>
                                    <p className="food-desc">{item.desc}</p>
                                    <span className="read-more">More</span>
                                    
                                    <div className="food-footer">
                                        <span className="food-price">₹{item.price}/-</span>
                                        <button className="add-btn">ADD</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>

      </div>
    </div>
  );
};

export default OrderOnline;