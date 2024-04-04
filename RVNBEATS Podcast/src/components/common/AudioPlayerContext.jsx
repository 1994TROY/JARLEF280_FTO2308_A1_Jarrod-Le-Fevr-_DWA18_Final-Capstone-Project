import React, { createContext, useContext, useState } from "react";

const AudioPlayerContext = createContext();

export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const AudioPlayerProvider = ({ children }) => {
  const [audioDetails, setAudioDetails] = useState({
    playing: false,
    episode: null,
  });

  const playEpisode = (episode) => {
    setAudioDetails({ playing: true, episode });
  };

  const stopEpisode = () => {
    setAudioDetails({ playing: false, episode: null });
  };

  return (
    <AudioPlayerContext.Provider
      value={{ audioDetails, playEpisode, stopEpisode }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
