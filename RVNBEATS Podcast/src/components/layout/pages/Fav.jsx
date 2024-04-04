import React, { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from 'react-router-dom';
import './Fav.css';

const supabaseUrl = "https://cocqkidcedhuvtidhbgt.supabase.co";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY"; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Fav = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('favoritesfield')
        .eq('id', 1);

      if (error) {
        console.error("Error fetching favorites:", error);
        return;
      }

      if (data && data.length > 0) {
        // Assuming favoritesfield is an array of episode IDs
        setFavorites(data[0].favoritesfield || []);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (episodeId) => {
    // Logic to remove the episode from favorites in Supabase
    let updatedFavorites = favorites.filter(id => id !== episodeId);
    const { error } = await supabase
      .from('favorites')
      .update({ favoritesfield: updatedFavorites })
      .eq('id', 1);

    if (error) {
      console.error("Error removing favorite:", error);
    } else {
      setFavorites(updatedFavorites);
    }
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
