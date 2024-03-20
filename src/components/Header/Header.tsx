import styles from './Header.module.css';
import React from 'react';

interface HeaderProps {
    // isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ }) => {

    return (
        <section className={styles.header}>
            <div className={styles.menuItems}>
                <div className={styles.logo}>
                    <button>
                        <span className={`material-symbols-outlined ${styles.icon}`}>garage_home</span>
                        <h3>GlamGarage</h3>
                    </button>
                </div>
                    <ul className={styles.desktopMenuItems}>
                        <li>Menu Item 1</li>
                        <li>Menu Item 2</li>
                        <li>Menu Item 3</li>
                    </ul>
            </div>
            
            <div className={styles.menuBtns}>
                <div className={styles.searchBar}>
                    <button className={styles.searchBarBtn}><span className={`material-symbols-outlined ${styles.iconSmall} ${styles.searchBarIcon}`}>search</span></button>
                </div>
                <button><span className={`material-symbols-outlined ${styles.iconSmall}`}>shopping_cart</span></button>
            </div>
        </section>
    )

}

export default Header;