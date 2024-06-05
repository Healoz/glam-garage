import styles from "./Header.module.css";
import React, {
  useEffect,
  useRef,
  useState,
  FC,
  useContext,
  RefObject,
} from "react";
import CartPopout from "../CartPopout/CartPopout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, useAnimationControls } from "framer-motion";
import { CartItem } from "../../data/types";
import { motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";
import useClickOutside from "../useClickOutside";
// import { CartContext } from "../../App";

interface HeaderProps {
  // isMobile: boolean;
  cartItems: CartItem[];
  cartTotal: number;
  removeCartItemFromCart: (cartItemId: string) => void;
  updateProductInCart: (cartItemId: string, newQuantity: number) => void;
}

const Header: FC<HeaderProps> = ({
  removeCartItemFromCart,
  updateProductInCart,
  cartItems,
  cartTotal,
}) => {

  // State hooks
  const [cartShowing, setCartShowing] = useState<boolean>(false);
  const [searchShowing, setSearchShowing] = useState(false);
  const [amountInCart, setAmountInCart] = useState(0);
  const [amountInCartDisplay, setAmountInCartDisplay] = useState(amountInCart);
  
  // refs
  const cartPopoutRef = useRef<HTMLDivElement>(null);
  const shoppingCartBtnRef = useRef<HTMLButtonElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // navigation hook
  const navigate = useNavigate();

  // animation controls
  const controls = useAnimationControls();

  // Animation variants
  const cartVariants = {
    initial: {
      scale: 1,
    },
    cartAnimation: {
      scale: [1, 1.5, 1],
      transition: {
        delay: 0.8,
        duration: 0.3,
      },
    },
  };

  // Effect hooks
  useEffect(() => {
    // play cart animation everytime cart number goes up
    controls.start("cartAnimation");

    // only change cart number to current number after 0.8 seconds
    setTimeout(() => {
      setAmountInCartDisplay(amountInCart);
    }, 800);
  }, [amountInCart]);

  useEffect(() => {
    setAmountInCart(calculateTotalCartNumber());
  }, [cartItems]);

  // Custom hooks for handling clicks outside
  // close popup when clicking outside popup
  useClickOutside(cartPopoutRef, cartShowing, setCartShowing, [shoppingCartBtnRef]);

  // close searchbar when clicking outside
  useClickOutside(searchBarRef, searchShowing, setSearchShowing, []);

  // Functions
  const calculateTotalCartNumber = (): number => {
    let cartItemNumber = 0;
    cartItems.forEach((cartItem) => (cartItemNumber += cartItem.quantity));
    return cartItemNumber;
  };

  function shoppingCartSelected() {
    if (window.screen.width > 1200) {
      // if desktop, show/hide popout
      togglePopout();
    } else {
      // if mobile / tablet, navigate to cart page
      navigate("/cart");
    }
  }

  function togglePopout() {
    setCartShowing((prevCartShowing) => !prevCartShowing);
  }

  return (
    <section className={styles.header}>
      <div className={styles.menuItems}>
        <div className={styles.logo}>
          <Link to="/">
            <span className={`material-symbols-outlined ${styles.icon}`}>
              garage_home
            </span>
            <h3>GlamGarage</h3>
          </Link>
        </div>
        <ul className={styles.desktopMenuItems}>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>

      <div className={styles.menuBtns}>
        <SearchBar
          searchShowing={searchShowing}
          setSearchShowing={setSearchShowing}
          ref={searchBarRef}
        />
        <section className={styles.cartSection}>
          <button
            onClick={shoppingCartSelected}
            ref={shoppingCartBtnRef}
            className={styles.cartButton}
          >
            {cartItems.length > 0 && (
              <motion.p
                className={styles.cartNumber}
                animate={controls}
                variants={cartVariants}
                initial={cartVariants.initial}
              >
                {amountInCartDisplay}
              </motion.p>
            )}
            <span className={`material-symbols-outlined ${styles.iconSmall} ${styles.shoppingCartIcon}`}>
              shopping_cart
            </span>
          </button>
          <AnimatePresence>
            {cartShowing && (
              <CartPopout
                ref={cartPopoutRef}
                togglePopout={togglePopout}
                updateProductInCart={updateProductInCart}
                removeCartItemFromCart={removeCartItemFromCart}
                cartItems={cartItems}
                cartTotal={cartTotal}
              />
            )}
          </AnimatePresence>
        </section>
      </div>
    </section>
  );
};

export default Header;
