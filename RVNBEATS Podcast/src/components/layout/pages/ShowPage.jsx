// ShowPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate here
import Loader from '../../common/Loader';
import EpisodeCard from '../../common/EpisodeCard';
import './ShowPage.css';

const ShowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate hook
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setShowDetails(data);
        setSelectedSeason(data.seasons?.[0]); // Set to first season by default
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching show details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleSeasonChange = (event) => {
    const seasonId = event.target.value;
    const season = showDetails.seasons.find(s => s.id === seasonId);
    setSelectedSeason(season); // This will set the entire season object including its episodes
  };

  return (
    <div className="show-page">
      <div className="back-button-container">
        <i className="fa-solid fa-circle-arrow-left" style={{ color: "#f79534" }} onClick={() => navigate(-1)}></i>
      </div>
      {loading && <Loader />}
      {showDetails && !loading && (
        <>
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
                      {season.title || `Season ${season.number}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="season-episodes">
            {selectedSeason?.episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </>
      )}
      {!showDetails && !loading && <p>Unable to load show details. Please try again later.</p>}
    </div>
  );
};

export default ShowPage;
