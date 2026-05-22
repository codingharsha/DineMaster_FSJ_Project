import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.scss'
import HappinessCards from '../HappinessCards/HappinessCards';
import Gallery from '../Gallery/Gallery'
import SizzlingDeals from '../SizzlingDeals/SizzlingDeals';
import OurLocations from '../OurLocations/OurLOcations';
import Footer from '../Footer/Footer';

import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { FaRegCalendarAlt, FaUtensils } from "react-icons/fa";
import { TbCardsFilled } from "react-icons/tb";
import { BiSolidOffer } from "react-icons/bi";
import heroIndianPlate from '../../../assets/Images/premium_photo-1698500035173-fdea60f9294e.jpg';
import indianStreetFood from '../../../assets/Images/AdobeStock_1547316644.jpeg';
import indianThali from '../../../assets/Images/AdobeStock_1631021499.jpeg';
import cafeDesserts from '../../../assets/Images/AdobeStock_257214005.jpeg';
import cafeBrew from '../../../assets/Images/AdobeStock_49389597.jpeg';
import indianCurries from '../../../assets/Images/AdobeStock_570040265.jpeg';
import indianSnacks from '../../../assets/Images/haseeb-jamil-J9lD6FS6_cs-unsplash.jpg';

const heroSlides = [
    {
        image: heroIndianPlate,
        quote: "\"Every plate tells a story of spice and soul.\"",
        subline: "Fresh Indian favorites, ready for your table."
    },
    {
        image: indianStreetFood,
        quote: "\"Good food turns moments into memories.\"",
        subline: "Street-style delights with authentic Indian flavor."
    },
    {
        image: indianThali,
        quote: "\"Happiness is hot food and good company.\"",
        subline: "Complete thali experiences served with warmth."
    },
    {
        image: cafeDesserts,
        quote: "\"A perfect day starts with coffee and flavor.\"",
        subline: "Cafe classics and cozy bites, all in one place."
    },
    {
        image: cafeBrew,
        quote: "\"Fresh brews and sweet bites fix everything.\"",
        subline: "Sip, snack, and relax in your favorite cafe mood."
    },
    {
        image: indianCurries,
        quote: "\"Bold flavors make unforgettable moments.\"",
        subline: "Reserve now and enjoy handcrafted signature dishes."
    },
    {
        image: indianSnacks,
        quote: "\"Spice, crunch, and comfort in every bite.\"",
        subline: "From cafe evenings to Indian classics, we serve both."
    }
];

const Home = () => {
    const [selectedBranch, setSelectedBranch] = useState("TownHall, Coimbatore");
    const [showBranchList, setShowBranchList] = useState(false);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const locations = [
        "TownHall, Coimbatore",
        "Gandhipuram, Coimbatore", 
        "Anna Nagar, Chennai",
        "Koramangala, Bangalore", 
        "MG Road, Kochi"
    ];

    useEffect(() => {
        const sliderTimer = setInterval(() => {
            setActiveSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(sliderTimer);
    }, []);

    const navigate = useNavigate();

  return (
    <div className="home-page">
        <div className="hero-section">
            <div className="hero-slider">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.image}
                        className={`hero-slide ${index === activeSlideIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                ))}
            </div>

            <div className="hero-content">
                <div className="hero-text-slider">
                    {heroSlides.map((slide, index) => (
                        <h1
                            key={slide.quote}
                            className={`hero-headline hero-text-slide ${index === activeSlideIndex ? 'active' : ''}`}
                        >
                            <span className="hero-quote">{slide.quote}</span>
                            <span className="hero-subline">{slide.subline}</span>
                        </h1>
                    ))}
                </div>
                <div className="booking-widget">
                    <div className="branch-selection">
                        <span className='branch-label'>Select Branch</span>
                        <div 
                                className="branch-value" 
                                onClick={() => setShowBranchList(!showBranchList)}
                            >
                                {selectedBranch} 
                                <IoIosArrowDown className={`arrow-down ${showBranchList ? 'rotate' : ''}`}/>
                            </div>

                            {showBranchList && (
                                <ul className="hero-branch-list">
                                    {locations.map((loc, index) => (
                                        <li key={index} onClick={() => { setSelectedBranch(loc); setShowBranchList(false); }}>
                                            📍 {loc}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    <button className='reserve-btn' onClick={()=> navigate('/book-table')}>
                        Reserve a Table <MdOutlineRestaurantMenu/>
                    </button>
                </div>
            </div>

            <div className="hero-slider-controls">
                <div className="hero-slider-dots">
                    {heroSlides.map((slide, index) => (
                        <button
                            key={slide.quote}
                            type="button"
                            className={`slider-dot ${index === activeSlideIndex ? 'active' : ''}`}
                            onClick={() => setActiveSlideIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="features-bar">
                <div className="feature-item" onClick={() => navigate('/menu')}>
                    <div className="feature-icon-box"><MdOutlineRestaurantMenu /></div>
                    <div className="feature-text">
                        <h4>Our Menu</h4>
                        <p>Explore Dishes</p>
                    </div>
                </div>

                <div className="feature-item" onClick={()=> navigate('/happiness-cards')}>
                    <div className="feature-icon-box"><TbCardsFilled /></div>
                    <div className="feature-text">
                        <h4>Happiness Cards</h4>
                        <p>All in One</p>
                    </div>
                </div>
                <div className="feature-item" onClick={()=> navigate('/offers')}>
                    <div className="feature-icon-box"><BiSolidOffer /></div>
                    <div className="feature-text">
                        <h4>Offers & Deals</h4>
                        <p>Exclusive Offers</p>
                    </div>
                </div>
                <div className="feature-item" onClick={() => navigate('/order-online')}>
                    <div className="feature-icon-box"><FaUtensils /></div>
                    <div className="feature-text">
                        <h4>Menu</h4>
                        <p>Order Online</p>
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
