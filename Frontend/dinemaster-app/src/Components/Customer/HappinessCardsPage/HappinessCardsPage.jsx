import React, { useContext, useMemo, useRef, useState } from 'react';
import './HappinessCardsPage.scss';
import { gift_cards } from '../../../assets/assets';
import { FaWallet, FaPlusCircle, FaGift, FaHistory, FaCheckCircle, FaFire } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { StoreContext } from '../../../Context/StoreContext';
import { formatINR } from '../../../utils/customerUi';

const HAPPINESS_PACKS = [
  { id: 'hcp-1', title: 'Happiness Gift Card : Treat for 2 - Coimbatore', price: 1500, tag: 'Treat For Two', color: '#5b9bd5', imgUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop' },
  { id: 'hcp-2', title: 'Happiness Gift Card : Treat for 8 - Coimbatore', price: 7250, tag: 'Treat For Eight', color: '#e06666', imgUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600&auto=format&fit=crop' },
  { id: 'hcp-3', title: 'Happiness Gift Card : Family Feast - Chennai', price: 4500, tag: 'Family Pack', color: '#ffd966', imgUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop' },
  { id: 'hcp-4', title: 'Happiness Gift Card : Jumbo Pack - Bangalore', price: 9000, tag: 'Jumbo Pack', color: '#93c47d', imgUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop' }
];

const GIFT_ILLUSTRATION = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&auto=format&fit=crop';
const GIFT_FALLBACK = 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=900&auto=format&fit=crop';

const HappinessCardsPage = () => {
  const [activeTab, setActiveTab] = useState('wallet');
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [giftRecipient, setGiftRecipient] = useState('');
  const [giftName, setGiftName] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [giftAmount, setGiftAmount] = useState('500');
  const [selectedGiftCard, setSelectedGiftCard] = useState(gift_cards[0]);
  const [giftConfirmation, setGiftConfirmation] = useState(null);
  const [addedMap, setAddedMap] = useState({});

  const {
    walletBalance,
    walletTransactions,
    topupWallet,
    addHappinessCardToCart,
    happinessCartItems,
    showSuccess
  } = useContext(StoreContext);

  const sliderRef = useRef(null);

  const markAdded = (key) => {
    setAddedMap((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const addCardWithFeedback = (card, key) => {
    addHappinessCardToCart(card);
    markAdded(key || card.id);
  };

  const slideLeft = () => sliderRef.current?.scrollBy({ left: -450, behavior: 'smooth' });
  const slideRight = () => sliderRef.current?.scrollBy({ left: 450, behavior: 'smooth' });

  const handleRecharge = () => {
    const amount = Number(rechargeAmount);
    if (!amount || amount < 100) {
      showSuccess('Please enter at least Rs.100 for wallet top-up.');
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: 'INR',
      name: 'DineMaster Wallet Top-up',
      description: 'Add money to Happiness Wallet',
      handler: function (responseData) {
        topupWallet(amount, {
          status: 'SUCCESS',
          paymentMethod: 'Razorpay',
          razorpayPaymentId: responseData.razorpay_payment_id,
          reference: responseData.razorpay_payment_id
        });
        setRechargeAmount('');
        showSuccess('Wallet recharged successfully');
      },
      theme: { color: '#f26622' }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleGiftToCart = () => {
    const amount = Number(giftAmount || 0);
    if (!giftName || !giftRecipient || !selectedGiftCard) {
      showSuccess('Please fill recipient details and choose a card.');
      return;
    }
    if (!amount || amount < 100) {
      showSuccess('Gift amount must be at least Rs.100.');
      return;
    }

    const payload = {
      id: `gift-${Date.now()}`,
      title: `${selectedGiftCard.name} Gift Card`,
      price: amount,
      recipientName: giftName,
      recipientContact: giftRecipient,
      message: giftMessage,
      tag: 'Gifted'
    };

    addHappinessCardToCart(payload);
    setGiftConfirmation(payload);

    setGiftRecipient('');
    setGiftName('');
    setGiftMessage('');
    setGiftAmount('500');
  };

  const cartGiftCount = useMemo(
    () => happinessCartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [happinessCartItems]
  );

  return (
    <div className='hc-page customer-page-shell'>
      <div className='hc-header'>
        <h1>Happiness Card</h1>
        <p>Your exclusive digital wallet for seamless payments and authentic flavours.</p>
        <div className='hc-tabs'>
          <button className={activeTab === 'wallet' ? 'active' : ''} onClick={() => setActiveTab('wallet')}><FaWallet /> My Wallet</button>
          <button className={activeTab === 'gift' ? 'active' : ''} onClick={() => setActiveTab('gift')}><FaGift /> Gift a Card</button>
        </div>
      </div>

      <div className='hc-content'>
        {activeTab === 'wallet' && (
          <>
            <div className='wallet-container'>
              <div className='wallet-card-section'>
                <div className='digital-card'>
                  <div className='card-top'><span>DineMaster</span><FaFire className='card-icon-dining' /></div>
                  <div className='card-balance'><small>Available Balance</small><h2>{formatINR(walletBalance)}</h2></div>
                  <div className='card-bottom'><span>PREPAID WALLET</span><span>**** 8892</span></div>
                </div>
                <div className='wallet-benefits'>
                  <p><FaCheckCircle /> One-tap Checkout</p>
                  <p><FaCheckCircle /> Exclusive Cashback</p>
                  <p><FaCheckCircle /> Valid at all Outlets</p>
                </div>
              </div>

              <div className='recharge-section'>
                <h2>Top-up Wallet</h2>
                <p>Add money now to avail festive offers.</p>
                <div className='input-wrap'><span>Rs.</span><input type='number' placeholder='Enter Amount' value={rechargeAmount} onChange={(e) => setRechargeAmount(e.target.value)} /></div>
                <div className='quick-amounts'>
                  <button onClick={() => setRechargeAmount('500')}>+ Rs.500</button>
                  <button onClick={() => setRechargeAmount('1000')}>+ Rs.1000</button>
                  <button onClick={() => setRechargeAmount('2000')}>+ Rs.2000</button>
                </div>
                <button className='recharge-btn dm-primary-btn' onClick={handleRecharge}>ADD MONEY <FaPlusCircle /></button>
              </div>
            </div>

            <div className='hc-seasonal-section'>
              <div className='section-title-wrap'><h3>Explore Festival and Special Editions</h3><p>Limited edition cards with special denominations.</p></div>
              <div className='seasonal-slider'>
                {gift_cards.map((card) => (
                  <div className='seasonal-card-item' key={card.id}>
                    <div className='card-image-wrap'><img src={card.image} alt={card.name} /><span className='card-category-tag'>{card.category}</span></div>
                    <div className='card-details'>
                      <h4>{card.name} Edition</h4>
                      <p>Starting from Rs.500</p>
                      <button className={`view-btn ${addedMap[card.id] ? 'added' : ''}`} onClick={() => addCardWithFeedback({ id: card.id, title: `${card.name} Card`, price: 500, tag: card.category }, card.id)}>
                        {addedMap[card.id] ? 'Added to Cart ✓' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'gift' && (
          <div className='gift-container-simple'>
            <div className='gift-illustration'>
              <img src={GIFT_ILLUSTRATION} alt='Gift card visual' onError={(e) => { e.currentTarget.src = GIFT_FALLBACK; }} />
            </div>
            <div className='gift-form'>
              <h2>Send Happiness</h2>
              <p>Send a digital card directly to their email/SMS.</p>
              <select value={selectedGiftCard?.id} onChange={(e) => setSelectedGiftCard(gift_cards.find((card) => card.id === e.target.value))}>
                {gift_cards.map((card) => <option key={card.id} value={card.id}>{card.name}</option>)}
              </select>
              <input type='text' placeholder="Recipient's Email / Phone" value={giftRecipient} onChange={(e) => setGiftRecipient(e.target.value)} />
              <input type='text' placeholder="Recipient's Name" value={giftName} onChange={(e) => setGiftName(e.target.value)} />
              <input type='number' placeholder='Amount (Rs.)' value={giftAmount} onChange={(e) => setGiftAmount(e.target.value)} />
              <textarea placeholder='Message (Optional)' value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)} />
              <button className='send-gift-btn dm-primary-btn' onClick={handleGiftToCart}>Confirm Gift</button>
              <small>{cartGiftCount} happiness card items currently in cart</small>
            </div>
          </div>
        )}
      </div>

      <div className='happiness-section-added'>
        <div className='section-header-added'>
          <h2 className='section-title'>Special Gift Packs</h2>
          <div className='controls'>
            <button className='view-all-btn' onClick={() => setActiveTab('gift')}>Gift Now</button>
            <div className='arrow-btn' onClick={slideLeft}><FaArrowLeft /></div>
            <div className='arrow-btn' onClick={slideRight}><FaArrowRight /></div>
          </div>
        </div>

        <div className='cards-slider-added' ref={sliderRef}>
          {HAPPINESS_PACKS.map((card) => (
            <div className='card-item' key={card.id}>
              <div className='card-image' style={{ backgroundImage: `url(${card.imgUrl})` }}>
                <div className='card-tag'>{card.tag}</div>
                <div className='img-overlay' style={{ backgroundColor: card.color }}></div>
              </div>
              <div className='card-content'>
                <h3 className='card-title'>{card.title}</h3>
                <span className='view-detail'>View Details</span>
                <div className='card-footer'>
                  <span className='price'>Rs. {card.price}</span>
                  <button className={`add-btn dm-primary-btn ${addedMap[card.id] ? 'added' : ''}`} onClick={() => addCardWithFeedback(card, card.id)}>{addedMap[card.id] ? 'Added ✓' : 'ADD'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='hc-history'>
        <h3><FaHistory /> Recent Wallet Transactions</h3>
        <div className='history-list'>
          {walletTransactions.length === 0 && <p>No wallet transactions yet.</p>}
          {walletTransactions.slice(0, 8).map((txn) => (
            <div className='history-item' key={txn.id}>
              <div className='h-left'><h4>{txn.type}</h4><p>{new Date(txn.createdAt).toLocaleString()} | Ref: {txn.reference}</p></div>
              <div className={`h-right ${txn.direction === 'debit' ? 'debit' : 'credit'}`}>{txn.direction === 'debit' ? '-' : '+'} {formatINR(txn.amount)}</div>
            </div>
          ))}
        </div>
      </div>

      {giftConfirmation && (
        <div className='gift-confirm-overlay' onClick={() => setGiftConfirmation(null)}>
          <div className='gift-confirm-card' onClick={(e) => e.stopPropagation()}>
            <h3>Gift Confirmed</h3>
            <p>Your Happiness Card has been successfully gifted to <b>{giftConfirmation.recipientName}</b>.</p>
            <p><b>Card:</b> {giftConfirmation.title}</p>
            <p><b>Value:</b> {formatINR(giftConfirmation.price)}</p>
            <p><b>Message:</b> {giftConfirmation.message || 'No custom message added.'}</p>
            <p className='delivery-text'>Delivery confirmation has been queued for the recipient contact.</p>
            <button className='send-gift-btn dm-primary-btn' onClick={() => setGiftConfirmation(null)}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HappinessCardsPage;
