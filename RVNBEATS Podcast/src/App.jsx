import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Landing from './components/layout/pages/Landing';
import PodcastPage from './components/layout/pages/PodcastPage';
import LoginSignup from './components/layout/pages/LoginSignup';
import ShowPage from './components/layout/pages/ShowPage';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Landing />} />
        <Route path="/podcast" element={<PodcastPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/podcast/show/:id" element={<ShowPage />} />
      </Routes>
    </Router>
  );
}

export default App;
