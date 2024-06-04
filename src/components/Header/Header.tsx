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
  const [cartShowing, setCartShowing] = useState<boolean>(false);
  const [searchShowing, setSearchShowing] = useState(false);
  // reference to the cart popout to detect clicks outside of the popout when its open to close it
  const cartPopoutRef = useRef<HTMLDivElement>(null);
  const shoppingCartBtnRef = useRef<HTMLButtonElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // const { cartItems } = useContext(CartContext);
  const [amountInCart, setAmountInCart] = useState(0);

  const [amountInCartDisplay, setAmountInCartDisplay] = useState(amountInCart);

  const controls = useAnimationControls();

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

  useEffect(() => {
    // play cart animation everytime cart number goes up
    controls.start("cartAnimation");

    // only change cart number to current number after 0.8 seconds
    setTimeout(() => {
      setAmountInCartDisplay(amountInCart);
    }, 800);
  }, [amountInCart]);

  function togglePopout() {
    setCartShowing((prevCartShowing) => !prevCartShowing);
  }

  function shoppingCartSelected() {
    if (window.screen.width > 1200) {
      // if desktop, show/hide popout
      togglePopout();
    } else {
      // if mobile / tablet, navigate to cart page
      navigate("/cart");
    }
  }

  const handleClickOutsideCartPopup = (event: MouseEvent) => {
    // if clicked on shopping cart icon, do nothing
    if (shoppingCartBtnRef.current?.contains(event.target as Node)) {
      return;
    }

    // mouse clicked inside of popout, do nothing
    if (
      !(
        cartPopoutRef.current &&
        !cartPopoutRef.current.contains(event.target as Node)
      )
    ) {
      return;
    }

    // hide cart
    setCartShowing(false);
  };

  

  // UseEffect to handle click events outside of cartPopout
  useEffect(() => {
    if (cartShowing) {
      document.addEventListener("mousedown", handleClickOutsideCartPopup);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideCartPopup);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCartPopup);
    };
  }, [cartShowing]);

  const handleClickOutsideSearchBar = (event: MouseEvent) => {
    // if clicked on searchbar, do nothing
    if (searchBarRef.current?.contains(event.target as Node)) {
      return;
    }

    // hide searchbar if clicked outside
    setSearchShowing(false);
  };

  // same with search bar. only add event listener when search is showing.
  useEffect(() => {
    if (searchShowing) {
      document.addEventListener("mousedown", handleClickOutsideSearchBar);
    }
    else {
      document.removeEventListener("mousedown", handleClickOutsideSearchBar);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearchBar);
    }
  }, [searchShowing])

  const calculateTotalCartNumber = (): number => {
    let cartItemNumber = 0;
    cartItems.forEach((cartItem) => (cartItemNumber += cartItem.quantity));
    return cartItemNumber;
  };

  useEffect(() => {
    setAmountInCart(calculateTotalCartNumber());
  }, [cartItems]);


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
          <li>Menu Item 1</li>
          <li>Menu Item 2</li>
          <li>Menu Item 3</li>
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
            <span className={`material-symbols-outlined ${styles.iconSmall}`}>
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
