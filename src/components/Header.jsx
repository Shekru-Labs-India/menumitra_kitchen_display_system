import React, { useEffect, useState, useRef, use } from "react";
import { Link, useLocation } from "react-router-dom";
import hotelLogo from "../assets/Hotel.png";
import axios from 'axios';
function Header() {
  const location = useLocation();
  const outletName = localStorage.getItem("outlet_name");
  const [loading, setLoading] = useState(false);
  const image = localStorage.getItem("image");
    const [isImageError, setIsImageError] = useState(false);
  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.clear();
    // The Link component will handle the navigation to /login
  };


  const handleCallWaiter = async () => {
    setLoading(true);

    const outlet_id = localStorage.getItem('outlet_id');
    const user_id = localStorage.getItem('user_id');

    console.log('Outlet ID:', outlet_id);
    console.log('User ID:', user_id);

    try {
        const response = await axios.post('https://men4u.xyz/common_api/call_waiter', {
            outlet_id: parseInt(outlet_id),
            user_id: parseInt(user_id),
        });

        if (response.data.st === 1) {
            window.showToast?.('success', 'Waiter has been called successfully');
        } else {
            window.showToast?.('error', response.data.msg || 'Failed to call the waiter');
        }
    } catch (error) {
        console.error('Error Object:', error); // Logs the complete error object
        window.showToast?.(
            'error',
            error.response?.data?.msg || error.message || 'Something went wrong. Please try again later.'
        );
    } finally {
        setLoading(false);
    }
};
  return (
    <header className="bg-white shadow-sm">
      <nav className="navbar navbar-light py-2">
        <div className="container-fluid px-5">
          {/* Brand/Logo */}
          {!isImageError && image ? (
  <Link to="/" className="navbar-brand d-flex align-items-center">
    <img
      src={image}
      alt="Hotel Logo"
      className="me-2 rounded-circle"
      style={{ width: "40px", height: "40px" }}
      onError={() => setIsImageError(true)} 
    />
    <span className="fs-4 fw-bold">{outletName?.toUpperCase()}</span>
  </Link>
) : (
  <Link to="/" className="navbar-brand d-flex align-items-center">
    <div
      className="me-2 d-flex justify-content-center align-items-center rounded-circle"
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "#ddd",
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      {outletName?.[0]?.toUpperCase() || "H"}
    </div>
    <span className="fs-4 fw-bold">{outletName?.toUpperCase() || "HOTEL"}</span>
  </Link>
)}

      

      

          {/* Call Waiter Button */}
          <div className="d-flex justify-content-center position-absolute start-50 translate-middle-x">
            <button
              className="btn btn-outline-primary"
            onClick={handleCallWaiter}
            
            >
              <i className="bx bx-bell me-2"></i>
              Call Waiter
            </button>
          </div>

          {/* Logout Button - Always Visible */}
          <div className="d-flex align-items-center">
            <Link 
              to="/login" 
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              <i className="bx bx-log-out"></i>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
