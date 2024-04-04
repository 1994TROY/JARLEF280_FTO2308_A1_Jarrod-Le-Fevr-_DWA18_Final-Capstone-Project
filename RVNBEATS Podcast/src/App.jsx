// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AudioPlayerProvider } from './components/common/AudioPlayerContext';
import Header from './components/layout/Header';
import Landing from './components/layout/pages/Landing';
import PodcastPage from './components/layout/pages/PodcastPage';
import LoginSignup from './components/layout/pages/LoginSignup';
import ShowPage from './components/layout/pages/ShowPage';
import Footer from './components/layout/Footer';
import Fav from './components/layout/pages/Fav';
import './App.css';

function App() {
  return (
    <AudioPlayerProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/dashboard" element={<Landing />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/podcast/show/:id" element={<ShowPage />} />
          <Route path="/favorites" element={<Fav />} />
        </Routes>
        <Footer />
      </Router>
    </AudioPlayerProvider>
  );
}

export default App;
