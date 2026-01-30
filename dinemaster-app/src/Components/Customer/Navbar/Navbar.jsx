import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { MdOutlineKeyboardArrowDown, MdLogout } from "react-icons/md";
import { RiShoppingCart2Line, RiShoppingBag3Line, RiFileList3Line, RiCustomerService2Line } from "react-icons/ri";
import { FaFire, FaTimes, FaRegUser, FaLocationArrow, FaCrosshairs } from "react-icons/fa"; 
import { FaCircleUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { StoreContext } from '../../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const [showLocation, setShowLocation] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("Select Location");
    const [showProfile, setShowProfile] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [keyword, setKeyword] = useState("");

    const dropdownRef = useRef(null);
    const profileRef = useRef(null);
    const searchRef = useRef(null);

    const { getTotalCartAmount, token, setToken, userName, setUserName, food_list } = useContext(StoreContext);

    const locations = ["Chennai", "Coimbatore", "Thanjavur", "Trichy", "Madurai", "Bangalore", "Hyderabad", "Mumbai", "Kochi"];

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setToken("");
        setUserName("");
        setShowMenu(false);
        navigate("/");
    };

    const handleNavigate = (path) => {
        navigate(path);
        setShowProfile(false);
        setShowMenu(false);
        setShowSearch(false);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowLocation(false);
            if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
            if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false);
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    return (
        <>
            <div className={isHomePage ? 'navbar' : 'navbar navbar-solid'}>
                <div className="navbar-container">
                    <div className="logo-container" onClick={() => navigate('/')}>
                        <div className="icon-wrapper">
                            <FaFire className='logo' />
                        </div>
                        <div className="logo-txt-container">
                            <div className='logo-txt'>DineMaster</div>
                            <div className='logo-slogan'>AUTHENTIC FLAVOURS</div>
                        </div>
                    </div>

                    <div className="links">
                        <div onClick={() => navigate('/offers')}>Deals</div>
                        <div onClick={() => navigate('/happiness-cards')}>Happiness Cards</div>
                        <div onClick={() => navigate('/restaurants')}>Restaurants</div>
                        <div onClick={() => navigate('/order-online')}>Takeaway</div>
                    </div>

                    <div className="right-section">
                        <div className="icons">
                            <div className="search-dropdown-wrapper" ref={searchRef}>
                                <div className={`icon-wrapper ₹{showSearch ? 'active' : ''}`} onClick={() => setShowSearch(!showSearch)}>
                                    <IoSearch className='search-icon' />
                                </div>
                                {showSearch && (
                                    <div className="search-popup-card">
                                        <div className="search-popup-input-box">
                                            <IoSearch className="input-search-icon" />
                                            <input
                                                type="text"
                                                placeholder="Search food..."
                                                value={keyword}
                                                onChange={(e) => setKeyword(e.target.value)}
                                                autoFocus
                                            />
                                            {keyword && <FaTimes className="clear-text" onClick={() => setKeyword("")} />}
                                        </div>
                                        {keyword.length > 0 && (
                                            <div className="search-results-list">
                                                {food_list.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase())).slice(0, 5).map((item, index) => (
                                                    <div key={index} className="search-result-item" onClick={() => handleNavigate('/order-online')}>
                                                        <img src={item.image} alt={item.name} />
                                                        <div className="result-info">
                                                            <span>{item.name}</span>
                                                            <small>₹{item.price}</small>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="icon-wrapper navbar-search-icon" onClick={() => navigate('/cart')}>
                                <RiShoppingCart2Line className='cart-icon' />
                                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                            </div>
                        </div>

                        <div className="location-wrapper" ref={dropdownRef}>
                            <button className={`location-btn ₹{showLocation ? 'active' : ''}`} onClick={() => setShowLocation(!showLocation)}>
                                <div className="icon-wrapper"><FaLocationArrow /></div>
                                <span className='location-txt'>{selectedLocation}</span>
                                <div className="icon-wrapper"><MdOutlineKeyboardArrowDown className={`arrow-icon ₹{showLocation ? 'rotate' : ''}`} /></div>
                            </button>
                            {showLocation && (
                                <div className="location-card-popup">
                                    <div className="gps-row" onClick={() => { setSelectedLocation("Current Location"); setShowLocation(false); }}>
                                        <div className="gps-icon"><FaCrosshairs /></div>
                                        <div className="gps-text"><span>Near By Location</span><small>Using GPS</small></div>
                                    </div>
                                    <div className="loc-search-bar">
                                        <input type="text" placeholder='Search city...' />
                                        <IoSearch className='search-hint' />
                                    </div>
                                    <div className="city-scroll-list">
                                        <ul>
                                            {locations.map((loc, index) => (
                                                <li key={index} onClick={() => { setSelectedLocation(loc); setShowLocation(false); }}>{loc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        {!token ? (
                            <button className='profile' onClick={() => setShowLogin(true)}>
                                <div className="icon-wrapper"><FaRegUser /></div>
                                <div className='profile-txt'>Log In</div>
                            </button>
                        ) : (
                            <div className='navbar-profile' ref={profileRef} onClick={() => setShowProfile(!showProfile)}>
                                <button className='profile'>
                                    <div className="icon-wrapper"><FaRegUser /></div>
                                    <div className='profile-txt'>{userName}</div>
                                </button>
                                {showProfile && (
                                    <ul className="nav-profile-dropdown">
                                        <li onClick={() => handleNavigate('/myprofile')}><FaCircleUser /> <p>My Profile</p></li>
                                        <li onClick={() => handleNavigate('/myorders')}><RiShoppingBag3Line /> <p>Orders</p></li>
                                        <hr />
                                        <li onClick={logout}><MdLogout /> <p>Logout</p></li>
                                    </ul>
                                )}
                            </div>
                        )}

                        <div className="icon-wrapper hamburger-icon" onClick={() => setShowMenu(true)}>
                            <RxHamburgerMenu />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`sidebar-overlay ₹{showMenu ? 'active' : ''}`} onClick={() => setShowMenu(false)}></div>
            <div className={`sidebar-menu ₹{showMenu ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <h3>Menu</h3>
                    <div className="close-btn" onClick={() => setShowMenu(false)}><FaTimes /></div>
                </div>
                <ul className="sidebar-links">
                    <li onClick={() => handleNavigate('/')}>Home</li>
                    <li onClick={() => handleNavigate('/order-online')}>Order Food</li>
                    <li onClick={() => handleNavigate('/offers')}>Deals</li>
                    <li onClick={() => handleNavigate('/book-table')}>Book A Table</li>
                    <li onClick={() => handleNavigate('/restaurants')}>Restaurants</li>
                </ul>
                <div className="sidebar-footer">
                    <div className="s-link" onClick={() => handleNavigate('/myorders')}><RiFileList3Line /> My Orders</div>
                    <div className="s-link"><RiCustomerService2Line /> Support</div>
                    {token && <button className="sidebar-logout-btn" onClick={logout}>Sign Out</button>}
                </div>
            </div>
        </>
    );
};

export default Navbar;