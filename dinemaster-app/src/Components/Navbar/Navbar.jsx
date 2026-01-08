import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaFire, FaLocationArrow } from "react-icons/fa";
import { IoSearchSharp, IoCartOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import './Navbar.css'
import { Navigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div>
        <div className='navbar-container'>
            <div className="logo">
                <FaFire className='logo-img'/>
                <div className="logo-text-container">
                <div className="title">DineMaster</div>
                <div className="slogan">AUTHENTIC FLAVOURS</div>
                </div>
            </div>

            <div className="links">
                <div className="deals">Deals</div>
                <div className="happiness-cards">Happiness Cards</div>
                <div className="restaurants">Restaurants</div>
                <IoSearchSharp size={30}/>
                <IoCartOutline size={30}/>
            </div>

            <div className="location-container">
                <FaLocationArrow className='location-arrow' size={20}/>
                <div className="location-name">Choose your Location</div>
                <IoIosArrowDown className='arrow-down' size={20}/>
            </div>

            <div className="profile" onClick={() => navigate('/auth')}>
                <FiUser size={20} className='user-icon'/>
                <div className="login-text">Login</div>
            </div>
        </div>
    </div>
  )
}

export default Navbar