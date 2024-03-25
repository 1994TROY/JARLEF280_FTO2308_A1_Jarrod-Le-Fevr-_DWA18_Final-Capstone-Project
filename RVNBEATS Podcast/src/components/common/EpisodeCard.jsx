import React, { useState } from 'react';
import './EpisodeCard.css'; // Ensure the CSS file is correctly linked
import Favicon from './Favicon'; // Import Favicon component

const EpisodeCard = ({ episode }) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const handleIconClick = () => {
    setIsPlayerVisible(!isPlayerVisible);
  };

  return (
    <div className="episode-card">
      <h3 className="episode-title">{episode.title}</h3>
      <p className="episode-description">{episode.description}</p>
      <div className="audio-player-container">
        <Favicon />
        {isPlayerVisible ? (
          <>
            <audio controls className={`audio-player ${isPlayerVisible ? 'visible' : ''}`} autoPlay style={{ marginLeft: '15px', marginRight: '15px' }}>
              <source src={episode.file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <i className="fa-solid fa-xmark player-icon" style={{color: "#384182"}} onClick={handleIconClick}></i>
          </>
        ) : (
          <i className="fa-solid fa-headphones-simple player-icon" style={{color: "#384182"}} onClick={handleIconClick}></i>
        )}
      </div>
    </div>
  );
};

export default EpisodeCard;
