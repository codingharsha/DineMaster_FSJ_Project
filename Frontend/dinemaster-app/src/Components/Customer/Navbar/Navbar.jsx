import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { MdLogout } from "react-icons/md";
import { RiShoppingBag3Line, RiShoppingCart2Line } from "react-icons/ri";
import { FaFire, FaRegUser, FaTimes } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { StoreContext } from '../../../Context/StoreContext';
import { bank_offers, general_coupons, payment_offers } from '../../../assets/assets';
import { formatINR, getFoodImageSrc, withFallbackImage } from '../../../utils/customerUi';

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const [showProfile, setShowProfile] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [pulseCart, setPulseCart] = useState(false);

    const profileRef = useRef(null);
    const searchRef = useRef(null);

    const { getTotalCartAmount, token, userName, food_list, happinessCartItems, cartPulseToken, resetCustomerState } = useContext(StoreContext);
    const happinessCount = happinessCartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const hasCartActivity = getTotalCartAmount() > 0 || happinessCount > 0;

    const navLinks = [
        { label: "Menu", path: "/menu" },
        { label: "Order Online", path: "/order-online" },
        { label: "Book a Table", path: "/book-table" },
        { label: "Deals", path: "/offers" },
    ];

    const logout = () => {
        resetCustomerState();
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
        const handleOutsideClick = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
            if (searchRef.current && !searchRef.current.contains(event.target)) setShowSearch(false);
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    useEffect(() => {
        if (!cartPulseToken) return undefined;
        setPulseCart(true);
        const timer = setTimeout(() => setPulseCart(false), 650);
        return () => clearTimeout(timer);
    }, [cartPulseToken]);

    const searchResults = (() => {
        const query = keyword.trim().toLowerCase();
        if (!query) return [];

        const safeFoodList = Array.isArray(food_list) ? food_list : [];
        const foodMatches = safeFoodList
            .filter((item) => {
                const itemName = item?.name || item?.dishName || item?.title || "";
                const itemCategory = item?.category || item?.menuCategory || "";
                return (
                    itemName.toLowerCase().includes(query) ||
                    itemCategory.toLowerCase().includes(query)
                );
            })
            .map((item) => ({
                id: `food-${item.id || item._id}`,
                title: item?.name || item?.dishName || item?.title || "Food Item",
                subtitle: `Food - ${formatINR(item?.price ?? 0)}`,
                image: getFoodImageSrc(item),
                path: "/order-online"
            }));

        const couponOffers = [...general_coupons, ...bank_offers, ...payment_offers];
        const offerMatches = couponOffers
            .filter((offer) =>
                offer?.title?.toLowerCase().includes(query) ||
                offer?.code?.toLowerCase().includes(query) ||
                offer?.description?.toLowerCase().includes(query) ||
                offer?.bank_name?.toLowerCase().includes(query) ||
                offer?.method?.toLowerCase().includes(query)
            )
            .map((offer) => ({
                id: `offer-${offer.id}`,
                title: offer.title,
                subtitle: `Offer - ${offer.code}`,
                image: offer.logo_url || "",
                path: "/offers"
            }));

        const pageMatches = [
            ...navLinks,
            { label: "Happiness Cards", path: "/happiness-cards" },
            { label: "Restaurants", path: "/restaurants" },
            { label: "Support", path: "/support" },
            { label: "Feedback", path: "/feedback" }
        ]
            .filter((item) => item.label.toLowerCase().includes(query))
            .map((item) => ({
                id: `page-${item.path}`,
                title: item.label,
                subtitle: "Page",
                image: "",
                path: item.path
            }));

        return [...foodMatches, ...offerMatches, ...pageMatches].slice(0, 8);
    })();

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
                        {navLinks.map(({ label, path }) => (
                            <div
                                key={path}
                                onClick={() => handleNavigate(path)}
                                className={location.pathname === path ? 'nav-active' : ''}
                            >
                                {label}
                            </div>
                        ))}
                    </div>

                    <div className="right-section">
                        <div className="icons">
                            <div className="search-dropdown-wrapper" ref={searchRef}>
                                <button
                                    type="button"
                                    className={`navbar-search-btn ${showSearch ? 'active' : ''}`}
                                    onClick={() => setShowSearch((prev) => !prev)}
                                >
                                    <IoSearch className='search-icon' />
                                    <span className="search-btn-text">Search</span>
                                </button>

                                {showSearch && (
                                    <div className="search-popup-card">
                                        <div className="search-popup-input-box">
                                            <IoSearch className="input-search-icon" />
                                            <input
                                                type="text"
                                                placeholder="Search food, offers, coupons..."
                                                value={keyword}
                                                onChange={(event) => setKeyword(event.target.value)}
                                                autoFocus
                                            />
                                            {keyword && (
                                                <FaTimes className="clear-text" onClick={() => setKeyword("")} />
                                            )}
                                        </div>

                                        <div className="search-results-list">
                                            {!keyword.trim() && (
                                                <div className="search-empty-state">Start typing to search food, offers and pages.</div>
                                            )}
                                            {keyword.trim() && searchResults.length === 0 && (
                                                <div className="search-empty-state">No matching results found.</div>
                                            )}
                                            {searchResults.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="search-result-item"
                                                    onClick={() => handleNavigate(item.path)}
                                                >
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.title} onError={withFallbackImage} />
                                                    ) : (
                                                        <div className="result-fallback-icon">
                                                            <IoSearch />
                                                        </div>
                                                    )}
                                                    <div className="result-info">
                                                        <span>{item.title}</span>
                                                        <small>{item.subtitle}</small>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={`icon-wrapper navbar-search-icon ${pulseCart ? 'cart-pulse' : ''}`} onClick={() => navigate('/cart')}>
                                <RiShoppingCart2Line className='cart-icon' />
                                <div className={hasCartActivity ? "dot" : ""}>{hasCartActivity ? happinessCount : ""}</div>
                            </div>
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
                                        <li onClick={() => handleNavigate('/myprofile')}>
                                            <FaCircleUser /> <p>My Profile</p>
                                        </li>
                                        <li onClick={() => handleNavigate('/myorders')}>
                                            <RiShoppingBag3Line /> <p>Reservations</p>
                                        </li>
                                        <hr />
                                        <li onClick={logout}>
                                            <MdLogout /> <p>Logout</p>
                                        </li>
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

            <div className={`sidebar-overlay ${showMenu ? 'active' : ''}`} onClick={() => setShowMenu(false)} />
            <div className={`sidebar-menu ${showMenu ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <h3>DineMaster</h3>
                    <div className="close-btn" onClick={() => setShowMenu(false)}><FaTimes /></div>
                </div>

                <ul className="sidebar-links">
                    <li onClick={() => handleNavigate('/')}>Home</li>
                    <li onClick={() => handleNavigate('/offers')} className={location.pathname === '/offers' ? 'sidebar-active' : ''}>Deals</li>
                    <li onClick={() => handleNavigate('/happiness-cards')} className={location.pathname === '/happiness-cards' ? 'sidebar-active' : ''}>Happiness Cards</li>
                    <li onClick={() => handleNavigate('/feedback')}>Leave Feedback</li>
                    <li onClick={() => handleNavigate('/myorders')} className={location.pathname === '/myorders' ? 'sidebar-active' : ''}>My Reservations</li>
                    <li onClick={() => handleNavigate('/support')} className={location.pathname === '/support' ? 'sidebar-active' : ''}>Support</li>
                </ul>

                    <div className="sidebar-footer">
                    {token && (
                        <button className="sidebar-logout-btn" onClick={logout}>Sign Out</button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
