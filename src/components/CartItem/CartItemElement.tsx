import styles from "./CartItemElement.module.css";
import Button from "../Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import dummyImg from "../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg";
import { CartItem } from "../../data/types";

interface CartItemProps {
  quantityAdjust: boolean;
  cartItem: CartItem;
}

const CartItemElement: React.FC<CartItemProps> = ({ quantityAdjust, cartItem }) => {
  
  const product = cartItem.product;
  
  return (
    <div className={styles.cartItem}>
      <div
        className={styles.productImg}
        style={{ backgroundImage: `url(${product.imageUrls[0]})` }}
      ></div>
      <div className={styles.productInfo}>
        <div className={styles.info}>
          <h4>${product.price}</h4>
          <h4>{product.name}</h4>
          <p>{product.category}</p>
          <p>{cartItem.size}</p>
          <div className={styles.qntyAndBtn}>
            <div className={styles.quantity}>
              {/* render quantity depending on if you can adjust it or not */}
              {quantityAdjust ? <QuantityButtons cartItem={cartItem} /> : <p>Qty: {cartItem.quantity}</p>}
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

interface QuantityButtonsProps {
  cartItem: CartItem;
}

const QuantityButtons: React.FC<QuantityButtonsProps> = ({ cartItem }) => {
  return (
    <div className={styles.quantityAdjust}>
      <Button
        colourScheme={ColourScheme.Secondary}
        iconCode="remove"
        buttonLink=""
        isCircle={true}
        fillsSpace={false}
        customPadding={4}
      />
      <h2>{cartItem.quantity}</h2>
      <Button
        colourScheme={ColourScheme.Secondary}
        iconCode="add"
        buttonLink=""
        isCircle={true}
        fillsSpace={false}
        customPadding={4}
      />
    </div>
  );
};

export default CartItemElement;
