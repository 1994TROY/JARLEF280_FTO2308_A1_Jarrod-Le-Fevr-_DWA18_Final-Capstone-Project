// Footer.jsx
import React from "react";
import { useAudioPlayer } from "../common/AudioPlayerContext";
import "./Footer.css";

const Footer = () => {
  const { audioDetails, stopEpisode } = useAudioPlayer();

  const handleStopClick = () => {
    if (window.confirm("Are you sure you want to stop playing this episode?")) {
      stopEpisode();
    }
  };

  if (!audioDetails.playing) return null;

  return (
    <div className="footer">
      <div className="footer-content">
        <h3 className="footer-title">{audioDetails.episode.title}</h3>
        <audio controls autoPlay className="footer-audio-player">
          <source src={audioDetails.episode.file} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <i
          className="fa-solid fa-xmark player-icon"
          onClick={handleStopClick}
        ></i>
      </div>
    </div>
  );
};

export default Footer;
