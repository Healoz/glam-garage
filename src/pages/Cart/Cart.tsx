import styles from "./Cart.module.css";
import React, { useContext } from "react";
import Button from "../../components/Button/Button";
import { Product } from "../../data/types";
import CartItemElement from "../../components/CartItem/CartItemElement";
import ColourScheme from "../../enums/ColourScheme";
import { CartContext } from "../../App";
import { CartItem } from "../../data/types";
import { motion, AnimatePresence } from "framer-motion";

interface CartProps {
  cartItems: CartItem[];
  cartTotal: number;
  removeCartItemFromCart: (cartItemId: string) => void;
  updateProductInCart: (cartItemId: string, newQuantity: number) => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  cartTotal,
  removeCartItemFromCart,
  updateProductInCart,
}) => {
  // const { cartItems, cartTotal } = useContext(CartContext);

  const shippingPrice = 30;

  const CartItemGridElements = () => {
    return (
      <div className={styles.cartGrid}>
        {cartItems.length > 0 ? (
          cartItems.map((cartItem: CartItem) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={cartItem.id}
            >
              <CartItemElement
                quantityAdjust={true}
                cartItem={cartItem}
                isPopoutSize={false}
                removeCartItemFromCart={removeCartItemFromCart}
                updateProductInCart={updateProductInCart}
              />
            </motion.div>
          ))
        ) : (
          <div>
            <h1>There are no cart items.</h1>
            <Button
              buttonText="Browse store"
              colourScheme={ColourScheme.Primary}
              iconCode="arrow_forward"
              isCircle={false}
              fillsSpace={false}
              buttonLink="/"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <main className={styles.cartPage}>
      <div className={styles.cartGridContainer}>
        <h1>Your Cart</h1>
        <CartItemGridElements />
      </div>
      <div className={styles.totalBox}>
        <div className={styles.totalBoxContainer}>
          <h2 className={styles.totalTitle}>Total</h2>
          <div className={styles.totalGrid}>
            <div>
              <h4>Sub-total</h4>
            </div>
            <div className={styles.price}>
              <h2>${cartTotal}</h2>
            </div>
            <div>
              <h4>Shipping</h4>
            </div>
            <div className={styles.price}>
              <h2>${shippingPrice}</h2>
            </div>
          </div>
          <Button
            buttonText="Checkout"
            colourScheme={ColourScheme.Primary}
            iconCode="arrow_forward"
            buttonLink="/"
            isCircle={false}
            fillsSpace={true}
          />
          <p>Lorem ipsum dolor sit amet</p>
        </div>
      </div>
    </main>
  );
};

export default Cart;
