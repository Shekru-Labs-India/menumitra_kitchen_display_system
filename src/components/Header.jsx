import React from "react";
import { Link, useLocation } from "react-router-dom";
import hotelLogo from "../assets/Hotel.png";

function Header() {
  const location = useLocation();
  const restaurantName = localStorage.getItem("restaurantName");

  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.clear();
    // The Link component will handle the navigation to /login
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="navbar navbar-light py-2">
        <div className="container-fluid px-5">
          {/* Brand/Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src={hotelLogo}
              alt="Hotel Logo"
              className="me-2 rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="fs-4 fw-bold">{restaurantName?.toUpperCase()}</span>
          </Link>

          {/* Call Waiter Button */}
          <div className="d-flex justify-content-center position-absolute start-50 translate-middle-x">
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                alert("Waiter Called!");
              }}
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
