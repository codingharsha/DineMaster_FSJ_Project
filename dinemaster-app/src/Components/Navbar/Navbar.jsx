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
            <div className="logo-section">
                <FaFire className='logo-img'/>
                <div className="logo-txt">
                    <div className="logo-title">DineMaster</div>
                    <div className="logo-slogan">AUTHENTIC FLAVOURS</div>    
                </div> 
            </div>

            <div className="mid-section">
                <div className="links">
                    <div className="link">Deals</div>
                    <div className="link">Happiness Cards</div>
                    <div className="link">Restaurants</div>
                </div>
                <div className="buttons">
                    <IoSearch className='button'/>
                    <RiShoppingCart2Line className='button'/>
                </div>
            </div>

            <div className="right-section">
                <button className='location-button'>
                    <FaLocationArrow className='button'/>
                    <div className="location-txt">Select Your Location</div>
                    <MdOutlineKeyboardArrowDown className='button'/>
                </button>
                <button className="profile-button">
                    <FaRegUser className='profile-button'/>
                    <div className="profile-txt">Log In</div>
                </button>
                <div className="sidebar-button">
                    <RxHamburgerMenu className='hamburger-menu-button'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar