import React from "react";
import { Link, useLocation } from "react-router-dom";
import hotelLogo from "../assets/Hotel.png";

function Header() {
  const location = useLocation();
  const restaurantName = localStorage.getItem("restaurantName");
  return (
    <header className="bg-white shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light py-2">
        <div className="container-fluid px-5">
          {/* Brand/Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src={hotelLogo}
              alt="Hotel Logo"
              className="me-2 rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="fs-4 fw-bold">{restaurantName.toUpperCase()}</span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>


          {/* Call Waiter Button */}
          <div className="d-flex justify-content-center position-absolute start-50 translate-middle-x">
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                // Add your call waiter logic here
                alert("Waiter Called!");
              }}
            >
              <i className="bx bx-bell me-2"></i>
              Call Waiter
            </button>
          </div>

          {/* Navigation Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-3">
              {/* Logout Button */}
              <li className="nav-item fs-3">
                <Link to="/login" className="nav-link px-3 text-dark">
                  <i className="bx bx-log-out"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

// Clock Component
function Clock() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="d-flex align-items-center">
      <i className="bi bi-clock me-2"></i>
      {time.toLocaleTimeString()}
    </div>
  );
}

export default Header;
