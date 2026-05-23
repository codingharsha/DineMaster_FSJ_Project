import React, { useRef } from 'react';
import './OurLocations.scss';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const OurLocations = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const slideLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft -= 350;
  };

  const slideRight = () => {
    if (sliderRef.current) sliderRef.current.scrollLeft += 350;
  };

  const locations = [
    {
      id: 1,
      name: "Chennai",
      imgUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1170&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Coimbatore",
      imgUrl: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Madurai",
      imgUrl: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Trichy",
      imgUrl: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1170&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Salem",
      imgUrl: "https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?q=80&w=1074&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Bangalore",
      imgUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1200&auto=format&fit=crop"
    }
  ];

  return (
    <div className="locations-section">
      <div className="locations-header">
        <h2 className="locations-title">Our Locations</h2>
        <div className="locations-controls">
          <button className="view-all-btn" onClick={() => navigate('/locations')}>View All</button>
          <div className="arrow-btn" onClick={slideLeft}><FaArrowLeft /></div>
          <div className="arrow-btn" onClick={slideRight}><FaArrowRight /></div>
        </div>
      </div>

      <div className="locations-slider" ref={sliderRef}>
        {locations.map((loc) => (
          <div className="location-card" key={loc.id}>
            <div className="location-img-box">
              <img src={loc.imgUrl} alt={loc.name} className="location-img" />
            </div>
            <div className="location-name-box">
              <span className="location-name">{loc.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurLocations;
