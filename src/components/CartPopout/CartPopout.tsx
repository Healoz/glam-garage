import styles from "./CartPopout.module.css";
import {RefObject, useRef, forwardRef} from "react";
import Button from "../Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import dummyImg from "../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg";
import CartItem from "../CartItem/CartItem";

interface CartPopoutProps {
  isShown: boolean;
  togglePopout: () => void;
}

const CartPopout: React.ForwardRefRenderFunction<HTMLDivElement, CartPopoutProps> = ({isShown, togglePopout}, ref ) => {

  // Create local ref if no ref is provided
  const localRef = useRef<HTMLDivElement>(null);
  const popoutRef = ref || localRef;

  return (
    <div className={`${styles.cartPopout} ${isShown ? "" : styles.hidden} `} ref={popoutRef}>
      <div className={styles.cartArrow}></div>
      <div className={styles.cartContainer}>
        <div className={styles.heading}>
          <h3>My Cart</h3>
          <button onClick={togglePopout}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className={styles.cartScroll}>
          <CartItem quantityAdjust={false} />
          <CartItem quantityAdjust={false} />
          <CartItem quantityAdjust={false} />
          <CartItem quantityAdjust={false} />
          <CartItem quantityAdjust={false} />
          <CartItem quantityAdjust={false} />
        </div>
        <div className={styles.total}>
          <h4>Total</h4>
          <h4>$84</h4>
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
  );
};

export default forwardRef(CartPopout);
