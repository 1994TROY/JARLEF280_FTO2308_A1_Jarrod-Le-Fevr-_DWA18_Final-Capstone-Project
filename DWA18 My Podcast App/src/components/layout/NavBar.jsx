// NavBar.jsx
import React from 'react';
import './NavBar.css';

const NavBar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Sidebar content */}
      <nav>
        {/* Navigation items */}
      </nav>
    </aside>
  );
};

export default NavBar;
