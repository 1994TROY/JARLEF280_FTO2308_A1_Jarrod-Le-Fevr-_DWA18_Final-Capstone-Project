// Header.jsx
import React, { useState } from 'react';
import './Header.css';
import NavBar from './NavBar';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="app-header">
      {/* You can place other header content here as needed */}
      <button className="toggle-button" onClick={toggleSidebar}>
        ☰
      </button>
      <NavBar isOpen={isSidebarOpen} />
    </header>
  );
};

export default Header;
