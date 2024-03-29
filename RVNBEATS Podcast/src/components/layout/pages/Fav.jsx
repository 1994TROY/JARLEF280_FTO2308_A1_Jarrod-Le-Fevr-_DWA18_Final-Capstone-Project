import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Fav.css';

const Fav = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch the favorites from local storage or a database
    // Example: setFavorites(fetchFavoritesFromLocalStorage());
  }, []);

  const removeFavorite = (episodeId) => {
    // Logic to remove the episode from favorites
    // Example: removeFavoriteFromLocalStorage(episodeId);
    // Then update the state to reflect the change
  };
  const addToFavorites = (episode) => {
    // Logic to add an episode to favorites
  };

  return (
    <div className="favorites-page">
      <div className="back-button-container">
        <i className="fa-solid fa-circle-arrow-left" onClick={() => navigate(-1)}></i>
      </div>
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        favorites.map((group) => (
          <div key={group.showId}>
            <h2>{group.showTitle} - Season {group.seasonNumber}</h2>
            {group.episodes.map((episode) => (
              <div key={episode.id} className="favorite-item">
                <h3>{episode.title}</h3>
                <button onClick={() => removeFavorite(episode.id)}>
                  Remove from Favorites
                </button>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="no-favorites">
          <p>There are currently no items in your Favorites.</p>
          <Link to="/podcast" className="add-favorite-button">
            Add a Favorite
          </Link>
        </div>
      )}
    </div>
  );
};

export default Fav;

// You would need corresponding CSS to style your components.
// Also, ensure to replace fetchFavoritesFromLocalStorage() and removeFavoriteFromLocalStorage() with your actual functions.
