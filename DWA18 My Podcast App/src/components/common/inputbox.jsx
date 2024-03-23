// InputBox.jsx
import React from 'react';
import './InputBox.css'; // Make sure to import the CSS file

const InputBox = ({ label, type, name, placeholder }) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} name={name} placeholder={placeholder} />
    </div>
  );
};

export default InputBox;
