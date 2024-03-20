import styles from './Header.module.css';
import React from 'react';

interface HeaderProps {
    isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ isMobile }) => {

    return (
        <section className={styles.header}>
            <div className={styles.logo}>
                <button>
                    <span className={`material-symbols-outlined ${styles.icon}`}>garage_home</span>
                    {!isMobile &&
                        <h3>GlamGarage</h3>
                    }
                </button>
            </div>
            <div className={styles.menuBtns}>
                <button><span className={`material-symbols-outlined ${styles.iconSmall}`}>search</span></button>
                <button><span className={`material-symbols-outlined ${styles.iconSmall}`}>shopping_cart</span></button>
            </div>
        </section>
    )

}

export default Header;