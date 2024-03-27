import React, { useState, useEffect } from 'react';
import './assets/App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ProductPage from './pages/ProductPage/ProductPage';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
