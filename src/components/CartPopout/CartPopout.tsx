import styles from "./CartPopout.module.css";
import { useEffect } from "react";
import { RefObject, useRef, forwardRef, useContext } from "react";
import Button from "../Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import dummyImg from "../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg";
import CartItemElement from "../CartItem/CartItemElement";
import { CartContext } from "../../App";
import { CartItem } from "../../data/types";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

interface CartPopoutProps {
  togglePopout: () => void;
}

const CartPopout: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CartPopoutProps
> = ({ togglePopout }, ref) => {
  // retrieving cart items from cartContext
  const { cartItems, cartTotal } = useContext(CartContext);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const CartItemElements = () => {
    return (
      <div className={styles.cartScroll}>
        {cartItems.map((cartItem: CartItem) => (
          <CartItemElement
            key={cartItem.id}
            quantityAdjust={true}
            cartItem={cartItem}
            isPopoutSize={true}
          />
        ))}
      </div>
    );
  };

  // Create local ref if no ref is provided
  const localRef = useRef<HTMLDivElement>(null);
  const popoutRef = ref || localRef;

  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0.5 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0, opacity: 0.5 }}
      transition={{ duration: 0.5, type: "spring" }}
      ref={popoutRef}
    >
      <div className={styles.cartPopout}>
        <div className={styles.cartArrow}></div>
        <div className={styles.cartContainer}>
          <div className={styles.heading}>
            <h3>My Cart</h3>
            <button onClick={togglePopout}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <CartItemElements />
          <div className={styles.total}>
            <h4>Total</h4>
            <h4>${cartTotal}</h4>
          </div>
          <div className={styles.buttons}>
            <Button
              buttonText="Cart"
              colourScheme={ColourScheme.Secondary}
              iconCode="arrow_forward"
              buttonLink="/cart"
              isCircle={false}
              fillsSpace={true}
              onClickFunction={togglePopout} // hide popout when navigating page
            />
            <Button
              buttonText="Checkout"
              colourScheme={ColourScheme.Primary}
              iconCode="arrow_forward"
              buttonLink="/"
              isCircle={false}
              fillsSpace={true}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default forwardRef(CartPopout);
