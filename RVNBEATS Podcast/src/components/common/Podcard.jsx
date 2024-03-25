// Podcard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Podcard.css'; // Make sure the path is correct

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
    const navigate = useNavigate(); // Hook to navigate
    const genres = podcast.genres.map(genreId => genreMap[genreId]).join(', ');

    const goToPodcast = () => {
      navigate(`/podcast/show/${podcast.id}`);
    };

    return (
      <div className="podcard">
        <img src={podcast.image} alt={podcast.title} className="podcast-image" />
        <div className="podcast-info">
          <h3>{podcast.title}</h3>
          <p>Seasons: {podcast.seasons}</p>
          <p>Genre: {genres}</p>
          <button className="watch-button" onClick={goToPodcast}>WATCH</button>
        </div>
      </div>
    );
};

export default Podcard;
