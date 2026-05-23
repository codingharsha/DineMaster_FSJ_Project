import React, { useContext } from 'react';
import './Deals.scss';
import { general_coupons, bank_offers, payment_offers } from '../../../assets/assets';
import { FaCopy, FaPercentage, FaGift } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../../Context/StoreContext';

const Deals = () => {
  const navigate = useNavigate();
  const { applyCoupon, showSuccess } = useContext(StoreContext);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    showSuccess(`${code} copied. Apply it in cart.`);
  };

  const orderNow = (code) => {
    const result = applyCoupon(code);
    if (!result?.valid) {
      showSuccess(result?.message || 'Coupon not eligible right now.');
      return;
    }
    navigate('/cart');
  };

  return (
    <div className='deals-page customer-page-shell'>
      <div className='deals-header-main'>
        <h1>Offers and Coupons</h1>
        <p>Explore the best deals available for you today.</p>
      </div>

      <div className='deals-container'>
        <section className='deals-section'>
          <h2 className='section-title'><FaPercentage /> General Coupons</h2>
          <div className='coupons-grid'>
            {general_coupons.map((offer) => (
              <CouponCard key={offer.id} data={offer} onCopy={copyCode} onOrderNow={orderNow} theme={offer.featured ? 'featured' : 'orange'} />
            ))}
          </div>
        </section>

        <section className='deals-section'>
          <h2 className='section-title'>Smart Offers</h2>
          <div className='coupons-grid'>
            {bank_offers.map((offer) => (
              <CouponCard key={offer.id} data={offer} onCopy={copyCode} onOrderNow={orderNow} theme='blue' hasLogo />
            ))}
          </div>
        </section>

        <section className='deals-section'>
          <h2 className='section-title'><FaGift /> Wallet and Happiness Deals</h2>
          <div className='coupons-grid'>
            {payment_offers.map((offer) => (
              <CouponCard key={offer.id} data={offer} onCopy={copyCode} onOrderNow={orderNow} theme={offer.isSpecial ? 'special' : 'green'} hasLogo />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const CouponCard = ({ data, onCopy, onOrderNow, theme, hasLogo }) => (
  <div className={`coupon-ticket theme-${theme}`}>
    <div className='ticket-stub'>
      <div className='stub-content'>
        {hasLogo ? <img src={data.logo_url} alt='' className='bank-logo' /> : <span>OFFER</span>}
        <div className='vertical-text'>{data.code}</div>
      </div>
    </div>

    <div className='ticket-body'>
      <div className='ticket-info'>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>
      <div className='ticket-actions'>
        <div className='coupon-code-box'>{data.code}</div>
        {data.featured && <span className='featured-badge'>Featured</span>}
        <div className='action-btn-row'>
          <button onClick={() => onCopy(data.code)} className='copy-btn'>COPY <FaCopy /></button>
          <button onClick={() => onOrderNow(data.code)} className='order-now-btn dm-primary-btn'>Order Now</button>
        </div>
      </div>
    </div>

    <div className='punch-hole-top'></div>
    <div className='punch-hole-bottom'></div>
  </div>
);

export default Deals;
