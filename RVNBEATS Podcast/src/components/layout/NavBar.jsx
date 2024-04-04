import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = ({ isOpen }) => {
  const sidebarClass = isOpen ? 'sidebar' : 'sidebar closed';

  return (
    <div className={sidebarClass}>
      <div className="logo-container">
      <img src="/images/RvnLogo.png" alt="RVNBEATS Logo" className="navbar-logo" />
      </div>
      <nav className="navbar">
        <NavLink to="/dashboard" className="nav-item">
          <i className="fa fa-home"></i>
          Dashboard
        </NavLink>
        <NavLink to="/podcast" className="nav-item">
          <i className="fa fa-podcast"></i>
          Podcast
        </NavLink>
        <NavLink to="/Favorites" className="nav-item">
  <i className="fa-solid fa-heart" style={{ color: "#ffffff" }}></i>
  Favorite
</NavLink>
        <NavLink to="/login" className="nav-item">
          <i className="fa fa-sign-out-alt"></i>
          Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
