import React, { useState, useEffect } from 'react';
import './Carousel.css';

function Carousel() {
  const [podcasts, setPodcasts] = useState([]);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://podcast-api.netlify.app/shows');
      const data = await response.json();
      setPodcasts(data.slice(0, 8)); // Grab the first 8 podcasts
    }

    fetchData();
  }, []);

  const galleryspin = (sign) => {
    const newAngle = sign === '-' ? angle - 45 : angle + 45;
    setAngle(newAngle);
  };

  return (
    <div id="carousel">
      <figure id="spinner" style={{ transform: `rotateY(${angle}deg)` }}>
        {podcasts.map((podcast, index) => (
          <img key={index} src={podcast.image} alt={podcast.title} />
        ))}
       </figure>
      <span style={{ float: 'left' }} onClick={() => galleryspin('-')}>
        <i className="fa-regular fa-circle-left" style={{ color: '#384182' }}></i>
      </span>
      <span style={{ float: 'right' }} onClick={() => galleryspin('')}>
        <i className="fa-solid fa-circle-arrow-right" style={{ color: '#384182' }}></i>
      </span>
    </div>
  );
}

export default Carousel;

