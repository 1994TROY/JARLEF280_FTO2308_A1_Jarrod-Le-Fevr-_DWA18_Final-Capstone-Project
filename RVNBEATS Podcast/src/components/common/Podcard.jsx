// Podcard.jsx
import React from 'react';
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
    // Map genre IDs to genre names
    const genres = podcast.genres.map(genreId => genreMap[genreId]).join(', ');
  
    return (
      <div className="podcard">
        <img src={podcast.image} alt={podcast.title} className="podcast-image" />
        <h3>{podcast.title}</h3>
        <p>Seasons: {podcast.seasons}</p>
        <p>Genre: {genres}</p>
        <button className="watch-button">WATCH</button>
      </div>
    );
  };
  
  export default Podcard;