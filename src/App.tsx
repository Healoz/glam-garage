import React, { useState, useEffect, createContext } from "react";
import "./assets/App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import Footer from "./components/Footer/Footer";
import productsData from "./data/products.json";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Product } from "./data/types";
import Cart from "./pages/Cart/Cart";

// define shape of context value
interface CartContextValue {
  cartItems: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
  // updateProductInCart: (productId: string, newQuantity: number) => void;
}

// creating a context
export const CartContext = createContext<CartContextValue>({
  cartItems: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  // updateProductInCart: () => {}
});

function App() {
  // importing products from temp json file
  const [products, setProductsData] = useState<Product[]>(productsData);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addProductToCart = (product: Product): void => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const removeProductFromCart = (productId: number): void => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };

  // creating an object with all cartItems and functions
  const cartContextValue: CartContextValue = {
    cartItems,
    addProductToCart,
    removeProductFromCart,
  };

  // const updateProductInCart = (productId: number, newQuantity: number): void => {
  //   setCartItems((prevCartItems) =>
  //   prevCartItems.map((item) =>
  //     item.id === productId ? { ...item, quantity: newQuantity } : item))
  // }

  return (
    <CartContext.Provider value={cartContextValue}>
      <div className="App">
        <div className="appContainer">
          <Header />
          <div className="pageContent">
            <Routes>
              <Route
                path=""
                element={
                  <Home
                    products={products}
                  />
                }
              />
              <Route
                path="/product/:id"
                element={<ProductPage products={products} />}
              />
              <Route
                path="/cart"
                element={<Cart cartItems={products}></Cart>}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </CartContext.Provider>
  );
}

export default App;
