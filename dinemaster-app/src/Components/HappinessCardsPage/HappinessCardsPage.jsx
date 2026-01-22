import React from 'react';
import './HappinessCardsPage.css';
import Footer from '../Footer/Footer';
import { FaGift, FaUserGraduate, FaBriefcase, FaCrown } from "react-icons/fa";

const HappinessCardsPage = () => {

  const cardCategories = [
    {
      title: "Premium Memberships",
      icon: <FaCrown />,
      description: "Enjoy exclusive perks and priority booking all year round.",
      cards: [
        { id: 1, name: "Gold Tier", price: 4999, discount: "20% OFF", color: "linear-gradient(135deg, #FFD700 0%, #FDB931 100%)", desc: "Unlimited 20% off on dining + Priority Booking" },
        { id: 2, name: "Platinum Tier", price: 9999, discount: "30% OFF", color: "linear-gradient(135deg, #e0e0e0 0%, #a8a8a8 100%)", desc: "Unlimited 30% off + Free Valet + Chef's Special Access" },
      ]
    },
    {
      title: "Student & Youth",
      icon: <FaUserGraduate />,
      description: "Budget-friendly packs for hangouts and study breaks.",
      cards: [
        { id: 3, name: "Campus Squad", price: 499, discount: "Flat ₹500 OFF", color: "#FF6B6B", desc: "Get flat ₹500 off on bills over ₹1500 (Valid 5 times)" },
        { id: 4, name: "Exam Buster", price: 299, discount: "Free Starters", color: "#4ECDC4", desc: "Free Starter on every visit for 1 month" },
        { id: 5, name: "Coffee Club", price: 199, discount: "Unlimited Coffee", color: "#6D214F", desc: "Free bottomless coffee with any main course" },
      ]
    },
    {
      title: "Corporate & Gifting",
      icon: <FaBriefcase />,
      description: "The perfect reward for your employees or loved ones.",
      cards: [
        { id: 6, name: "Bulk Feast", price: 15000, discount: "Team Lunch", color: "#1A535C", desc: "Pre-paid credits for team lunches (Save 15%)" },
        { id: 7, name: "Gift of Joy", price: 1000, discount: "Gift Card", color: "#F26622", desc: "One-time use gift card for your loved ones" },
      ]
    }
  ];

  return (
    <div className="happiness-page">
      
      <div className="hp-header">
        <div className="hp-header-content">
          <h1><FaGift className="header-icon"/> Happiness Cards</h1>
          <p>Unlock exclusive savings, gift the joy of authentic flavors, or treat your team.</p>
        </div>
      </div>

      <div className="hp-content-container">
        {cardCategories.map((cat, index) => (
          <div className="category-section" key={index}>
            
            <div className="cat-header">
              <div className="cat-icon-box">{cat.icon}</div>
              <div>
                <h2 className="cat-title">{cat.title}</h2>
                <p className="cat-desc">{cat.description}</p>
              </div>
            </div>

            <div className="cards-grid">
              {cat.cards.map((card) => (
                <div className="h-card" key={card.id} style={{ background: card.color }}>
                   <div className="card-top">
                     <span className="card-logo">DineMaster</span>
                     <span className="card-price">₹{card.price}</span>
                   </div>
                   
                   <div className="card-mid">
                      <h3>{card.name}</h3>
                      <h1>{card.discount}</h1>
                   </div>

                   <div className="card-bottom">
                      <p>{card.desc}</p>
                      <button className="buy-card-btn">Buy Now</button>
                   </div>
                </div>
              ))}
            </div>

            {index !== cardCategories.length - 1 && <div className="section-divider"></div>}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default HappinessCardsPage;