import React, { useState, useEffect } from "react";
import "./assets/App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import Footer from "./components/Footer/Footer";
import productsData from "./data/products.json";
import { Route, Routes } from "react-router-dom";
import { Product } from "./data/types";

function App() {
  // importing products from temp json file
  const [products, setProductsData] = useState<Product[]>(productsData);

  return (
    <div className="App">
      <div className="appContainer">
        <Header />
        <div className="pageContent">
          <Routes>
            <Route path="" element={<Home products={products} />} />
            <Route path="/product-name" element={<ProductPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
