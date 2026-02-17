import React, { useState } from 'react';
import './GalleryPage.scss';
import { FaInstagram } from 'react-icons/fa';

const GalleryPage = () => {
    const [filter, setFilter] = useState('All');

    const galleryData = [
        { id: 1, src: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop", category: "Food", title: "Signature Biryani" },
        { id: 2, src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop", category: "Food", title: "Gourmet Desserts" },
        { id: 3, src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop", category: "Food", title: "Tandoori Special" },
        { id: 4, src: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=800&auto=format&fit=crop", category: "Food", title: "Morning Breakfast" },
        { id: 5, src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop", category: "Food", title: "Wood Fire Pizza" },
        { id: 6, src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=800&auto=format&fit=crop", category: "Food", title: "French Toast" },

        { id: 7, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop", category: "Ambience", title: "Cozy Interiors" },
        { id: 8, src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop", category: "Ambience", title: "Private Dining" },
        { id: 9, src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop", category: "Ambience", title: "Outdoor Seating" },
        { id: 10, src: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=800&auto=format&fit=crop", category: "Ambience", title: "Bar Section" },
    ];

    const filteredImages = filter === 'All' 
        ? galleryData 
        : galleryData.filter(item => item.category === filter);

    return (
        <div className="gallery-page">
            <div className="gallery-header">
                <span className="sub-head">A Visual Journey</span>
                <h1>Our Gallery</h1>
                <p>Peek inside our kitchen, explore our cozy corners, and drool over our delicacies.</p>
                
                <div className="filter-tabs">
                    <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All Photos</button>
                    <button className={filter === 'Food' ? 'active' : ''} onClick={() => setFilter('Food')}>Our Food</button>
                    <button className={filter === 'Ambience' ? 'active' : ''} onClick={() => setFilter('Ambience')}>Interiors</button>
                </div>
            </div>

            <div className="gallery-grid">
                {filteredImages.map((img) => (
                    <div className="gallery-item animate-up" key={img.id}>
                        <img src={img.src} alt={img.title} />
                        <div className="overlay">
                            <h3>{img.title}</h3>
                            <span>{img.category}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="insta-footer">
                <FaInstagram /> 
                <span>Follow us @DineMaster for daily updates</span>
            </div>
        </div>
    );
};

export default GalleryPage;