import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import "./LoginScreen.css";
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

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authService.verifyOTP(mobileNumber, otp);
      if (result.success) {
        navigate("/orders");
      } else {
        setError(result.error || "Invalid OTP");
      }
    } catch (err) {
      setError("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple digits

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    setOtp(newOtpValues.join("")); // Update the main OTP state

    // Move to next input if value is entered
    if (value !== "" && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otpValues[index] === "" && index > 0) {
        otpRefs[index - 1].current.focus();
      }
    }
  };

  // Handle paste
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

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-3 py-sm-0">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-3 p-sm-4 p-lg-5">
                {/* Logo and Brand */}
                <div className="text-center mb-4">
                  <div className="d-flex justify-content-center align-items-center mb-2">
                    <img
                      src={logo}
                      alt="MenuMitra"
                      className="img-fluid"
                      style={{ maxHeight: '40px' }}
                    />
                    <h2 className="fw-bold text-dark ms-3 mb-0 fs-3 fs-md-2">MenuMitra</h2>
                  </div>
                  <p className="text-muted small mb-0">Kitchen Display System</p>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="alert alert-danger alert-dismissible fade show py-2 small" role="alert">
                    {error}
                    <button type="button" className="btn-close p-2" onClick={() => setError("")}></button>
                  </div>
                )}

                {!showOtp ? (
                  // Mobile Number Form
                  <form onSubmit={handleMobileSubmit}>
                    <div className="mb-3 mb-lg-4">
                      <label htmlFor="mobile" className="form-label text-muted fw-semibold small">
                        Mobile Number
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-white px-3">+91</span>
                        <input
                          type="tel"
                          className="form-control"
                          id="mobile"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          maxLength="10"
                          required
                          disabled={loading}
                          placeholder="Enter mobile number"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" />
                          Sending OTP...
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </form>
                ) : (
                  // OTP Form
                  <form onSubmit={handleOtpSubmit}>
                    <div className="mb-3 mb-lg-4">
                      <label className="form-label text-muted fw-semibold small">
                        Enter OTP
                      </label>
                      <div className="d-flex justify-content-center gap-2 gap-sm-3">
                        {[0, 1, 2, 3].map((index) => (
                          <input
                            key={index}
                            ref={otpRefs[index]}
                            type="text"
                            className="form-control text-center fw-bold p-0"
                            style={{
                              width: '42px',
                              height: '42px',
                              fontSize: '1.2rem',
                              '@media (min-width: 576px)': {
                                width: '50px',
                                height: '50px'
                              }
                            }}
                            value={otpValues[index]}
                            onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            maxLength="1"
                            required
                            disabled={loading}
                            autoComplete="off"
                            inputMode="numeric"
                          />
                        ))}
                      </div>
                      <div className="form-text text-center mt-2 small">
                        Default OTP: 1234
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-2 mb-2"
                      disabled={loading || otpValues.some((v) => v === "")}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" />
                          Verifying...
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-link w-100 text-decoration-none p-2"
                      onClick={() => {
                        setShowOtp(false);
                        setOtpValues(["", "", "", ""]);
                      }}
                      disabled={loading}
                    >
                      ← Change Mobile Number
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
