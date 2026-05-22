import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { MdLogout } from "react-icons/md";
import { RiCustomerService2Line, RiFileList3Line, RiShoppingBag3Line, RiShoppingCart2Line } from "react-icons/ri";
import { FaFire, FaRegUser, FaTimes } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { StoreContext } from '../../../Context/StoreContext';
import { bank_offers, general_coupons, payment_offers } from '../../../assets/assets';

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const [showProfile, setShowProfile] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [keyword, setKeyword] = useState("");

    const profileRef = useRef(null);
    const searchRef = useRef(null);

    const { getTotalCartAmount, token, setToken, userName, setUserName, food_list } = useContext(StoreContext);

    const navLinks = [
        { label: "Menu", path: "/menu" },
        { label: "Order Online", path: "/order-online" },
        { label: "Book a Table", path: "/book-table" },
        { label: "Deals", path: "/offers" },
    ];

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
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
        const handleOutsideClick = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
            if (searchRef.current && !searchRef.current.contains(event.target)) setShowSearch(false);
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

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
                subtitle: `Food - Rs. ${item?.price ?? "-"}`,
                image: item?.imgUrl || item?.image || item?.imageUrl || "",
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
            { label: "Restaurants", path: "/restaurants" }
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
                                                        <img src={item.image} alt={item.title} />
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

                            <div className="icon-wrapper navbar-search-icon" onClick={() => navigate('/cart')}>
                                <RiShoppingCart2Line className='cart-icon' />
                                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
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
                                            <RiShoppingBag3Line /> <p>Orders</p>
                                        </li>
                                        <li onClick={() => handleNavigate('/track-order')}>
                                            <RiFileList3Line /> <p>Track Order</p>
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
                    {navLinks.map(({ label, path }) => (
                        <li
                            key={path}
                            onClick={() => handleNavigate(path)}
                            className={location.pathname === path ? 'sidebar-active' : ''}
                        >
                            {label}
                        </li>
                    ))}
                    <li onClick={() => handleNavigate('/happiness-cards')}>Happiness Cards</li>
                    <li onClick={() => handleNavigate('/feedback')}>Leave Feedback</li>
                </ul>

                <div className="sidebar-footer">
                    <div className="s-link" onClick={() => handleNavigate('/myorders')}>
                        <RiShoppingBag3Line /> My Orders
                    </div>
                    <div className="s-link" onClick={() => handleNavigate('/track-order')}>
                        <RiFileList3Line /> Track Order
                    </div>
                    <div className="s-link">
                        <RiCustomerService2Line /> Support
                    </div>
                    {token && (
                        <button className="sidebar-logout-btn" onClick={logout}>Sign Out</button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
