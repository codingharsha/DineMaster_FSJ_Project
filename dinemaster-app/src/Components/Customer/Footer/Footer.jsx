import React from 'react';
import './Footer.css';
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFire } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="footer-container">
        
        <div className="footer-top">
          <div className="footer-logo">
            <FaFire className="logo-icon"/> 
            <div className="logo-text">
              <span>DineMaster</span>
              <span className="logo-sub">AUTHENTIC FLAVOURS</span>
            </div>
          </div>

          <div className="social-icons">
            <a href="#" className="social-link"><FaInstagram /></a>
            <a href="#" className="social-link"><FaFacebookF /></a>
            <a href="#" className="social-link"><FaYoutube /></a>
            <a href="#" className="social-link"><FaXTwitter /></a>
          </div>
        </div>

        <div className="footer-links-container">
          <div className="footer-column">
            <a href="#">Our Story</a>
            <a href="#">News</a>
            <a href="#">Happiness Card</a>
            <a href="#">Careers</a>
          </div>

          <div className="footer-column">
            <a href="#">Location</a>
            <a href="#">Faq</a>
            <a href="#">Investors</a>
            <a href="#">Dine Master Partnership</a>
          </div>

          <div className="footer-column">
            <a href="#">Blogs</a>
            <a href="#">What’s on DineMaster</a>
            <a href="#">Nutrition Information</a>
          </div>

          <div className="footer-column">
            <a href="#">Corporate Enquiry</a>
            <a href="#">Contact Us</a>
          </div>

          <div className="footer-app-column">
            <p className="app-text">
              Experience the vibrant atmosphere of our restaurants. Immerse yourself in the aroma of grilled delicacies.
            </p>
            <div className="app-buttons">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="store-badge"
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="Download on the App Store" 
                className="store-badge"
              />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="copyright">©All Rights Reserved by Dine Master</span>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms and Conditions</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;