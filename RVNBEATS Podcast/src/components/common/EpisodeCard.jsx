import React, { useState, useEffect } from 'react';
import './EpisodeCard.css';
import { useAudioPlayer } from './AudioPlayerContext';
import { createClient } from "@supabase/supabase-js";
import likeIcon from '/icons/like.svg';
import unlikeIcon from '/icons/unlike.svg';

const supabaseUrl = "https://cocqkidcedhuvtidhbgt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvY3FraWRjZWRodXZ0aWRoYmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2MDk2NjEsImV4cCI6MjAyNzE4NTY2MX0.mHunkLWa7ZzYkwWDNwl2jrroKGKxt3kIh6a0Tzimfq8";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EpisodeCard = ({ episode }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const { playEpisode, currentEpisode, stopEpisode } = useAudioPlayer(); 

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("favoritesfield")
        .eq('id', 1);

      if (error) {
        console.error("Error fetching favorite status:", error);
        return;
      }

      setIsFavorited(data?.[0]?.favoritesfield?.includes(episode.id));
    };

    checkFavoriteStatus();
  }, [episode.id]);

  const handleFavClick = async () => {
    const updatedFavoritedStatus = !isFavorited;
    setIsFavorited(updatedFavoritedStatus);
  
    let { data: favData, error: favError } = await supabase
      .from("favorites")
      .select("favoritesfield")
      .eq('id', 1)
      .single();
  
    if (favError) {
      console.error("Error fetching favorites:", favError);
      return;
    }
  
    let updatedFavoriteIds = favData.favoritesfield || [];
    if (updatedFavoritedStatus && !updatedFavoriteIds.includes(episode.id)) {
      updatedFavoriteIds.push(episode.id); // Add episode ID if not already present
    } else if (!updatedFavoritedStatus) {
      updatedFavoriteIds = updatedFavoriteIds.filter(id => id !== episode.id); // Remove episode ID if un-favorited
    }
  
    const { error: updateError } = await supabase
      .from("favorites")
      .update({ favoritesfield: updatedFavoriteIds })
      .eq('id', 1);
  
    if (updateError) {
      console.error("Error updating favorites:", updateError);
    }
  };

  const handleIconClick = () => {
    if (currentEpisode && currentEpisode.id === episode.id) {
      stopEpisode(); // Stop the episode if it is the current one
    } else {
      playEpisode(episode); // Play the episode if it is not the current one
    }
  };

  const isPlaying = currentEpisode && currentEpisode.id === episode.id; // Check if the current episode is playing

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
        <i 
          className={`player-icon ${isPlaying ? 'fa-solid fa-xmark' : 'fa-solid fa-headphones-simple'}`}
          style={{ color: "#384182" }} 
          onClick={handleIconClick} // This will either play or stop the episode
        />
      </div>
    </div>
  );
};

export default EpisodeCard;

