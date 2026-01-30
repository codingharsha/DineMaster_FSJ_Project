import React, { useRef } from 'react';
import './SizzlingDeals.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const SizzlingDeals = () => {
    
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    const slideLeft = () => {
        if(sliderRef.current) sliderRef.current.scrollBy({left: -400, behavior: 'smooth'});
    };

    const slideRight = () => {
        if(sliderRef.current) sliderRef.current.scrollBy({left: 400, behavior: 'smooth'});
    };

    const deals = [
        {
            id: 1,
            title: "New Year Bonanza | Dine In 4 at an exclusive price",
            img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop", 
            desc: "Enjoy the Dine Master's New Year Bonanza and indulge in an irresistible deal for a table of 4 just @ Rs.2799",
            btnText: "Reserve a Table",
            link: "/book-table"
        },
        {
            id: 2,
            title: "Cheers Unlimited | Get Unlimited Drinks @ Limited Price",
            img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop",
            desc: "Get 30+ varieties of drinks at @249 and to add more joy.....It's Unlimited!",
            btnText: "Reserve a Table",
            link: "/book-table"
        },
        {
            id: 3,
            title: "Family Feast | Flat 25% Off on Buffet",
            img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop", 
            desc: "Bring your family for a lavish lunch buffet and enjoy flat 25% discount this weekend.",
            btnText: "Reserve a Table",
            link: "/book-table"
        }
    ];

    return (
        <div className="sizzling-deals-container">
            
            <div className="deals-header-row">
                <h2>Sizzling Deals (At your Selected Restaurants)</h2>
                <div className="deals-controls">
                    <button className="view-all-text">View All</button>
                    <button className="arrow-circle" onClick={slideLeft}><FaArrowLeft /></button>
                    <button className="arrow-circle" onClick={slideRight}><FaArrowRight /></button>
                </div>
            </div>

            <div className="deals-slider" ref={sliderRef}>
                {deals.map((deal) => (
                    <div className="deal-card" key={deal.id}>
                        <h3 className="deal-title">{deal.title}</h3>
                        
                        <div className="deal-img-wrapper">
                            <img src={deal.img} alt="Deal Banner" />
                        </div>

                        <p className="deal-desc">{deal.desc}</p>

                        <button className="deal-btn" onClick={() => navigate(deal.link)}>
                            {deal.btnText}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SizzlingDeals;