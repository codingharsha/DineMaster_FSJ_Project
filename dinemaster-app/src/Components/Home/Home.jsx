import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Home.css'

import HappinessCards from '../HappinessCards/HappinessCards';
import SizzlingDeals from '../SizzlingDeals/SizzlingDeals';
import Gallery from '../Gallery/Gallery';
import OurLocations from '../OurLocations/OurLocations';
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
            Experience the Royal Sweetness of India.<br />
            Reserve your Table Now
          </h1>

          <div className="booking-widget">
            <div className="branch-selection">
              <span className="branch-label">Select Branch</span>
              <div className="branch-value">
                TownHall, Coimbatore <IoIosArrowDown className="arrow-icon"/>
              </div>
            </div>
            <button className="reserve-btn" onClick={() => navigate('/reservation')}>
              Reserve a Table <MdOutlineRestaurantMenu />
            </button>
          </div>
        </div>

        <div className="features-bar">
          <div className="feature-item">
            <div className="feature-icon-box"><FaRegCalendarAlt /></div>
            <div className="feature-text">
              <h4>Table Booking</h4>
              <p>Skip the wait</p>
            </div>
          </div>

          <div className="feature-item" onClick={() => navigate('/order-online')}>
            <div className="feature-icon-box"><FaMotorcycle /></div>
            <div className="feature-text">
              <h4>Order Online</h4>
              <p>Food to home</p>
            </div>
          </div>

          <div className="feature-item" onClick={()=> navigate('/happiness-cards')}>
            <div className="feature-icon-box"><TbCardsFilled /></div>
            <div className="feature-text">
              <h4>Happiness Cards</h4>
              <p>Combo Master</p>
            </div>
          </div>

          <div className="feature-item" onClick={()=> navigate('/offers')}>
            <div className="feature-icon-box"><BiSolidOffer /></div>
            <div className="feature-text">
              <h4>Offers & Deals</h4>
              <p>Exclusive Offers</p>
            </div>
          </div>

        </div>

      </div>

      <HappinessCards />
      <SizzlingDeals />
      <Gallery />
      <OurLocations />
      <Footer />

    </div>
  )
}

export default Home