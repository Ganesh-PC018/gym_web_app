// // src/components/Header.js
// import React, { useEffect } from 'react';
// import '../styles/Header.css';
// import profile from '../assets/profile.png';
// import { useAuth } from "../context/AuthContext"; // ✅
// import { useNavigate, Link } from "react-router-dom";

// const Header = () => {
// const { admin } = useAuth();
// const navigate = useNavigate();
// const { logout } = useAuth();
// const handleLogOut = (e) => {
//   e.preventDefault();
//   logout(); // Clears admin session from context/localStorage/etc.
//   navigate('/');
// };
//   // Redirect to login if profile is clicked and not logged in
//   const handleProfileClick = () => {
//     // e.preventDefault();
//     if (!admin) {
//       navigate("/admin-login");
//     }
   
//   };

//   return (
//     <header className="header">
//       <div className="container header-container">
//         <Link to="/" className="logo">GYM-CRAZE</Link>
//         <nav className="main-nav">
//           <ul>
//             <li><a href="/#about">About</a></li>
//             <li><a href="/#classes">Classes</a></li>
//             <li><a href="/#pricing">Pricing</a></li>
//             <li><a href="/#contact">Contact</a></li>
//           </ul>
//         </nav>

//         <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
//           <li className="nav-item dropdown">
//             <a
//               href="#"
//               className="nav-link dropdown-toggle"
//               id="navbarDropdown"
//               role="button"
//               data-bs-toggle="dropdown"
//               aria-expanded="true"
//               onClick={handleProfileClick}
//             >
//               <img src={profile}  alt="Profile" width={32} height={32} />
//             </a>

//             {admin && (
//               <ul className="dropdown-menu dropdown-menu-end" id="drop" aria-labelledby="navbarDropdown">
//                 <li>
//                   <Link to="/admin" className="dropdown-item">Dashboard</Link>
//                 </li>
//                 <li>
//                   <Link to="/admin" className="dropdown-item">Fees Update</Link>
//                 </li>
//                 <li>
//                   <Link to="/admin" className="dropdown-item">Peoples Reached</Link>
//                 </li>
//                 <li><hr className="dropdown-divider" /></li>
//                 <li>
//                   <a href="#" className="dropdown-item" onClick={handleLogOut}>Log out</a>
//                 </li>
//               </ul>
//             )}
//           </li>
//         </ul>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import '../styles/Header.css';
import profile from '../assets/profile.png';
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const handleProfileClick = () => {
    if (!admin) {
      navigate("/admin-login");
    }
  };

  return (
    <header className="header">
      <div className="container header-container">

        {/* Hamburger icon for mobile */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link to="/" className="logo">GYM-CRAZE</Link>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="/#classes" onClick={() => setMenuOpen(false)}>Classes</a></li>
            <li><a href="/#pricing" onClick={() => setMenuOpen(false)}>Pricing</a></li>
            <li><a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>

        {/* Profile dropdown */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="true"
              onClick={handleProfileClick}
            >
              <img src={profile} alt="Profile" width={32} height={32} />
            </a>

            {admin && (
              <ul className="dropdown-menu dropdown-menu-end" id="drop" aria-labelledby="navbarDropdown">
                <li><Link to="/admin" className="dropdown-item">Dashboard</Link></li>
                <li><Link to="/admin" className="dropdown-item">Fees Update</Link></li>
                <li><Link to="/admin" className="dropdown-item">Peoples Reached</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a href="#" className="dropdown-item" onClick={handleLogOut}>Log out</a></li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
