import React, { useState, useEffect } from "react";
import "./assets/App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import Footer from "./components/Footer/Footer";
import productsData from "./data/products.json";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Product } from "./data/types";

function App() {
  // importing products from temp json file
  const [products, setProductsData] = useState<Product[]>(productsData);

  function convertStringToUrlFriendly(string: string): string {
    const urlFriendlyName = string.replace(/\s+/g, '-').toLowerCase();
    return urlFriendlyName;
  }

  function navigateToProductPage(product: Product) {
    const productUrl = convertStringToUrlFriendly(product.name);
    const navigate = useNavigate();
    navigate(`/${productUrl}`)
  }

  return (
    <div className="App">
      <div className="appContainer">
        <Header />
        <div className="pageContent">
          <Routes>
            <Route path="" element={<Home products={products} navigateToProductPage={navigateToProductPage}/>} />
            <Route path="/product-name" element={<ProductPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
