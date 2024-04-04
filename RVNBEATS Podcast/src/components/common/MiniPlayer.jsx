import React from 'react';

const MiniPlayer = ({ episode, onClose }) => {
  return (
    <div className="mini-player">
      <audio controls autoPlay>
        <source src={episode.file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <i className="fa-solid fa-xmark player-icon" style={{ color: "#384182" }} onClick={onClose}></i>
    </div>
  );
};

export default MiniPlayer;
