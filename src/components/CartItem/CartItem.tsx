import styles from "./CartItem.module.css";
import Button from "../Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import dummyImg from "../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg";

interface CartItemProps {

}

const CartItem: React.FC<CartItemProps> = ({}) => {
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
}

export default CartItem;