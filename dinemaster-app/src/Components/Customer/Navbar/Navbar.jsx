import React, {useState, useRef, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaRegUser, FaCrosshairs, FaFire, FaLocationArrow } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showLocation, setShowLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const dropdownRef = useRef(null);

  const locations = [
    "Chennai" , "Coimbatore", "Thanjavur", "Trichy", "Madurai", "Bangalore", "Hyderabad", "Mumbai", "Kochi"
  ];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setShowLocation(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className= {isHomePage ? 'navbar' : 'navbar navbar-solid'}>
        <div className="navbar-container">
          <div className="logo-container">
             <div className="icon-wrapper">
               <FaFire className='logo'/>
             </div>
             <div className="logo-txt-container">
               <div className='logo-txt'>DineMaster</div>
               <div className='logo-slogan'>AUTHENTIC FLAVOURS</div>
             </div>
          </div>

          <div className="links">
            <div >Deals</div>
            <div >Happiness Cards</div>
            <div>Restaurants</div>
            <div onClick={() => navigate('/order-online')}>Takeaway</div>
          </div>

          <div className="right-section">
            
            <div className="icons">
               <div className="icon-wrapper"><IoSearch className='search-icon'/></div>
               <div className="icon-wrapper"><RiShoppingCart2Line className='cart-icon'/></div>
            </div>
            
            <div className="location-wrapper" ref={dropdownRef}>
            <button className= {`location-btn ${showLocation? 'active': ''}`}
            onClick={() => setShowLocation(!showLocation)}>
              <div className="icon-wrapper"><FaLocationArrow /></div>
              <span className='location-txt'>{selectedLocation}</span>
              <div className="icon-wrapper"><MdOutlineKeyboardArrowDown className={`arrow-icon ${showLocation ? 'rotate' : ''}`}/></div>
            </button>

            {showLocation && (
              <div className="location-card-popup">
                <div className="gps-row" onClick={() => {
                  selectedLocation("Current Location");
                  setShowLocation(false);
                }}>
                  <div className="gps-icon"><FaCrosshairs /></div>
                  <div className="gps-text">
                    <span>Near By Location</span>
                    <small>Using GPS</small>
                  </div>
                </div>

                <div className="loc-search-bar">
                  <input type="text" placeholder='Search....'/>
                  <IoSearch className='search-hint'/>
                </div>

                <div className="city-scroll-list">
                  <ul>
                    {locations.map((loc,index) => (
                      <li key={index} onClick={() => {
                        setSelectedLocation(loc);
                        setShowLocation(false);
                      }}>
                        {loc}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            )}
            </div>

            <button className='profile'>
              <div className="icon-wrapper"><FaRegUser /></div>
              <div className='profile-txt'>Log In</div>
            </button>

            <div className="icon-wrapper"><RxHamburgerMenu /></div>
          </div>

        </div>
    </div>
  )
}

export default Navbar