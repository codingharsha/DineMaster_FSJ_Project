import React, { useState } from 'react';
import './OffersPage.css';
import Footer from '../Footer/Footer';
import { FaTags, FaPercent, FaCopy, FaCheck } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";

const OffersPage = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); 
  };

  const offers = [
    {
      id: 1,
      title: "Welcome Feast",
      desc: "Flat ₹150 OFF on your first order above ₹500.",
      code: "WELCOME150",
      type: "New User",
      color: "#f26622"
    },
    {
      id: 2,
      title: "HDFC Bank Offer",
      desc: "Get 15% Instant Discount up to ₹300 on HDFC Credit Cards.",
      code: "HDFC15",
      type: "Bank Offer",
      color: "#1a1a7a"
    },
    {
      id: 3,
      title: "Mid-Week Cravings",
      desc: "Flat 20% OFF on all orders every Wednesday.",
      code: "WED20",
      type: "Wednesday Special",
      color: "#28a745"
    },
    {
      id: 4,
      title: "Unlimited Biryani",
      desc: "Buy 2 Get 1 Free on all Biryani Buckets.",
      code: "BIRYANI3",
      type: "Combo Deal",
      color: "#d9534f"
    },
    {
      id: 5,
      title: "Party Pack",
      desc: "Flat ₹500 OFF on orders above ₹2000.",
      code: "PARTY500",
      type: "Bulk Order",
      color: "#6c757d"
    },
    {
      id: 6,
      title: "Free Dessert",
      desc: "Free Gulab Jamun (2 pcs) with any Family Pack.",
      code: "SWEETFREE",
      type: "Add-on",
      color: "#e0a800"
    }
  ];

  return (
    <div className="offers-page">
      
      <div className="offers-header">
        <div className="oh-content">
          <h1><BiSolidOffer className="oh-icon"/> Sizzling Deals</h1>
          <p>Grab the best discounts and enjoy authentic flavors for less!</p>
        </div>
      </div>

      <div className="offers-container">
        {offers.map((offer, index) => (
          <div className="offer-ticket" key={offer.id}>
            
            <div className="ticket-visual" style={{ backgroundColor: offer.color }}>
               <div className="ticket-type">{offer.type}</div>
               <div className="ticket-circle top"></div>
               <div className="ticket-circle bottom"></div>
               <FaPercent className="big-percent-icon" />
            </div>

            <div className="ticket-content">
               <h3>{offer.title}</h3>
               <p>{offer.desc}</p>
               
               <div className="code-box">
                 <span className="code-text">{offer.code}</span>
                 <button 
                   className={`copy-btn ${copiedIndex === index ? 'copied' : ''}`} 
                   onClick={() => handleCopy(offer.code, index)}
                 >
                   {copiedIndex === index ? <><FaCheck /> Copied</> : <><FaCopy /> Copy</>}
                 </button>
               </div>
               
               <div className="ticket-terms">
                 *T&C Apply. Valid till stocks last.
               </div>
            </div>

          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default OffersPage;