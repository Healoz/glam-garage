import styles from "./CartPopout.module.css";
import {RefObject, useRef, forwardRef} from "react";
import Button from "../Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import dummyImg from "../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg";

interface CartPopoutProps {
  isShown: boolean;
  togglePopout: () => void;
}

const CartItem = () => {
  return (
    <div className={styles.cartItem}>
      <div
        className={styles.productImg}
        style={{ backgroundImage: `url(${dummyImg})` }}
      ></div>
      <div className={styles.productInfo}>
        <div className={styles.info}>
          <h4>$27</h4>
          <h4>Product named sad awfawf</h4>
          <p>Women's Dresses Women's Dresses</p>
          <div className={styles.qntyAndBtn}>
            <p>Qty: 1</p>
            <Button
              colourScheme={ColourScheme.Secondary}
              iconCode="delete"
              buttonLink=""
              isCircle={true}
              fillsSpace={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

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
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
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
