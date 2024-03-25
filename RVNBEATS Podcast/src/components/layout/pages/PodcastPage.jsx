// PodcastPage.jsx
import React, { useState, useEffect } from 'react';
import Podcard from '../../common/Podcard.jsx'; 
import './PodcastPage.css'; 
import Loader from '../../common/Loader';

const PodcastPage = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => setPodcasts(data))
      .catch(error => console.error('Error fetching podcasts:', error));
  }, []);

  return (
    <div className="podcast-page">
      {/* Background image container */}
      <div className="podcast-background">
      <img src="/images/Podcast Background.png" alt="RVNBEATS Podcast Background" className="podcast-bg" />
      </div>

      {/* Content container */}
      <div className="podcast-content">
      {podcasts.length > 0 ? (
  <div className="podcast-grid">
    {podcasts.map(podcast => (
      <Podcard key={podcast.id} podcast={podcast} />
    ))}
  </div>
) : (
  <Loader /> 
)}
      </div>
    </div>
  );
};

export default PodcastPage;