import React, { useState, useRef } from 'react';
import './HappinessCardsPage.scss';
import { gift_cards } from '../../../assets/assets'; 
import { FaWallet, FaPlusCircle, FaGift, FaHistory, FaCheckCircle, FaUtensils, FaFire } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"; 

const HappinessCardsPage = () => {

  const [activeTab, setActiveTab] = useState("wallet");
  //eslint-disable-next-line no-unused-vars
  const [balance, setBalance] = useState(2450); 
  const [rechargeAmount, setRechargeAmount] = useState("");

  const handleRecharge = () => {
    alert(`Proceeding to add ₹${rechargeAmount} to your Happiness Card...`);
  };

  const sliderRef = useRef(null);

  const slideLeft = () => {
      if(sliderRef.current){
          sliderRef.current.scrollBy({left: -450, behavior: 'smooth'});
      }
  };

  const slideRight = () =>{
      if(sliderRef.current){
          sliderRef.current.scrollBy({left: 450, behavior: 'smooth'});
      }
  };

  const sliderCards = [
      {
        id: 1,
        title: "Happiness Gift Card : Treat for 2 - Coimbatore",
        price: "1500",
        tag: "Treat For Two",
        color: "#5b9bd5",
        imgUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop" 
      },
      {
        id: 2,
        title: "Happiness Gift Card : Treat for 8 - Coimbatore",
        price: "7250",
        tag: "Treat For Eight",
        color: "#e06666",
        imgUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "Happiness Gift Card : Family Feast - Chennai",
        price: "4500",
        tag: "Family Pack",
        color: "#ffd966",
        imgUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: 4,
        title: "Happiness Gift Card : Jumbo Pack - Bangalore",
        price: "9000",
        tag: "Jumbo Pack",
        color: "#93c47d",
        imgUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop"
      }
  ];

  return (
    <div className='hc-page'>
      
      <div className="hc-header">
         <h1>Happiness Card</h1>
         <p>Your exclusive digital wallet for seamless payments and authentic flavours.</p>
         
         <div className="hc-tabs">
             <button 
                className={activeTab === "wallet" ? "active" : ""} 
                onClick={() => setActiveTab("wallet")}
             >
                <FaWallet /> My Wallet
             </button>
             <button 
                className={activeTab === "gift" ? "active" : ""} 
                onClick={() => setActiveTab("gift")}
             >
                <FaGift /> Gift a Card
             </button>
         </div>
      </div>

      <div className="hc-content">
          
          {activeTab === "wallet" && (
              <>
                <div className="wallet-container">
                    
                    <div className="wallet-card-section">
                        <div className="digital-card">
                            <div className="card-top">
                                <span>DineMaster</span>
                                <FaFire className="card-icon-dining"/>
                            </div>
                            <div className="card-balance">
                                <small>Available Balance</small>
                                <h2>₹ {balance.toLocaleString()}</h2>
                            </div>
                            <div className="card-bottom">
                                <span>PREPAID WALLET</span>
                                <span>**** 8892</span>
                            </div>
                        </div>
                        
                        <div className="wallet-benefits">
                            <p><FaCheckCircle /> One-tap Checkout</p>
                            <p><FaCheckCircle /> Exclusive Cashback</p>
                            <p><FaCheckCircle /> Valid at all Outlets</p>
                        </div>
                    </div>

                    <div className="recharge-section">
                        <h2>Top-up Wallet</h2>
                        <p>Add money now to avail festive offers.</p>
                        
                        <div className="input-wrap">
                            <span>₹</span>
                            <input 
                              type="number" 
                              placeholder="Enter Amount" 
                              value={rechargeAmount}
                              onChange={(e) => setRechargeAmount(e.target.value)}
                            />
                        </div>

                        <div className="quick-amounts">
                            <button onClick={() => setRechargeAmount(500)}>+ ₹500</button>
                            <button onClick={() => setRechargeAmount(1000)}>+ ₹1000</button>
                            <button onClick={() => setRechargeAmount(2000)}>+ ₹2000</button>
                        </div>

                        <button className="recharge-btn" onClick={handleRecharge}>
                            ADD MONEY <FaPlusCircle />
                        </button>
                    </div>
                </div>

                <div className="hc-seasonal-section">
                    <div className="section-title-wrap">
                        <h3>Explore Festival & Special Editions</h3>
                        <p>Limited edition cards with special denominations.</p>
                    </div>
                    <div className="seasonal-slider">
                        {gift_cards.map((card, index) => (
                            <div className="seasonal-card-item" key={index}>
                                <div className="card-image-wrap">
                                    <img src={card.image} alt={card.name} />
                                    <span className="card-category-tag">{card.category}</span>
                                </div>
                                <div className="card-details">
                                    <h4>{card.name} Edition</h4>
                                    <p>Starting from ₹500</p>
                                    <button className="view-btn">View Options</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              </>
          )}

          {activeTab === "gift" && (
              <div className="gift-container-simple">
                  <div className="gift-illustration">
                     <img src="https://cdni.iconscout.com/illustration/premium/thumb/giving-gift-to-friend-4392873-3657731.png" alt="" />
                  </div>
                  <div className="gift-form">
                      <h2>Send Happiness</h2>
                      <p>Send a digital card directly to their email/SMS.</p>
                      
                      <input type="email" placeholder="Recipient's Email / Phone" />
                      <input type="text" placeholder="Recipient's Name" />
                      <select>
                          <option>Birthday Card</option>
                          <option>Anniversary Card</option>
                          <option>Best Wishes</option>
                      </select>
                      <input type="number" placeholder="Amount (₹)" />
                      <textarea placeholder="Message (Optional)"></textarea>
                      
                      <button className="send-gift-btn">Proceed to Pay</button>
                  </div>
              </div>
          )}

      </div>
      
      <div className="happiness-section-added"> 
        <div className="section-header-added">
        <h2 className="section-title">Special Gift Packs</h2>
            <div className="controls">
                <button className="view-all-btn">View All</button>
                <div className="arrow-btn" onClick={slideLeft}>
                    <FaArrowLeft />
                </div>
                <div className="arrow-btn" onClick={slideRight}>
                    <FaArrowRight />
                </div>
            </div>
        </div>

        <div className="cards-slider-added" ref={sliderRef}>
            {sliderCards.map((card) => (
                <div className="card-item" key={card.id}>
                    <div className="card-image" style={{backgroundImage: `url(${card.imgUrl})`}}>
                        <div className="card-tag">{card.tag}</div>
                        <div className="img-overlay" style={{backgroundColor: card.color}}></div>
                    </div>

                    <div className="card-content">
                        <h3 className='card-title'>{card.title}</h3>
                        <span className='view-detail'>View Details</span>

                        <div className="card-footer">
                            <span className='price'>Rs. {card.price}</span>
                            <button className="add-btn">ADD</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="hc-history">
          <h3><FaHistory /> Recent Transactions</h3>
          <div className="history-list">
              <div className="history-item">
                  <div className="h-left">
                      <h4>Order #4421</h4>
                      <p>28 Jan, 12:30 PM</p>
                  </div>
                  <div className="h-right debit">- ₹450.00</div>
              </div>
              <div className="history-item">
                  <div className="h-left">
                      <h4>Wallet Recharge</h4>
                      <p>15 Jan, 04:00 PM</p>
                  </div>
                  <div className="h-right credit">+ ₹2,000.00</div>
              </div>
          </div>
      </div>

    </div>
  )
}

export default HappinessCardsPage;