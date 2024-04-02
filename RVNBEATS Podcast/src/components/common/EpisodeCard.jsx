import React, { useState, useEffect } from 'react';
import './EpisodeCard.css';
import { createClient } from "@supabase/supabase-js";
import likeIcon from '../../../public/icons/like.svg';
import unlikeIcon from '../../../public/icons/unlike.svg';

const supabaseUrl = "https://cocqkidcedhuvtidhbgt.supabase.co";
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EpisodeCard = ({ episode }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("favoriteids")
        .eq('id', 1); // assuming the user ID is 1

      if (error) {
        console.error("Error fetching favorite status:", error);
        return;
      }

      setIsFavorited(data?.favoriteids?.includes(episode.id));
    };

    checkFavoriteStatus();
  }, [episode.id]);

  const handleFavClick = async () => {
    const updatedFavoritedStatus = !isFavorited;
    setIsFavorited(updatedFavoritedStatus);

    const { data, error } = await supabase
      .from("favorites")
      .select("favoriteids")
      .eq('id', 1).single(); // again assuming the user ID is 1

    if (error) {
      console.error("Error fetching favorites:", error);
      return;
    }

    let updatedFavoriteIds = data.favoriteids || [];

    if (updatedFavoritedStatus) {
      updatedFavoriteIds.push(episode.id);
    } else {
      updatedFavoriteIds = updatedFavoriteIds.filter(id => id !== episode.id);
    }

    const { error: updateError } = await supabase
      .from("favorites")
      .update({ favoriteids: updatedFavoriteIds })
      .eq('id', 1); // and again assuming the user ID is 1

    if (updateError) {
      console.error("Error updating favorites:", updateError);
    }
  };

  const handleIconClick = () => {
    setIsPlayerVisible(!isPlayerVisible);
  };

  return (
    <div className="episode-card">
      <h3 className="episode-title">{episode.title}</h3>
      <p className="episode-description">{episode.description}</p>
      <div className="audio-player-container">
        <img 
          src={isFavorited ? likeIcon : unlikeIcon} 
          alt={isFavorited ? 'Unfavorite' : 'Favorite'} 
          className="fav-icon" 
          onClick={handleFavClick} 
        />
        {isPlayerVisible ? (
          <>
            <audio controls className={`audio-player ${isPlayerVisible ? 'visible' : ''}`} autoPlay style={{ marginLeft: '15px', marginRight: '15px' }}>
              <source src={episode.file} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <i className="fa-solid fa-xmark player-icon" style={{color: "#384182"}} onClick={handleIconClick}></i>
          </>
        ) : (
          <i className="fa-solid fa-headphones-simple player-icon" style={{color: "#384182"}} onClick={handleIconClick}></i>
        )}
      </div>
    </div>
  );
};

export default EpisodeCard;