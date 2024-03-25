import React, { useState, useEffect } from 'react';
import './assets/App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
