import React, { useContext, useState } from 'react';
import './Profile.scss';
import { StoreContext } from '../../../Context/StoreContext';
import { formatINR } from '../../../utils/customerUi';

const PROFILE_SECTIONS = [
  'Personal Information',
  'Reservations',
  'Wallet',
  'Happiness Cards',
  'Security',
  'Notifications'
];

const Profile = () => {
  const {
    userName,
    bookings,
    walletBalance,
    walletTransactions,
    happinessPurchases
  } = useContext(StoreContext);

  const [activeSection, setActiveSection] = useState('Personal Information');

  const renderSection = () => {
    if (activeSection === 'Personal Information') {
      return (
        <div className='profile-section-card'>
          <h2>Personal Information</h2>
          <div className='info-grid'>
            <div><label>Name</label><p>{userName || 'Guest User'}</p></div>
            <div><label>Email</label><p>customer@dinemaster.com</p></div>
            <div><label>Phone</label><p>+91 90000 12345</p></div>
            <div><label>Member Since</label><p>January 2025</p></div>
            <div><label>Loyalty Tier</label><p>{bookings.length > 8 ? 'Platinum' : bookings.length > 3 ? 'Gold' : 'Silver'}</p></div>
          </div>
        </div>
      );
    }

    if (activeSection === 'Reservations') {
      return (
        <div className='profile-section-card'>
          <h2>Reservations</h2>
          {(bookings || []).length === 0 && <p className='empty-msg'>No reservations yet.</p>}
          {(bookings || []).slice(0, 8).map((item) => (
            <div className='list-row' key={item.id}>
              <span>Table {item.table || '--'} • {item.date || '--'} {item.time || ''}</span>
              <span className={`badge ${(item.paymentStatus || 'Pending').toLowerCase()}`}>{item.paymentStatus || 'Pending'}</span>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === 'Wallet') {
      return (
        <div className='profile-section-card'>
          <h2>Wallet</h2>
          <p className='wallet-balance'>Current Balance: <b>{formatINR(walletBalance)}</b></p>
          {walletTransactions.length === 0 && <p className='empty-msg'>No wallet transactions yet.</p>}
          {walletTransactions.slice(0, 8).map((txn) => (
            <div className='list-row' key={txn.id}>
              <span>{txn.type} • {new Date(txn.createdAt).toLocaleString()}</span>
              <span className={txn.direction === 'debit' ? 'debit' : 'credit'}>{txn.direction === 'debit' ? '-' : '+'}{formatINR(txn.amount)}</span>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === 'Happiness Cards') {
      return (
        <div className='profile-section-card'>
          <h2>Happiness Cards</h2>
          {happinessPurchases.length === 0 && <p className='empty-msg'>No happiness card purchases yet.</p>}
          {happinessPurchases.slice(0, 8).map((card) => (
            <div className='list-row' key={card.id}>
              <span>{card.title} • {card.recipientName || 'Self'}</span>
              <span>{formatINR(card.amount || 0)}</span>
            </div>
          ))}
        </div>
      );
    }

    if (activeSection === 'Security') {
      return (
        <div className='profile-section-card'>
          <h2>Security</h2>
          <div className='security-actions'>
            <button className='dm-primary-btn'>Change Password</button>
            <button>View Login Activity</button>
          </div>
        </div>
      );
    }

    return (
      <div className='profile-section-card'>
        <h2>Notifications</h2>
        <label className='check-row'><input type='checkbox' defaultChecked /> Reservation reminders</label>
        <label className='check-row'><input type='checkbox' defaultChecked /> Payment alerts</label>
        <label className='check-row'><input type='checkbox' /> Promotional offers</label>
      </div>
    );
  };

  return (
    <div className='profile-page customer-page-shell'>
      <aside className='profile-sidebar'>
        <h3>My Account</h3>
        <ul>
          {PROFILE_SECTIONS.map((section) => (
            <li
              key={section}
              className={activeSection === section ? 'active' : ''}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </li>
          ))}
        </ul>
      </aside>

      <section className='profile-content'>
        {renderSection()}
      </section>
    </div>
  );
};

export default Profile;

