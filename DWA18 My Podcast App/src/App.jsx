// App.jsx
import React, { useState } from 'react';
import Header from './components/layout/Header';
// import other components like NavBar if you have them
import './App.css';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header onToggle={toggleSidebar} />
      {/* Your sidebar component and the rest of your page content here */}
    </>
  );
}

export default App;
