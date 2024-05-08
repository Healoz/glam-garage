import styles from "./Cart.module.css";
import React, {useContext} from "react";
import Button from "../../components/Button/Button";
import { Product } from "../../data/types";
import CartItemElement from "../../components/CartItem/CartItemElement";
import ColourScheme from "../../enums/ColourScheme";
import { CartContext } from "../../App";
import { CartItem } from "../../data/types";

interface CartProps {
  
}

const Cart: React.FC<CartProps> = ({}) => {

  const { cartItems } = useContext(CartContext);

  const CartItemGridElements = () => {
    return (
      <div className={styles.cartGrid}>
        {cartItems.map((cartItem: CartItem) => (
          <CartItemElement
            quantityAdjust={true}
            key={cartItem.id}
            cartItem={cartItem}
          />
        ))}
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
      </div>
    </main>
  );
};

export default Cart;
