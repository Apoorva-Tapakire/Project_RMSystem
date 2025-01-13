import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/Navbar.css'; // Import the CSS file

const Navbar = () => {

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    window.location.reload(); // Reload the page to update the navbar
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h2>Restaurant</h2>
        </Link>
        <div className="navbar-links">
          {!localStorage.getItem('token') ? (
            <>
              <Link to="/signup" className="navbar-link">
                Signup
              </Link>
              
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              
            </>
          ) : (
            <>
             
              {/* <Link to="/adminmenu" className="navbar-link">AdminMenu</Link>
              <Link to="/menu" className="navbar-link">Menu</Link> */}
              <button onClick={handleLogout} className="navbar-button">Logout</button>
            </>
          ) 
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
