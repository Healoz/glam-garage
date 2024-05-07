import styles from "./CartItemElement.module.css";
import Button from "../Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import dummyImg from "../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg";

interface CartItemProps {
  quantityAdjust: boolean;
}

const CartItemElement: React.FC<CartItemProps> = ({ quantityAdjust }) => {
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
            <div className={styles.quantity}>
              {/* render quantity depending on if you can adjust it or not */}
              {quantityAdjust ? <QuantityButtons /> : <p>Qty: 1</p>}
            </div>
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

const QuantityButtons = () => {
  return (
    <div className={styles.quantityAdjust}>
      <Button
        colourScheme={ColourScheme.Secondary}
        iconCode="remove"
        buttonLink=""
        isCircle={true}
        fillsSpace={false}
        customPadding={8}
      />
      <h2>1</h2>
      <Button
        colourScheme={ColourScheme.Secondary}
        iconCode="add"
        buttonLink=""
        isCircle={true}
        fillsSpace={false}
        customPadding={8}
      />
    </div>
  );
};

export default CartItemElement;
