import styles from "./Cart.module.css";
import React from "react";
import Button from "../../components/Button/Button";
import { Product } from "../../data/types";
import CartItem from "../../components/CartItem/CartItem";

interface CartProps {
  cartItems: Product[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <main className={styles.cartPage}>
      <h1>Your Cart</h1>
      <div className={styles.cartGrid}>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </div>
      <div className={styles.totalBox}>
        <h3>Total</h3>
      </div>
    </main>
  );
};

export default Cart;
