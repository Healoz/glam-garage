import React, { useState, useEffect } from 'react';
import './assets/App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ProductPage from './pages/ProductPage/ProductPage';
import Footer from './components/Footer/Footer';
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Header />
      <div className="pageContent">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/product-name" element={<ProductPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
