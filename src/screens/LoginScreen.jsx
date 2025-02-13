import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import "./LoginScreen.css";
import { messaging } from '../firebase-config';
import { getToken } from 'firebase/messaging';
import { VAPID_KEY } from '../config';
import logo from "../assets/logo.png"; 

function LoginScreen() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const generateFCMToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
        console.log("FCM Token:", token);
        return token;
      }
      console.log("Notification permission denied");
      return null;
    } catch (error) {
      console.error("Error generating FCM token:", error);
      return null;
    }
  };

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Check if the first digit is between 0 and 5
    if (/^[0-5]/.test(mobileNumber)) {
      setError("Mobile number cannot start with digits between 0 and 5.");
      setLoading(false);
      return;
    }

    try {
      const result = await authService.sendOTP(mobileNumber);
      if (result.success) {
        setShowOtp(true);
      } else {
        setError(result.error || "Invalid mobile number");
      }
    } catch (err) {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const fcmToken = await generateFCMToken();
      if (!fcmToken) {
        window.showToast("error", "Failed to generate notification token");
        return;
      }

      const combinedOtp = otpValues.join("");
      const response = await authService.verifyOTP(mobileNumber, combinedOtp, fcmToken);

      if (response.st === 1) {
        localStorage.setItem("user_id", response.user_id);
        localStorage.setItem("outlet_id", response.outlet_id);
        localStorage.setItem("outlet_name", response.outlet_name);
        localStorage.setItem("image", response.image);
        localStorage.setItem("fcmToken", fcmToken);
        localStorage.setItem("access", response.access);

        navigate("/orders");
      } else {
        setError(response.msg || "Invalid OTP");
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      setError("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    setOtp(newOtpValues.join(""));
    if (value !== "" && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otpValues[index] === "" && index > 0) {
        otpRefs[index - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    const newOtpValues = [...otpValues];
    pastedData.split("").forEach((char, index) => {
      if (index < 4 && /^\d$/.test(char)) {
        newOtpValues[index] = char;
      }
    });
    setOtpValues(newOtpValues);
    setOtp(newOtpValues.join(""));
  };

  // Handle mobile number input change and restrict starting from 0-5
  const handleMobileNumberChange = (e) => {
    const newMobileNumber = e.target.value;

    // Check if the first digit is between 0 and 5
    if (/^[0-5]/.test(newMobileNumber)) {
      // setError("Mobile number cannot start with digits between 0 and 5.");
    } else {
      setError(""); // Clear the error if valid
    }

    // Set the mobile number only if it doesn't start with 0-5
    if (!/^[0-5]/.test(newMobileNumber)) {
      setMobileNumber(newMobileNumber);
    }
  };

  const isMobileNumberValid = (number) => {
    return /^[6-9]\d{9}$/.test(number); // This checks that the number starts from 6 to 9 and is 10 digits
  };

  const isOtpComplete = otpValues.every((value) => value !== ""); // Check if all OTP fields are filled

  useEffect(() => {
    if (showOtp) {
      otpRefs[0].current.focus(); // Focus on the first OTP field when OTP screen is shown
    }
  }, [showOtp]); // This will run when showOtp changes

  return (
    <div className="login-screen-container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4">
        <div className="text-center mb-4">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <img src={logo} alt="Logo" className="logo" />
            <h2 className="fw-bold text-black ms-3">MenuMitra</h2>
          </div>
          <p className="text-muted">Kitchen Display System</p>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError("")}></button>
          </div>
        )}

        {!showOtp ? (
          <form onSubmit={handleMobileSubmit}>
            <div className="mb-4">
              <label htmlFor="mobile" className="form-label text-muted fw-bold small">Mobile Number</label>
              <div className="input-group">
                <span className="input-group-text bg-white">+91</span>
                <input
                  type="number"
                  className=" fs-5 border border-gray form-control-lg"
                  id="mobile"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange} // Use the new handler
                  maxLength="10"
                  required
                  disabled={loading}
                  placeholder="Enter mobile number"
                  autoFocus
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-100" 
              disabled={loading || !isMobileNumberValid(mobileNumber)}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-4">
              <label htmlFor="otp-1" className="form-label text-center text-muted fw-bold small">Enter OTP</label>
              <div className="d-flex gap-5 justify-content-center">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    className="border border-gray form-control-lg text-center fw-bold otp-input"
                    value={otpValues[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    maxLength="1"
                    required
                    disabled={loading}
                    autoComplete="off"
                    inputMode="numeric"
                    pattern="\d"
                  />
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100 mb-3" disabled={loading || !isOtpComplete}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button type="button" className="btn btn-link w-100 text-decoration-none" onClick={() => setShowOtp(false)} disabled={loading}>
              <span>Change Mobile Number</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
