import React from 'react'
import './Navbar.css'
import { FaLocationArrow } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
const Navbar = () => {
  return (
    <div>
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

          <div className='mid-section'>
            <div className="links">
            <div>Deals</div>
            <div>Happiness Cards</div>
            <div>Restaurants</div>
            <div>Order Online</div>
          </div>

          <div className="icons">
            <div className="icon-wrapper">
              <IoSearch className='search-icon'/>
            </div>
            <div className="icon-wrapper">
              <RiShoppingCart2Line className='cart-icon'/>
            </div>
          </div>
          </div>

          <div className="right-section">
            <button className='location-btn'>
            <div className="icon-wrapper">
              <FaLocationArrow />
            </div>
            <span className='location-txt'>Select Your Location</span>
            <div className="icon-wrapper">
              <MdOutlineKeyboardArrowDown />
            </div>
          </button>

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