import React, { useState, useEffect, createContext } from "react";
import "./assets/App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import Footer from "./components/Footer/Footer";
import productsData from "./data/products.json";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Product, CartItem, Size } from "./data/types";
import Cart from "./pages/Cart/Cart";
import {v4 as uuidv4} from 'uuid';

// define shape of context value
interface CartContextValue {
  cartItems: CartItem[];
  addCartItemToCart: (cartItem: CartItem) => void;
  removeCartItemFromCart: (cartItemId: string) => void;
  updateProductInCart: (cartItemId: string, newQuantity: number) => void;
}

// creating a context
export const CartContext = createContext<CartContextValue>({
  cartItems: [],
  addCartItemToCart: () => {},
  removeCartItemFromCart: () => {},
  updateProductInCart: () => {}
});

function App() {
  // importing products from temp json file
  const [products, setProductsData] = useState<Product[]>(productsData);

  const [cartItems, setCartItems] = useState<CartItem[]>(createTestCartItems());

  const addCartItemToCart = (cartItem: CartItem): void => {
    // generate cartItem id
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
  };

  const removeCartItemFromCart = (cartItemId: string): void => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== cartItemId)
    );
  };

  const updateProductInCart = (cartItemId: string, newQuantity: number): void => {
    setCartItems((prevCartItems) =>
    prevCartItems.map((item) =>
      item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
  }

  // creating an object with all cartItems and functions
  const cartContextValue: CartContextValue = {
    cartItems,
    addCartItemToCart: addCartItemToCart,
    removeCartItemFromCart: removeCartItemFromCart,
    updateProductInCart: updateProductInCart,
  };

  function createTestCartItems(): CartItem[] {
    const cartItemArray: CartItem[] = [];

    const product = products[0];

    for (let i = 0; i < 5; i++) {
      const cartItem: CartItem = {
        id: uuidv4(),
        product: product,
        quantity: 3,
        size: Size.XL
      }

      cartItemArray.push(cartItem);
    }

    console.log(cartItemArray);
    return cartItemArray;
  }


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
                element={<Cart />}
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
