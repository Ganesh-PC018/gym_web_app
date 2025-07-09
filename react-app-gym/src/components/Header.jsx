// src/components/Header.js
import React, { useState, useEffect, useRef } from 'react';
import '../styles/Header.css';
import profile from '../assets/profile.png';
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
    setDropdownOpen(false); // Close dropdown on logout
    navigate('/');
  };

  // Toggle dropdown and redirect if not logged in
  const handleProfileClick = () => {
    if (!admin) {
      navigate("/admin-login");
    } else {
      setDropdownOpen(prev => !prev); // Toggle dropdown visibility
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">GYM-CRAZE</Link>

        {/* Hamburger icon for mobile */}
        <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="/#classes" onClick={() => setMenuOpen(false)}>Classes</a></li>
            <li><a href="/#pricing" onClick={() => setMenuOpen(false)}>Pricing</a></li>
            <li><a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>

        {/* Profile Dropdown */}
        <div className="profile-dropdown-container" ref={dropdownRef}>
          <button
            className="profile-button"
            onClick={handleProfileClick}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <img src={profile} alt="Profile" width={38} height={38} />
          </button>

          {admin && (
            <div className={`profile-dropdown ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
              <div className="dropdown-header">
                <span className="dropdown-username">Admin</span>
                <small>Welcome back!</small>
              </div>
              <Link to="/admin" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Dashboard</Link>
              <Link to="/admin" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Fees Update</Link>
              <Link to="/admin" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Peoples Reached</Link>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item logout" onClick={handleLogOut}>
                <i className="fas fa-sign-out-alt"></i> Log Out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;