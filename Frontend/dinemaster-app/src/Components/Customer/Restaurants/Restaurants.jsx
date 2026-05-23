import React, { useState } from 'react';
import './Restaurants.scss';
import { locations_list } from '../../../assets/assets';
import { FaMapMarkerAlt, FaStar, FaPhoneAlt, FaDirections, FaSearch } from "react-icons/fa";

const Restaurants = () => {
  
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className='restaurants-page customer-page-shell'>
    
      <div className="res-hero">
         <div className="res-hero-content">
             <h1>Find Us Locally <br /><span>And Globally</span></h1>
             <p>Experience our award-winning ambiance at 50+ locations across 12 countries.</p>
         </div>
      </div>

      <div className="world-map-section">
          <h2>Our Global Presence</h2>
          <p>We are serving authentic flavours across the globe.</p>
          
          <div className="map-container">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
                alt="World Map" 
                className="world-map-img" 
              />
              
              {locations_list.map((loc) => (
                  <div 
                    key={loc.id} 
                    className="map-pin-wrapper"
                    style={{ top: loc.coordinates.top, left: loc.coordinates.left }}
                  >
                      <div className="map-pin"></div>
                      <div className="pin-pulse"></div>
                      
                      <div className="pin-tooltip">
                          <img src={loc.image} alt="" />
                          <div>
                              <h4>{loc.city}</h4>
                              <span>{loc.rating} <FaStar className="star-yellow"/></span>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      <div className="branches-section">
          
          <div className="branch-header">
              <h3>Locate a Branch</h3>
              <div className="branch-search">
                  <input 
                    type="text" 
                    placeholder="Search City or Country..." 
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                  />
                  <button><FaSearch /></button>
              </div>
          </div>

          <div className="branches-grid">
              {locations_list
                .filter(item => 
                    item.city.toLowerCase().includes(searchTerm) || 
                    item.country.toLowerCase().includes(searchTerm)
                )
                .map((item) => (
                  <div className="branch-card" key={item.id}>
                      <div className="branch-img-box">
                          <img src={item.image} alt={item.name} />
                          <div className="branch-rating">{item.rating} <FaStar /></div>
                      </div>
                      
                      <div className="branch-info">
                          <h3>{item.name}</h3>
                          <div className="info-row">
                              <FaMapMarkerAlt className="icon-red"/>
                              <p>{item.address}</p>
                          </div>
                          <div className="info-row">
                              <FaPhoneAlt className="icon-grey"/>
                              <p>+91 98765 43210</p>
                          </div>

                          <div className="branch-actions">
                              <button className="btn-outline">View Details</button>
                              <button className="btn-fill">
                                  Get Directions <FaDirections />
                              </button>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

    </div>
  )
}

export default Restaurants;
