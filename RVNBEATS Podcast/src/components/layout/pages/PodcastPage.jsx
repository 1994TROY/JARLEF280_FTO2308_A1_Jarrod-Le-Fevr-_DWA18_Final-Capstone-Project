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

  const sortPodcasts = (field, order) => {
    const sortedPodcasts = [...podcasts].sort((a, b) => {
      if (field === 'title') {
        return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      } else if (field === 'date') {
        return order === 'asc' ? new Date(a.updated) - new Date(b.updated) : new Date(b.updated) - new Date(a.updated);
      }
    });
    setPodcasts(sortedPodcasts);
  };

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="podcast-page">
      <div className="podcast-background">
        <img src="/images/Podcast Background.png" alt="RVNBEATS Podcast Background" className="podcast-bg" />
      </div>
      <div className="filter-buttons">
        <button onClick={() => sortPodcasts('title', 'asc')}>Title A-Z</button>
        <button onClick={() => sortPodcasts('title', 'desc')}>Title Z-A</button>
        <button onClick={() => sortPodcasts('date', 'asc')}>Date Ascending</button>
        <button onClick={() => sortPodcasts('date', 'desc')}>Date Descending</button>
      </div>
      {/* Add this div just before your podcast-content div */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for podcasts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="podcast-content">
        {podcasts.length > 0 ? (
          <div className="podcast-grid">
            {podcasts.filter(podcast => podcast.title.toLowerCase().includes(searchTerm.toLowerCase())).map(podcast => (
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
