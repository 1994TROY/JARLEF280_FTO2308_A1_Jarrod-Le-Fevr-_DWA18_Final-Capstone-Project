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
      <button
        className={`toggle-button ${isSidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? 'X' : '☰'} {}
      </button>
      <NavBar isOpen={isSidebarOpen} />
    </header>
  );
};

export default Header;
