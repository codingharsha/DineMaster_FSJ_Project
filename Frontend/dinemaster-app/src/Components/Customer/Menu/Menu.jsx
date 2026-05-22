import React, { useState, useContext } from 'react';
import './Menu.scss';
import { StoreContext } from '../../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaLeaf, FaTimes, FaShoppingCart, FaFire } from 'react-icons/fa';
import { MdOutlineTimer } from 'react-icons/md';
import { IoSearch } from 'react-icons/io5';
import CategorySelectorPopup from '../CategorySelectorPopup/CategorySelectorPopup';

const CATEGORIES = ['All', 'Rolls', 'Salad', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles'];

const Menu = () => {
    const { food_list } = useContext(StoreContext);
    const navigate = useNavigate();

    const [activeCategory, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    const normalizedSearch = search.toLowerCase().trim();
    const searchableMenu = food_list.filter((item) => {
        if (!normalizedSearch) return true;
        const nameMatch = item.name.toLowerCase().includes(normalizedSearch);
        const descMatch = (item.description || '').toLowerCase().includes(normalizedSearch);
        return nameMatch || descMatch;
    });

    const orderedCategories = CATEGORIES.filter((category) => category !== 'All');
    const dynamicCategories = [...new Set(searchableMenu.map((item) => item.category))]
        .filter((category) => !orderedCategories.includes(category));
    const categorySequence = [...orderedCategories, ...dynamicCategories];

    const visibleCategories = activeCategory === 'All'
        ? categorySequence
        : categorySequence.filter((category) => category === activeCategory);

    const sectionedMenu = visibleCategories
        .map((category) => ({
            category,
            items: searchableMenu.filter((item) => item.category === category)
        }))
        .filter((section) => section.items.length > 0);

    const totalVisibleDishes = sectionedMenu.reduce((acc, section) => acc + section.items.length, 0);
    const availableCategories = categorySequence.filter((category) =>
        searchableMenu.some((item) => item.category === category)
    );

    const handleCategorySelect = (category) => {
        setCategory(category);
    };

    return (
        <div className="menu-page">
            <section className="menu-hero">
                <div className="menu-hero-content">
                    <span className="menu-hero-eyebrow">Signature Dining Collection</span>
                    <h1>Hotel Style <span>Menu</span></h1>
                    <p>Curated specialties, plated with finesse and prepared fresh for every table.</p>
                    <button className="menu-hero-cta" onClick={() => navigate('/order-online')}>
                        <FaShoppingCart /> Start Ordering
                    </button>
                </div>
            </section>

            <section className="menu-toolbar">
                <div className="menu-search-wrap">
                    <IoSearch className="menu-search-icon" />
                    <input
                        type="text"
                        placeholder="Search dishes or descriptions"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button className="search-clear" onClick={() => setSearch('')}>
                            <FaTimes />
                        </button>
                    )}
                </div>

            </section>

            <div className="menu-count-row">
                <span className="count-label">
                    {totalVisibleDishes} {totalVisibleDishes === 1 ? 'dish' : 'dishes'}
                    {activeCategory !== 'All' && (
                        <button className="clear-filter" onClick={() => setCategory('All')}>
                            {activeCategory} <FaTimes />
                        </button>
                    )}
                </span>
            </div>

            {totalVisibleDishes === 0 ? (
                <div className="menu-empty">
                    <p>No dishes match your search.</p>
                    <button onClick={() => { setSearch(''); setCategory('All'); }}>Reset Filters</button>
                </div>
            ) : (
                <div className="menu-sections">
                    {sectionedMenu.map(({ category, items }) => (
                        <section key={category} className="menu-category-section">
                            <header className="menu-category-header">
                                <h2>{category}</h2>
                                <span>{items.length} {items.length === 1 ? 'selection' : 'selections'}</span>
                            </header>

                            <div className="menu-category-list">
                                {items.map((item, index) => (
                                    <article
                                        key={`${category}-${item.id ?? index}`}
                                        className="menu-card"
                                        onClick={() => setSelected(item)}
                                    >
                                        <div className="menu-card-img">
                                            <img src={item.imgUrl} alt={item.name} />
                                        </div>

                                        <div className="menu-card-body">
                                            <div className="menu-card-title-row">
                                                <h3>{item.name}</h3>
                                                <span className="dish-price">Rs {item.price}</span>
                                            </div>

                                            <p className="menu-card-desc">{item.description}</p>

                                            <div className="menu-card-footer">
                                                <span className={`veg-badge ${item.veg ? 'veg' : 'nonveg'}`}>
                                                    {item.veg ? <><FaLeaf /> Veg</> : <><FaFire /> Non-Veg</>}
                                                </span>
                                                <span className="dish-time"><MdOutlineTimer />25-35 min</span>
                                                <span className="rating-chip"><FaStar />{item.rating || '4.5'}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}

            <section className="menu-order-cta">
                <div>
                    <h2>Reserve or order in minutes</h2>
                    <p>Choose your favorites now or book a table for a complete dining experience.</p>
                </div>
                <div className="cta-actions">
                    <button className="cta-primary" onClick={() => navigate('/order-online')}>
                        <FaShoppingCart /> Order Online
                    </button>
                    <button className="cta-secondary" onClick={() => navigate('/book-table')}>
                        Book a Table
                    </button>
                </div>
            </section>

            {selected && (
                <div className="dish-modal-overlay" onClick={() => setSelected(null)}>
                    <div className="dish-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="dish-modal-close" onClick={() => setSelected(null)}>
                            <FaTimes />
                        </button>
                        <div className="dish-modal-img">
                            <img src={selected.imgUrl} alt={selected.name} />
                        </div>
                        <div className="dish-modal-body">
                            <div className="dish-modal-top">
                                <h2>{selected.name}</h2>
                                <div className="dish-modal-chips">
                                    <span className={`veg-badge ${selected.veg ? 'veg' : 'nonveg'}`}>
                                        {selected.veg ? <><FaLeaf /> Veg</> : <><FaFire /> Non-Veg</>}
                                    </span>
                                    <span className="rating-chip"><FaStar />{selected.rating || '4.5'}</span>
                                </div>
                            </div>
                            <p className="dish-modal-desc">{selected.description}</p>
                            <div className="dish-modal-meta">
                                <div className="meta-cell">
                                    <span>Category</span>
                                    <strong>{selected.category}</strong>
                                </div>
                                <div className="meta-cell">
                                    <span>Prep Time</span>
                                    <strong>25-35 min</strong>
                                </div>
                                <div className="meta-cell">
                                    <span>Price</span>
                                    <strong className="price-accent">Rs {selected.price}</strong>
                                </div>
                            </div>
                            <button
                                className="dish-modal-order"
                                onClick={() => { setSelected(null); navigate('/order-online'); }}
                            >
                                <FaShoppingCart /> Order This Dish
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <CategorySelectorPopup
                activeCategory={activeCategory}
                categories={availableCategories}
                onCategorySelect={handleCategorySelect}
            />
        </div>
    );
};

export default Menu;
