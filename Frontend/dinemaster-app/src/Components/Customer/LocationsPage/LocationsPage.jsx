import React from 'react';
import './LocationsPage.scss';
import { useNavigate } from 'react-router-dom';

const BRANCHES = [
  { city: 'Chennai', area: 'Anna Nagar', address: '12, 2nd Avenue, Anna Nagar, Chennai', timings: '11:00 AM - 11:00 PM', contact: '+91 90000 11111', seating: '42 seats available', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900', badge: 'Flagship' },
  { city: 'Coimbatore', area: 'Town Hall', address: '45, Big Bazaar Street, Town Hall, Coimbatore', timings: '11:30 AM - 10:30 PM', contact: '+91 90000 22222', seating: '28 seats available', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900', badge: 'Popular' },
  { city: 'Madurai', area: 'KK Nagar', address: '9, KK Nagar Main Road, Madurai', timings: '12:00 PM - 10:30 PM', contact: '+91 90000 33333', seating: '35 seats available', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900', badge: 'Family Hub' },
  { city: 'Trichy', area: 'Cantonment', address: '21, Cantonment High Road, Trichy', timings: '11:00 AM - 10:00 PM', contact: '+91 90000 44444', seating: '31 seats available', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900', badge: 'Express' },
  { city: 'Salem', area: 'Five Roads', address: '4/22, Five Roads Junction, Salem', timings: '11:00 AM - 10:30 PM', contact: '+91 90000 55555', seating: '26 seats available', image: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=900', badge: 'New' },
  { city: 'Bangalore', area: 'Koramangala', address: '87, 5th Block, Koramangala, Bangalore', timings: '11:30 AM - 11:30 PM', contact: '+91 90000 66666', seating: '48 seats available', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900', badge: 'Premium' }
];

const LocationsPage = () => {
  const navigate = useNavigate();

  return (
    <div className='locations-page customer-page-shell'>
      <div className='locations-page-header'>
        <h1>Our Locations</h1>
        <p>Discover nearby DineMaster branches and reserve your table instantly.</p>
      </div>

      <div className='branch-grid'>
        {BRANCHES.map((branch) => (
          <article className='branch-card' key={`${branch.city}-${branch.area}`}>
            <div className='branch-image' style={{ backgroundImage: `url(${branch.image})` }}>
              <span className='branch-badge'>{branch.badge}</span>
            </div>
            <div className='branch-content'>
              <h3>{branch.city} <small>{branch.area}</small></h3>
              <p>{branch.address}</p>
              <p><b>Timings:</b> {branch.timings}</p>
              <p><b>Contact:</b> {branch.contact}</p>
              <p><b>Seating:</b> {branch.seating}</p>
              <p className='map-preview'>Map Preview: Near city center and metro connectivity</p>
              <button className='dm-primary-btn' onClick={() => navigate('/book-table')}>Book Table</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
