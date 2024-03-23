import React from 'react';
import './App.css';
import Header from './components/layout/Header'; // Adjust the import path as needed

function App() {
  // You can include state and functions if needed for other components

  return (
    <>
      <Header /> {/* This will include your toggleable navigation sidebar */}
      
      {/* Below you can add the main content of your app */}
      <main>
        {/* Components for your main content go here */}
        {/* This could include your homepage, your podcast display components, etc. */}
      </main>
      
      {/* If you have a Footer component, include it here */}
      {/* <Footer /> */}
    </>
  );
}

export default App;
