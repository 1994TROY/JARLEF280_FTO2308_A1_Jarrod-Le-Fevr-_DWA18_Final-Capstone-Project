// PodcastPage.jsx
import React, { useState, useEffect } from 'react';

const PodcastPage = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => setPodcasts(data))
      .catch(error => console.error('Error fetching podcasts:', error));
  }, []);

  return (
    <div>
      {podcasts.map(podcast => (
        <div key={podcast.id}>
          <h3>{podcast.title}</h3>
          {/* Display other podcast information here */}
        </div>
      ))}
    </div>
  );
};

export default PodcastPage;
