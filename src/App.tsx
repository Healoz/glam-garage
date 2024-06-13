import React, { useState, useEffect, createContext, useRef } from "react";
import "./assets/App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import Footer from "./components/Footer/Footer";
import productsData from "./data/products.json";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Product, CartItem, Size } from "./data/types";
import Cart from "./pages/Cart/Cart";
import { v4 as uuidv4 } from "uuid";
import Lenis from "lenis";
import { motion } from "framer-motion";
import Search from "./pages/Search/Search";
import Favourites from "./components/Favourites/Favourites";

// define shape of context value
interface CartContextValue {
  cartItems: CartItem[];
  cartTotal: number;
  addProductToCart: (product: Product, size: Size) => void;
  removeCartItemFromCart: (cartItemId: string) => void;
  updateProductInCart: (cartItemId: string, newQuantity: number) => void;
}

// creating a context
export const CartContext = createContext<CartContextValue>({
  cartItems: [],
  cartTotal: 0,
  addProductToCart: () => {},
  removeCartItemFromCart: () => {},
  updateProductInCart: () => {},
});

function App() {
  // importing products from temp json file
  const [products, setProductsData] = useState<Product[]>(productsData);
  const [favourites, setFavourites] = useState<Product[]>([]);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    // loading cart data from local storage on app load
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    // smooth scroll behaiviour
    // const lenis = new Lenis();

    // function raf(time: number) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }

    // requestAnimationFrame(raf);
  }, []);

  // useContext functions
  const addProductToCart = (product: Product, size: Size): void => {
    // first, it needs to check if current product (same id) with the same size is already in cart
    const sameProductInCart = cartItems.find(
      (foundCartItem) =>
        foundCartItem.product.id === product.id && foundCartItem.size === size
    );

    console.log(
      sameProductInCart || "no duplicate product with same size found"
    );

    // if it is, then just increment the quantity of the cart item by 1
    if (sameProductInCart) {
      updateProductInCart(sameProductInCart.id, sameProductInCart.quantity + 1);
      return; // if found same product, exit out of the function
    }

    // if no duplicate product found, then create a new cartItem and add to the array of cartItems (even if there are matching products but DIFFERENT )
    const newCartItem: CartItem = {
      id: uuidv4(),
      product: product,
      quantity: 1,
      size: size,
    };

    setCartItems([...cartItems, newCartItem]);
  };

  const removeCartItemFromCart = (cartItemId: string): void => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== cartItemId)
    );
  };

  const updateProductInCart = (
    cartItemId: string,
    newQuantity: number
  ): void => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const addProductToFavourites = (newProduct: Product): void => {
    // do nothing if product already in favourites
    if (checkIfProductInFavourites(newProduct)) { return };
    setFavourites((prevFavourites) => [...prevFavourites, newProduct]);
  };

  const removeProductFromFavourites = (removedProduct: Product): void => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((favourite) => favourite.id !== removedProduct.id)
    );
  };

  const checkIfProductInFavourites = (product: Product): boolean => {
    return favourites.some((favourite) => favourite.id === product.id);
  };

  // Calculating cart total
  const calculateCartTotal = (): number => {
    let total = 0;

    cartItems.forEach(
      (cartItem) => (total += cartItem.product.price * cartItem.quantity)
    );

    return total;
  };

  // everytime cartItems changes, recalculate total + save to local storage
  useEffect(() => {
    // save to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // calculate total
    setCartTotal(calculateCartTotal());
  }, [cartItems]);

  // creating an object with all cartItems and functions
  const cartContextValue: CartContextValue = {
    cartItems,
    cartTotal,
    addProductToCart: addProductToCart,
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
        size: Size.XL,
      };

      cartItemArray.push(cartItem);
    }

    console.log(cartItemArray);
    return cartItemArray;
  }

  return (
    <CartContext.Provider value={cartContextValue}>
      <div className="App">
        <div className="appContainer">
          <Header
            updateProductInCart={updateProductInCart}
            removeCartItemFromCart={removeCartItemFromCart}
            cartItems={cartItems}
            cartTotal={cartTotal}
          />
          <div className="pageContent">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    products={products}
                    checkIfProductInFavourites={checkIfProductInFavourites}
                    addProductToFavourites={addProductToFavourites}
                    removeProductFromFavourites={removeProductFromFavourites}
                  />
                }
              />
              <Route
                path="/product/:id"
                element={<ProductPage products={products} />}
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    cartItems={cartItems}
                    cartTotal={cartTotal}
                    removeCartItemFromCart={removeCartItemFromCart}
                    updateProductInCart={updateProductInCart}
                  />
                }
              />
              <Route
                path="/search"
                element={
                  <Search
                    products={products}
                    addProductToFavourites={addProductToFavourites}
                    removeProductFromFavourites={removeProductFromFavourites}
                    checkIfProductInFavourites={checkIfProductInFavourites}
                  />
                }
              />
            </Routes>
            <Favourites
              favourites={favourites}
              checkIfProductInFavourites={checkIfProductInFavourites}
              addProductToFavourites={addProductToFavourites}
              removeProductFromFavourites={removeProductFromFavourites}
            />
          </div>
          <Footer />
        </div>
      </div>
    </CartContext.Provider>
  );
}

export default App;
