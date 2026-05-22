import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPopup.scss';
import { StoreContext } from '../../Context/StoreContext';
import { FaTimes } from "react-icons/fa";

const LoginPopup = ({ setShowLogin }) => {
  const { checkIdentity,sendOtp ,verifyOtp, loginWithPassword } = useContext(StoreContext);
  const navigate = useNavigate();

  const [step, setStep] = useState("IDENTIFIER");
  const [authMethod, setAuthMethod] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const routeByTokenRole = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = (payload?.roles?.[0] || "").replace("ROLE_", "");
      if (role === "ADMIN") navigate("/admin/dashboard");
      else if (role === "KITCHEN_STAFF") navigate("/kitchen");
      else navigate("/");
    } catch {
      navigate("/");
    }
  };

  const handleIdentifierSubmit = async (event) => {
    event.preventDefault();
    if (!identifier.trim()) {
      alert("Please enter mobile number or email.");
      return;
    }
    setLoading(true);
    try {
      const result = await checkIdentity(identifier.trim());
      if (result?.authMethod === "OTP") {
        await sendOtp(identifier.trim());
      }
      setAuthMethod(result?.authMethod || "");
      setIsNewUser(!!result?.newUser);
      setStep("AUTH");
    } catch (error) {
      alert(error?.response?.data?.message || "Identity check failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    if (isNewUser && !name.trim()) {
      alert("Please enter your name.");
      return;
    }

    setLoading(true);
    try {
      const success = await verifyOtp({
        identifier: identifier.trim(),
        otp,
        name: name.trim(),
      });
      if (!success) {
        alert("Unable to complete login. Please try again.");
        return;
      }
      setShowLogin(false);
      routeByTokenRole();
    } catch (error) {
      alert(error.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (!password.trim()) {
      alert("Please enter password.");
      return;
    }
    setLoading(true);
    try {
      await loginWithPassword({ identifier: identifier.trim(), password });
      setShowLogin(false);
      routeByTokenRole();
    } catch (error) {
      alert(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-popup'>
      <div className="login-popup-container">
        <div className="login-accent-strip" />
        <div className="login-popup-title">
          <div>
            <h2>Welcome Back</h2>
            <p className="title-subtext">
              {step === "IDENTIFIER"
                ? "Enter mobile number or email to continue"
                : authMethod === "PASSWORD"
                  ? "Enter your work account password"
                  : "Enter the 6-digit OTP sent to your identifier"}
            </p>
          </div>
          <FaTimes onClick={() => setShowLogin(false)} className="close-icon" />
        </div>

        {step === "IDENTIFIER" && (
          <form className="login-popup-inputs" onSubmit={handleIdentifierSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder='Mobile Number or Email'
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>{loading ? "Checking..." : "Continue"}</button>
          </form>
        )}

        {step === "AUTH" && authMethod === "OTP" && (
          <form className="login-popup-inputs" onSubmit={handleOtpSubmit}>
            {isNewUser && (
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="input-group">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
              />
            </div>
            <button type="submit" disabled={loading}>{loading ? "Verifying..." : "Verify & Proceed"}</button>
            <p className="resend-text" onClick={() => setStep("IDENTIFIER")}>Change identifier</p>
          </form>
        )}

        {step === "AUTH" && authMethod === "PASSWORD" && (
          <form className="login-popup-inputs" onSubmit={handlePasswordSubmit}>
            <div className="input-group">
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
            <p className="resend-text" onClick={() => alert("Please contact Admin to reset your work account password.")}>
              Forgot Password?
            </p>
            <p className="resend-text" onClick={() => setStep("IDENTIFIER")}>Use another identifier</p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
