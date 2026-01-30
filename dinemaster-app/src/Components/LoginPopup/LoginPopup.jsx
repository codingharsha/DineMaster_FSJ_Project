import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPopup.css';
import { StoreContext } from '../../Context/StoreContext';
import { FaMobileAlt, FaLock, FaUser, FaTimes } from "react-icons/fa"; 

const LoginPopup = ({ setShowLogin }) => {

  const { setToken, setUserName, setUserRole } = useContext(StoreContext);
  const navigate = useNavigate();

  const [currStep, setCurrStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  const KITCHEN_PHONE = "9876543210";
  const EXISTING_USER_PHONE = "0123456789";
  const ADMIN_PHONE = "1122334455";

  const handleSendOtp = (e) => {
      e.preventDefault();
      if(mobile.length < 10) { alert("Please enter valid mobile number"); return; }
      setCurrStep(2);
      alert(`OTP Sent to ₹{mobile}: 1234`);
  };

  const handleVerifyOtp = (e) => {
      e.preventDefault();
      if(otp !== "1234") { alert("Invalid OTP"); return; }

      const inputMobile = String(mobile).trim();

      if (inputMobile === ADMIN_PHONE) {
          finalizeLogin("System Admin", "admin");
      } 
      else if (inputMobile === KITCHEN_PHONE) {
          finalizeLogin("Chef Manager", "kitchen");
      } 
      else if (inputMobile === EXISTING_USER_PHONE) {
          finalizeLogin("DineMaster User", "customer");
      } 
      else {
          setCurrStep(3);
      }
      
      console.log("Input Mobile:", mobile);
      console.log("Kitchen Target:", KITCHEN_PHONE);

    
  };

  const handleSignup = (e) => {
      e.preventDefault();
      if(name.length === 0) { alert("Name is mandatory"); return; }
      finalizeLogin(name, "customer");
  };

  const finalizeLogin = (name, role) => {
      setToken("dummy-token-123");
      setUserName(name);
      setUserRole(role);
      
      localStorage.setItem("token", "dummy-token-123");
      localStorage.setItem("userName", name);
      localStorage.setItem("userRole", role);

      setShowLogin(false);

      if (role === "admin") {
          navigate("/admin/dashboard"); 
      } else if (role === "kitchen") {
          navigate("/kitchen");
      } else {
          navigate("/");
      }
  };

  return (
    <div className='login-popup'>
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>
              {currStep === 1 && "Login"}
              {currStep === 2 && "Verification"}
              {currStep === 3 && "Profile"}
          </h2>
          <FaTimes 
            onClick={() => setShowLogin(false)} 
            className="close-icon" 
            style={{ cursor: "pointer", fontSize: "18px" }}
          />
        </div>

        <form className="login-popup-inputs">
            {currStep === 1 && (
                <>
                    <div className="input-group">
                        <FaMobileAlt className="input-icon"/>
                        <input type="number" placeholder='Mobile Number' value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                    </div>
                    <button onClick={handleSendOtp}>Continue</button>
                    <div className="login-hints" style={{marginTop:'10px', fontSize:'12px', color:'#666'}}>
                        <p>Kitchen ID: <b>9876543210</b></p>
                        <p>Admin ID: <b>1122334455</b></p>
                    </div>
                </>
            )}

            {currStep === 2 && (
                <>
                    <p className="otp-sent-text">Enter OTP sent to <b>{mobile}</b></p>
                    <div className="input-group">
                        <FaLock className="input-icon"/>
                        <input type="text" placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={4} required />
                    </div>
                    <button onClick={handleVerifyOtp}>Verify & Proceed</button>
                    <p className="resend-text" onClick={() => setCurrStep(1)}>Wrong number?</p>
                </>
            )}

            {currStep === 3 && (
                <>
                    <div className="input-group">
                        <FaUser className="input-icon"/>
                        <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <button onClick={handleSignup}>Create Account</button>
                </>
            )}
        </form>
      </div>
    </div>
  )
}

export default LoginPopup;