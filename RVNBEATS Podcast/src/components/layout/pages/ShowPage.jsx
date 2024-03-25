// ShowPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader';
import EpisodeCard from '../../common/EpisodeCard';
import './ShowPage.css';

const ShowPage = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  // Initialize selectedSeason with null, will be set to a season ID later
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then(response => response.json())
      .then(data => {
        setShowDetails(data);
        // Set the ID of the first season if seasons are available
        if (data.seasons?.length) {
          setSelectedSeason(data.seasons[0].id);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching show details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!showDetails) {
    return <p>Unable to load show details. Please try again later.</p>;
  }

   // Update the selected season based on dropdown change
   const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  // Find the episodes of the selected season
  const selectedSeasonEpisodes = showDetails.seasons?.find(season => season.id === selectedSeason)?.episodes || [];


  return (
    <div className="show-page">
      <div className="podcast-background">
        <img src="/images/show.png" alt="RVNBEATS Podcast Background" className="show-bg" />
      </div>
      <div className="show-container">
        <img src={showDetails.image} alt={showDetails.title} className="show-image" />
        <div className="show-details">
          <div className="show-content">
            <h1 className="show-title">{showDetails.title}</h1>
            <p className="show-description">{showDetails.description}</p>
          </div>
          <div className="season-selector">
            <label htmlFor="season-dropdown">Select Season:</label>
            <select id="season-dropdown" onChange={handleSeasonChange} value={selectedSeason?.id}>
    {showDetails.seasons.map((season) => (
      <option key={season.id} value={season.id}>
        {season.title || `Season ${season.number}`} {/* Display season title or 'Season X' */}
      </option>
    ))}
  </select>
          </div>
        </div>
      </div>
      <div className="season-episodes">
        {selectedSeasonEpisodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
    </div>
  );
};

export default ShowPage;
