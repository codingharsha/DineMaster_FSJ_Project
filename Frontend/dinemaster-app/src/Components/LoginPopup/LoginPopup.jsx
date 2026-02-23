import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPopup.scss';
import { StoreContext } from '../../Context/StoreContext';
import { FaMobileAlt, FaLock, FaUser, FaTimes } from "react-icons/fa"; 

const LoginPopup = ({ setShowLogin }) => {

  const {sendOtp, verifyOtp } = useContext(StoreContext);
  const navigate = useNavigate();

  const [currStep, setCurrStep] = useState(1);
  const [isNewUser, setIsNewUser] = useState(false);
  const [data, setData] = useState({
    name: "",
    mobile: "",
    otp: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({...prev, [name]: value}));
  }

  // const onLogin = async(event) =>{
  //   event.preventDefault();
  //
  //   if(currStep == "get-otp"){
  //       const success = await sendOtp(data.mobile);
  //       if(success){
  //           setCurrStep("verify");
  //       }else{
  //           const success = await verifyOtp(data);
  //           if(success){
  //               setShowLogin(false);
  //           }
  //       }
  //   }
  // }

  const handleSendOtp = async(e) => {
      e.preventDefault();
      if(data.mobile.length < 10){
          alert("Please enter a valid mobile number!");
          return;
      }

      const result = await sendOtp(data.mobile);
        if (result) {
        setIsNewUser(!result.userExists);
        setCurrStep(2);
        } else {
        alert("Failed to send OTP. Check backend.");
      }
  };

const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const success = await verifyOtp(data);

    if (success) {
        setShowLogin(false);

        const role = localStorage.getItem("userRole");

        if (role === "ADMIN") {
            navigate("/admin/dashboard");
        } else if (role === "KITCHEN_STAFF") {
            navigate("/kitchen");
        } else {
            navigate("/");
        }
    }
};

  return (
      <div className='login-popup'>
          <div className="login-popup-container">
              <div className="login-popup-title">
                  <h2>{currStep === 1 ? "Login" : "Verification"}</h2>
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
                              <input name="mobile" type="tel" placeholder='Mobile Number' value={data.mobile} onChange={onChangeHandler} required />
                          </div>
                          <button onClick={handleSendOtp}>Continue</button>
                      </>
                  )}

                  {currStep === 2 && (
                      <>
                          <p className="otp-sent-text">Enter OTP sent to <b>{data.mobile}</b></p>
                          {isNewUser && (
                            <div className="input-group">
                                <FaUser className="input-icon"/>
                                <input
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                value={data.name}
                                onChange={onChangeHandler}
                                required/>
                            </div>)
                           }
                          <div className="input-group">
                              <FaLock className="input-icon"/>
                              <input name="otp" type="text" placeholder='Enter 4-digit OTP' value={data.otp} onChange={onChangeHandler} maxLength={4} required />
                          </div>
                          <button onClick={handleVerifyOtp}>Verify & Proceed</button>
                          <p className="resend-text" onClick={() => setCurrStep(1)}>Wrong number?</p>
                      </>
                  )}
              </form>
          </div>
      </div>
  )
}

export default LoginPopup;