import styles from "./Header.module.css";
import React from "react";
import CartPopout from "../CartPopout/CartPopout";
import { Link } from "react-router-dom";

interface HeaderProps {
  // isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({}) => {

  const [cartShowing, setCartShowing] = React.useState<boolean>(false);

  function shoppingCartSelected() {

    // if desktop, show popout
    if (window.screen.width > 1200) {
      // change prop in component
      setCartShowing(prevCartShowing => !prevCartShowing);
      console.log(cartShowing);
    } else {
      // navigate to page
    }

    // if mobile / tablet, navigate to cart page
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
          <button
            onClick={shoppingCartSelected}
          >
            <span className={`material-symbols-outlined ${styles.iconSmall}`}>
              shopping_cart
            </span>
          </button>
          <CartPopout isShown={cartShowing} />
        </section>
      </div>
    </section>
  );
};

export default Header;
