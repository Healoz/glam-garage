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

// define shape of context value
interface CartContextValue {
  cartItems: CartItem[];
  addCartItemToCart: (cartItem: CartItem) => void;
  removeCartItemFromCart: (cartItemId: number) => void;
  updateProductInCart: (cartItemId: number, newQuantity: number) => void;
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

  const [cartItems, setCartItems] = useState<CartItem[]>(createTestCartItems);

  const addCartItemToCart = (cartItem: CartItem): void => {
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
  };

  const removeCartItemFromCart = (cartItemId: number): void => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== cartItemId)
    );
  };

  const updateProductInCart = (cartItemId: number, newQuantity: number): void => {
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

    for (let i = 0; i < 2; i++) {
      const cartItem: CartItem = {
        id: i + 1,
        product: product,
        quantity: 1,
        size: Size.XL
      }

      cartItemArray.push(cartItem);
    }

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
