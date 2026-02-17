import React from 'react';
import './SizzlingDeals.scss';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaTicketAlt } from 'react-icons/fa';

const SizzlingDeals = () => {
    const navigate = useNavigate();

    const deals = [
        {
            id: 1,
            title: "New Year Bonanza",
            sub: "Table of 4 @ ₹2799",
            desc: "Includes Starters, Mains & Dessert for 4 people.",
            code: "NY2026",
            theme: "theme-orange",
            discount: "Flat Price"
        },
        {
            id: 2,
            title: "Cheers Unlimited",
            sub: "Unlimited Drinks @ ₹2499",
            desc: "Get unlimited mocktails & cocktails for 2 hours.",
            code: "CHEERS30",
            theme: "theme-blue",
            discount: "Unlimited"
        },
        {
            id: 3,
            title: "Family Feast",
            sub: "Buffet Special",
            desc: "Flat 25% Off on Lunch Buffet this weekend.",
            code: "FAM25",
            theme: "theme-green",
            discount: "25% OFF"
        }
    ];

    return (
        <div className="sizzling-section">
            <div className="section-header">
                <div>
                    <span className="sub-header">Exclusive Offers</span>
                    <h2 className="main-header">Sizzling Deals</h2>
                </div>
                <button className="view-all-btn" onClick={() => navigate('/offers')}>
                    View All Deals <FaArrowRight />
                </button>
            </div>

            <div className="deals-grid">
                {deals.map((deal) => (
                    <div className={`coupon-ticket ${deal.theme}`} key={deal.id}>
                        <div className="ticket-stub">
                            <div className="vertical-text">
                                {deal.discount}
                            </div>
                            <div className="punch-hole-top"></div>
                            <div className="punch-hole-bottom"></div>
                        </div>

                        <div className="ticket-body">
                            <div className="ticket-info">
                                <span className="deal-tag"><FaTicketAlt /> {deal.code}</span>
                                <h3>{deal.title}</h3>
                                <h4>{deal.sub}</h4>
                                <p>{deal.desc}</p>
                            </div>
                            
                            <button className="claim-btn" onClick={() => navigate('/offers')}>
                                Grab It
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SizzlingDeals;