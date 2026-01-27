import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'
import HappinessCards from '../HappinessCards/HappinessCards';
import Gallery from '../Gallery/Gallery'
import SizzlingDeals from '../SizzlingDeals/SizzlingDeals';
import OurLocations from '../OurLocations/OurLOcations';
import Footer from '../Footer/Footer';

import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaRegCalendarAlt, FaMotorcycle } from "react-icons/fa";
import { TbCardsFilled } from "react-icons/tb";
import { BiSolidOffer } from "react-icons/bi";

const Home = () => {

    const navigate = useNavigate();
  return (
    <div>
        <div className="hero-section">
            <div className="hero-content">
                <h1 className="hero-headline">
                    Experience the Taste of India. <br />
                    Reserve Your Table Now.
                </h1>
                <div className="booking-widget">
                    <div className="branch-selection">
                        <span className='branch-label'>Select Branch</span>
                        <div className="branch-value">
                            TownHall, Coimbatore <IoIosArrowDown className='arrow-down'/>
                        </div>
                    </div>
                    <button className='reserve-btn'>
                        Reserve a Table <MdOutlineRestaurantMenu/>
                    </button>
                </div>
            </div>

            <div className="features-bar">
                <div className="feature-item">
                    <div className="feature-icon-box"><FaRegCalendarAlt /></div>
                    <div className="feature-text">
                        <h4>Table Booking</h4>
                        <p>No More Waiting</p>
                    </div>
                </div>
                <div className="feature-item" onClick={()=> navigate('/order-online')}>
                    <div className="feature-icon-box"><FaMotorcycle /></div>
                    <div className="feature-text">
                        <h4>Takeaway</h4>
                        <p>Order Online</p>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="feature-icon-box"><TbCardsFilled /></div>
                    <div className="feature-text">
                        <h4>Offer Cards</h4>
                        <p>All in One</p>
                    </div>
                </div>
                <div className="feature-item">
                    <div className="feature-icon-box"><BiSolidOffer /></div>
                    <div className="feature-text">
                        <h4>Offers & Deals</h4>
                        <p>Exclusive Offers</p>
                    </div>
                </div>
            </div>
        </div>

        <HappinessCards />
        <Gallery />
        <SizzlingDeals />
        <OurLocations />
        <Footer />
    </div>
  )
}

export default Home