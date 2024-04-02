import React from 'react';
import Carousel from '../../common/Carousel'; // Import the Carousel component
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="welcome-section">
        <img src="/images/landinghome.png" alt="RVN Logo" className="dash-bg" />
        <div className="welcome-text">WELCOME TO RVNBEATS PODCAST</div>
      </div>
      <div className="recommended-shows">
        <h2>Your Recommended Shows</h2>
      </div>
      <Carousel />
    </div>
  );
};

export default Landing;
