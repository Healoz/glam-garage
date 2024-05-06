import styles from "./Cart.module.css";
import React from "react";
import Button from "../../components/Button/Button";
import { Product } from "../../data/types";
import CartItem from "../../components/CartItem/CartItem";
import ColourScheme from "../../enums/ColourScheme";

interface CartProps {
  cartItems: Product[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <main className={styles.cartPage}>
      <div className={styles.cartGridContainer}>
        <h1>Your Cart</h1>
        <div className={styles.cartGrid}>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
      </div>
      <div className={styles.totalBox}>
        <h2 className={styles.totalTitle}>Total</h2>
        <div className={styles.totalGrid}>
          <div>
            <h4>Sub-total</h4>
          </div>
          <div className={styles.price}>
            <h2>$283</h2>
          </div>
          <div>
            <h4>Shipping</h4>
          </div>
          <div className={styles.price}>
            <h2>$27</h2>
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
    </main>
  );
};

export default Cart;
