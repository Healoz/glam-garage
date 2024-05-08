import styles from "./CartItemElement.module.css";
import Button from "../Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import dummyImg from "../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg";
import { CartItem } from "../../data/types";
import { useContext } from "react";
import { CartContext } from "../../App";

interface CartItemProps {
  quantityAdjust: boolean;
  cartItem: CartItem;
  isPopoutSize: boolean;
}

const CartItemElement: React.FC<CartItemProps> = ({
  quantityAdjust,
  cartItem,
  isPopoutSize,
}) => {
  const product = cartItem.product;

  // getting context of cartItem function
  const { removeCartItemFromCart, updateProductInCart } =
    useContext(CartContext);

  return (
    <div className={styles.cartItem}>
      <div
        className={`${isPopoutSize ? styles.productImgPopoutSize + " " : ""}${
          styles.productImg
        }`}
        style={{ backgroundImage: `url(${product.imageUrls[0]})` }}
      ></div>
      <div className={styles.productInfo}>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <h4>${product.price}</h4>
            <h4>{product.name}</h4>
            <p>{product.category}</p>
            <p>{cartItem.size}</p>
          </div>
          <div className={styles.qntyAndBtn}>
            <div className={styles.quantity}>
              {/* render quantity depending on if you can adjust it or not */}
              {quantityAdjust ? (
                <QuantityButtons cartItem={cartItem} />
              ) : (
                <p>Qty: {cartItem.quantity}</p>
              )}
            </div>
            <Button
              colourScheme={ColourScheme.Secondary}
              iconCode="delete"
              buttonLink=""
              isCircle={true}
              fillsSpace={false}
              onClickFunction={() => removeCartItemFromCart(cartItem.id)}
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

  const isQuantityOneOrLess = cartItem.quantity <= 1; 
  const { updateProductInCart } = useContext(CartContext);

  return (
    <div className={styles.quantityAdjust}>
      <div className={isQuantityOneOrLess ? styles.quantityBtnInnactive : ''}>
        <Button
          colourScheme={ColourScheme.Secondary}
          iconCode="remove"
          buttonLink=""
          isCircle={true}
          fillsSpace={false}
          customPadding={4}
          onClickFunction={!isQuantityOneOrLess ? () => updateProductInCart(cartItem.id, cartItem.quantity - 1) : undefined}
        />
      </div>
      <h2>{cartItem.quantity}</h2>
      <div>
        <Button
          colourScheme={ColourScheme.Secondary}
          iconCode="add"
          buttonLink=""
          isCircle={true}
          fillsSpace={false}
          customPadding={4}
          onClickFunction={() => updateProductInCart(cartItem.id, cartItem.quantity + 1)}
        />
      </div>
    </div>
  );
};

export default CartItemElement;
