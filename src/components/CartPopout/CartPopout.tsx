import styles from "./CartPopout.module.css";
import { RefObject, useRef, forwardRef, useContext } from "react";
import Button from "../Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import dummyImg from "../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg";
import CartItemElement from "../CartItem/CartItemElement";
import { CartContext } from "../../App";
import { CartItem } from "../../data/types";
import { motion, AnimatePresence } from "framer-motion";

interface CartPopoutProps {
  togglePopout: () => void;
}

const CartPopout: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CartPopoutProps
> = ({ togglePopout }, ref) => {
  // retrieving cart items from cartContext
  const { cartItems, cartTotal } = useContext(CartContext);

  const CartItemElements = () => {
    return (
      <div className={styles.cartScroll}>
        <AnimatePresence>
          {cartItems.map((cartItem: CartItem) => (
            <motion.div
              className={styles.cartItem}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  type: "spring",
                  bounce: 0.3,
                  duration: 1,
                },
              }}
              exit={{ opacity: 0, height: 0 }}
            >
              <CartItemElement
                quantityAdjust={true}
                key={cartItem.id}
                cartItem={cartItem}
                isPopoutSize={true}
              />
            </motion.div>
          ))}
        </AnimatePresence>
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
