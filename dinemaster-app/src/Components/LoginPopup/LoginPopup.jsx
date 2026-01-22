import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPopup.css';
import { IoClose } from "react-icons/io5";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setCurrState("OTP");
    } else {
      alert("Please enter a valid phone number");
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    
    let role = "customer"; 

    if (phone === "9999999999") {
        role = "admin";
    } 
    else if (phone === "8888888888") {
        role = "kitchen";
    }

    localStorage.setItem("token", "mock-token-" + role); 
    localStorage.setItem("role", role);

    setShowLogin(false);

    if (role === 'admin') {
      alert("Welcome, Manager!");
      navigate('/admin/dashboard');
    } 
    else if (role === 'kitchen') {
      alert("Welcome, Chef!");
      navigate('/kitchen/orders');
    } 
    else {
      alert("Login Successful!");
      navigate('/'); 
    }
  };

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        
        <div className="login-popup-title">
          <h2>{currState === "Login" ? "Login" : "Verify OTP"}</h2>
          <div className="close-btn" onClick={() => setShowLogin(false)}>
             <IoClose className="close-icon" />
          </div>
        </div>

        <form className="login-popup-inputs">
          {currState === "Login" ? (
            <>
              <p className="input-label">Phone Number</p>
              <input 
                type="tel" 
                placeholder="Enter phone number" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <button onClick={handleSendOtp}>Continue</button>
              
              <p style={{fontSize: '10px', color: '#999', marginTop: '10px', textAlign:'center'}}>
                (Dev Hint: Use <b>9999999999</b> for Admin, <b>8888888888</b> for Kitchen)
              </p>
            </>
          ) : (
            <>
              <p className="input-label">Enter OTP sent to {phone}</p>
              <div className="otp-input-group">
                <input 
                  type="text" 
                  placeholder="X X X X" 
                  maxLength="4"
                  required 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="otp-field"
                />
              </div>
              <button onClick={handleVerifyOtp}>Verify & Login</button>
              <span className="resend-link" onClick={() => setCurrState("Login")}>Change Number?</span>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;