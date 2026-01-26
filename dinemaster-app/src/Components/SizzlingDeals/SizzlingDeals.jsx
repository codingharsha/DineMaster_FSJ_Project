import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SizzlingDeals.css';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const SizzlingDeals = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const slideLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft -= 400;
  };

  const slideRight = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft += 400;
  };

  const deals = [
    {
      id: 1,
      title: "New Year Bonanza | Dine In 4 at an exclusive price",
      imgUrl: "https://images.unsplash.com/photo-1544025162-d76690b67f61?q=80&w=600&auto=format&fit=crop", 
      desc: "Enjoy the Dine Master's New Year Bonanza and indulge in an irresistible deal for a table of 4 just @ Rs.2799",
      btnText: "Reserve a Table"
    },
    {
      id: 2,
      title: "Cheers Unlimited | Get Unlimited Drinks @ Limited Price",
      imgUrl: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?q=80&w=600&auto=format&fit=crop",
      desc: "Get 30+ varieties of drinks at @249 and to add more joy.....It's Unlimited.",
      btnText: "Reserve a Table"
    },
    {
      id: 3,
      title: "Grill and Save Like a Pro – Unbelievable Offers for Students",
      imgUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop",
      desc: "Enjoy the all time lowest prices exclusive for students of all age. Book your table now",
      btnText: "Reserve a Table"
    },
    {
      id: 4,
      title: "Family Weekend Feast | Kids Eat Free",
      imgUrl: "https://images.unsplash.com/photo-1594179047514-992b43a6971a?q=80&w=600&auto=format&fit=crop",
      desc: "Bring the whole family this weekend! Kids under 10 eat free with every main course ordered.",
      btnText: "Reserve a Table"
    }
  ];

  return (
    <div className="deals-section">
      <div className="deals-header">
        <h2 className="deals-title">Sizzling Deals (At your Selected Restaurants)</h2>
        <div className="deals-controls">
          <button className="view-all-btn" onClick={()=> navigate('/offers')}>View All</button>
          <div className="arrow-btn" onClick={slideLeft}><FaArrowLeft /></div>
          <div className="arrow-btn" onClick={slideRight}><FaArrowRight /></div>
        </div>
      </div>

      <div className="deals-slider" ref={sliderRef}>
        {deals.map((deal) => (
          <div className="deal-card" key={deal.id}>
            <h3 className="deal-card-title">{deal.title}</h3>
            <div className="deal-img-container">
               <img src={deal.imgUrl} alt="Deal Banner" className="deal-img" />
            </div>
            <p className="deal-desc">{deal.desc}</p>
            <button className="deal-btn">{deal.btnText}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizzlingDeals;