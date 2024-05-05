import styles from "./Header.module.css";
import React, { useEffect, useRef, useState, FC } from "react";
import CartPopout from "../CartPopout/CartPopout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  // isMobile: boolean;
}

const Header: FC<HeaderProps> = ({}) => {
  const [cartShowing, setCartShowing] = useState<boolean>(false);
  // reference to the cart popout to detect clicks outside of the popout when its open to close it
  const cartPopoutRef = useRef<HTMLDivElement>(null);
  const shoppingCartBtnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  function togglePopout() {
    setCartShowing((prevCartShowing) => !prevCartShowing);
  }

  function shoppingCartSelected() {
    if (window.screen.width > 1200) {
      // if desktop, show/hide popout
      togglePopout();
      
      console.log(cartShowing);
    } else {
      // if mobile / tablet, navigate to cart page
      navigate('/cart');
    }
  }

  const handleClickOutside = (event: MouseEvent) => {

    // if clicked on shopping cart icon, do nothing
    if (shoppingCartBtnRef.current?.contains(event.target as Node)) {
      console.log("clicked on shopping cart icon")
      return;
    }

    // mouse clicked inside of popout, do nothing
    if (
      !(
        cartPopoutRef.current &&
        !cartPopoutRef.current.contains(event.target as Node)
      )
    ) {
      console.log("mouse clicked inside of popout");
      return;
    }

    console.log("clicked outside of popout");
    setCartShowing(false);
  };

  // UseEffect to handle click events outside of cartPopout
  useEffect(() => {
    console.log("useEffect triggered");

    if (cartShowing) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    else {
      console.log("event listener removed")
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartShowing]);

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
        <div className={styles.searchBar}>
          <button className={styles.searchBarBtn}>
            <span
              className={`material-symbols-outlined ${styles.iconSmall} ${styles.searchBarIcon}`}
            >
              search
            </span>
          </button>
        </div>
        <section className={styles.cartSection}>
          <button onClick={shoppingCartSelected} ref={shoppingCartBtnRef}>
            <span className={`material-symbols-outlined ${styles.iconSmall}`}>
              shopping_cart
            </span>
          </button>
          <CartPopout isShown={cartShowing} ref={cartPopoutRef} togglePopout={togglePopout}/>
        </section>
      </div>
    </section>
  );
};

export default Header;
