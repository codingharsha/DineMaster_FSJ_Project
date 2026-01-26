import React from 'react';
import './Gallery.css';
import { FaArrowRight } from "react-icons/fa6";

const Gallery = () => {
  return (
    <div className="gallery-section">
      <h2 className="section-header">Gallery</h2>
      
      <div className="gallery-container">
        
        <div className="gallery-image-box">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop" 
            alt="DineMaster Moments" 
            className="gallery-img"
          />
        </div>

        <div className="gallery-content">
          <span className="gallery-subtitle">DINEMASTER</span>
          <h2 className="gallery-title">
            Check Out Our <br /> Precious Moments
          </h2>
          
          <button className="gallery-btn">
            DineMaster Gallery <FaArrowRight />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Gallery;