import React, { useRef } from 'react'
import './HappinessCards.scss'
import { useNavigate } from 'react-router-dom';

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


const HappinessCards = () => {
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    const slideLeft = () => {
        if(sliderRef.current){
            sliderRef.current.scrollBy({ left: -450, behavior: 'smooth' });
        }
    };

    const slideRight = () =>{
        if(sliderRef.current){
            sliderRef.current.scrollBy({ left: 450, behavior: 'smooth' });
        }
    };

    const cards = [
        {
      id: 1,
      title: "Happiness Gift Card: Date Night Delight",
      price: "1500",
      tag: "Treat For Two",
      color: "#5b9bd5",
      imgUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Happiness Gift Card: Celebration Table",
      price: "7250",
      tag: "Treat For Eight",
      color: "#e06666",
      imgUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Happiness Gift Card: Family Feast Pass",
      price: "4500",
      tag: "Family Pack",
      color: "#ffd966",
      imgUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Happiness Gift Card: Premium Dining Bundle",
      price: "9000",
      tag: "Jumbo Pack",
      color: "#93c47d",
      imgUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Happiness Gift Card: Weekend Brunch Combo",
      price: "3200",
      tag: "Weekend Special",
      color: "#6fa8dc",
      imgUrl: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?q=80&w=1200&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Happiness Gift Card: Coffee & Dessert Duo",
      price: "2100",
      tag: "Cafe Treat",
      color: "#f6b26b",
      imgUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop"
    }
    ];

  return (
    <div className="happiness-section"> 
        <div className="section-header">
            <h2 className="section-title">Happiness Cards</h2>
            <div className="controls">
                <button className="view-all-btn" onClick={() => navigate('/happiness-cards')}>View All</button>
                <button type="button" className="arrow-btn" onClick={slideLeft} aria-label="Scroll left">
                    <FaArrowLeft />
                </button>
                <button type="button" className="arrow-btn" onClick={slideRight} aria-label="Scroll right">
                    <FaArrowRight />
                </button>
            </div>
        </div>

        <div className="cards-slider" ref={sliderRef}>
            {cards.map((card) => (
                <div className="card-item" key={card.id}>
                    <div className="card-image" style={{backgroundImage: `url(${card.imgUrl})`}}>
                        <div className="card-tag">{card.tag}</div>
                        <div className="img-overlay" style={{backgroundColor: card.color, opacity: 0.3}}></div>
                    </div>

                    <div className="card-content">
                        <h3 className='card-title'>{card.title}</h3>
                        <a href="#details" className='view-detail'>View Details</a>

                        <div className="card-footer">
                            <span className='price'>Rs. {card.price}</span>
                            <button className="add-btn">ADD</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default HappinessCards
