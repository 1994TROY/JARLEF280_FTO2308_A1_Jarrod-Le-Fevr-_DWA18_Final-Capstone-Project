// Podcard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Podcard.css';

const genreMap = {
  1: "Personal Growth",
  2: "True Crime and Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

const Podcard = ({ podcast }) => {
  const navigate = useNavigate();
  const genres = podcast.genres.map(genreId => genreMap[genreId]).join(', ');

  // Format the updated date
  const updatedDate = new Date(podcast.updated).toLocaleDateString("en-US", {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  const goToPodcast = () => {
    navigate(`/podcast/show/${podcast.id}`);
  };

  return (
    <div className="podcard">
      <img src={podcast.image} alt={podcast.title} className="podcast-image" />
      <div className="podcast-info">
        <h3>{podcast.title}</h3>
        {/* Wrap Seasons text in a span with a class for styling */}
        <p><span className="seasons-badge">Seasons: {podcast.seasons}</span></p>
        <p>Genre: {genres}</p>
        <p>Last Updated: {updatedDate}</p>
        <button className="watch-button" onClick={goToPodcast}>WATCH</button>
      </div>
    </div>
  );
}

export default Podcard;