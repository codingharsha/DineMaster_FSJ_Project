import React, { useEffect, useRef, useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import './CategorySelectorPopup.scss';

const CategorySelectorPopup = ({
    activeCategory,
    categories,
    onCategorySelect,
    className = '',
    bottomOffsetClass = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!wrapperRef.current) return;
            if (!wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (category) => {
        onCategorySelect(category);
        setIsOpen(false);
    };

    return (
        <div
            ref={wrapperRef}
            className={`floating-filter-wrap ${bottomOffsetClass} ${className}`.trim()}
        >
            {activeCategory !== 'All' && (
                <div className="floating-filter-label">{activeCategory}</div>
            )}

            {isOpen && (
                <div className="floating-filter-card">
                    <button
                        className={`floating-filter-option ${activeCategory === 'All' ? 'active' : ''}`}
                        onClick={() => handleSelect('All')}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`floating-filter-option ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => handleSelect(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            )}

            <button
                className={`floating-filter-btn ${activeCategory !== 'All' ? 'active' : ''}`}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Open category filter"
            >
                <IoFilter />
            </button>
        </div>
    );
};

export default CategorySelectorPopup;
