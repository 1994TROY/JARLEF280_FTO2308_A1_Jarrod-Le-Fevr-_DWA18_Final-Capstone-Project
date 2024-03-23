// SearchBar.jsx
import React from 'react';
import './SearchBar.css'; // Make sure to import the CSS file

const SearchBar = ({ placeholder }) => {
  return (
    <div className="search-container">
      <input className="search-input" type="text" placeholder={placeholder} />
    </div>
  );
};

export default SearchBar;
