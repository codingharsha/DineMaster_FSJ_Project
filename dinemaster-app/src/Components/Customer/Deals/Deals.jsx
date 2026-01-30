import React from 'react';
import './Deals.css';
import { general_coupons, bank_offers, payment_offers } from '../../../assets/assets';
import { FaCopy, FaPercentage, FaGift } from "react-icons/fa";

const Deals = () => {

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`'${code}' copied to clipboard! Apply it at checkout.`);
  }

  return (
    <div className='deals-page'>
      
      <div className="deals-header-main">
         <h1>Offers & Coupons</h1>
         <p>Explore the best deals available for you today.</p>
      </div>

      <div className="deals-container">
        
        <section className="deals-section">
            <h2 className="section-title"><FaPercentage /> General Coupons</h2>
            <div className="coupons-grid">
                {general_coupons.map((offer) => (
                    <CouponCard key={offer.id} data={offer} onCopy={copyCode} theme="orange"/>
                ))}
            </div>
        </section>

        <section className="deals-section">
            <h2 className="section-title">Bank Offers</h2>
            <div className="coupons-grid">
                {bank_offers.map((offer) => (
                    <CouponCard key={offer.id} data={offer} onCopy={copyCode} theme="blue" hasLogo={true}/>
                ))}
            </div>
        </section>

        <section className="deals-section">
            <h2 className="section-title"><FaGift /> Payment & Wallet Deals</h2>
            <div className="coupons-grid">
                {payment_offers.map((offer) => (
                    <CouponCard key={offer.id} data={offer} onCopy={copyCode} theme={offer.isSpecial ? "special" : "green"} hasLogo={true}/>
                ))}
            </div>
        </section>

      </div>
    </div>
  )
}

const CouponCard = ({ data, onCopy, theme, hasLogo }) => {
    return (
        <div className={`coupon-ticket theme-${theme}`}>
            
            <div className="ticket-stub">
                <div className="stub-content">
                    {hasLogo ? <img src={data.logo_url} alt="" className="bank-logo"/> : <span>OFFER</span>}
                    <div className="vertical-text">{data.code}</div>
                </div>
            </div>

            <div className="ticket-body">
                <div className="ticket-info">
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                </div>
                <div className="ticket-actions">
                    <div className="coupon-code-box">{data.code}</div>
                    <button onClick={() => onCopy(data.code)} className="copy-btn">
                        COPY <FaCopy />
                    </button>
                </div>
            </div>

            <div className="punch-hole-top"></div>
            <div className="punch-hole-bottom"></div>
        </div>
    );
};

export default Deals;