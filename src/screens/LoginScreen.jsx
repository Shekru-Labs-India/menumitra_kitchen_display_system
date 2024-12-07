import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import './LoginScreen.css'

function LoginScreen() {
  const [mobileNumber, setMobileNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [otpValues, setOtpValues] = useState(['', '', '', ''])
  const otpRefs = [useRef(), useRef(), useRef(), useRef()]

  const handleMobileSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await authService.sendOTP(mobileNumber)
      if (result.success) {
        setShowOtp(true)
      } else {
        setError(result.error || 'Invalid mobile number')
      }
    } catch (err) {
      setError('Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await authService.verifyOTP(mobileNumber, otp)
      if (result.success) {
        navigate("/orders");
      } else {
        setError(result.error || 'Invalid OTP')
      }
    } catch (err) {
      setError('Failed to verify OTP')
    } finally {
      setLoading(false)
    }
  }

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return // Prevent multiple digits

    const newOtpValues = [...otpValues]
    newOtpValues[index] = value
    setOtpValues(newOtpValues)
    setOtp(newOtpValues.join('')) // Update the main OTP state

    // Move to next input if value is entered
    if (value !== '' && index < 3) {
      otpRefs[index + 1].current.focus()
    }
  }

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otpValues[index] === '' && index > 0) {
        otpRefs[index - 1].current.focus()
      }
    }
  }

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 4)
    const newOtpValues = [...otpValues]
    
    pastedData.split('').forEach((char, index) => {
      if (index < 4 && /^\d$/.test(char)) {
        newOtpValues[index] = char
      }
    })
    
    setOtpValues(newOtpValues)
    setOtp(newOtpValues.join(''))
  }

  return (
    <>
      <div className="min-vh-100 d-flex align-items-center bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-5">
                  {/* Logo or Brand */}
                  <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">MenuMitra</h2>
                    <p className="text-muted">Customer Display System</p>
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <div
                      className="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      {error}
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setError("")}
                      ></button>
                    </div>
                  )}

                  {!showOtp ? (
                    // Mobile Number Form
                    <form onSubmit={handleMobileSubmit}>
                      <div className="mb-4">
                        <label
                          htmlFor="mobile"
                          className="form-label text-muted fw-bold small"
                        >
                          Mobile Number
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-white">+91</span>
                          <input
                            type="tel"
                            className="form-control form-control-lg"
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
                        className="btn btn-primary btn-lg w-100"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
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
                      <div className="mb-4">
                        <label
                          htmlFor="otp-1"
                          className="form-label text-muted fw-bold small"
                        >
                          Enter OTP
                        </label>
                        <div className="d-flex gap-2 gap-md-3">
                          {[0, 1, 2, 3].map((index) => (
                            <input
                              key={index}
                              ref={otpRefs[index]}
                              type="text"
                              className="form-control form-control-lg text-center fw-bold"
                              style={{
                                width: '60px',
                                height: '60px',
                                fontSize: '24px'
                              }}
                              value={otpValues[index]}
                              onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
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
                        <div className="form-text text-center mt-2">Default OTP: 1234</div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 mb-3"
                        disabled={loading || otpValues.some(v => v === '')}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Verifying...
                          </>
                        ) : (
                          "Verify OTP"
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-link w-100 text-decoration-none"
                        onClick={() => {
                          setShowOtp(false)
                          setOtpValues(['', '', '', ''])
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
    </>
  );
}

export default LoginScreen
