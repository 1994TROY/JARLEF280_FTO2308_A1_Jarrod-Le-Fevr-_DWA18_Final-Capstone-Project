// PodcastPage.jsx
import React, { useState, useEffect } from 'react';
import './PodcastPage.css'; // Make sure the path is correct

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
      <img src="/images/Podcast Background.png" alt="RVNBEATS Podcast Background" className="podcast-bg" />
      <div className="content">
        {podcasts.length > 0 ? (
          podcasts.map(podcast => (
            <div key={podcast.id} className="podcast-item">
              <h3>{podcast.title}</h3>
              {/* Display other podcast information here */}
            </div>
          ))
        ) : (
          <p>Loading podcasts...</p> // This will show while the podcasts are being fetched
        )}
      </div>
    </div>
  );
};

export default PodcastPage;
