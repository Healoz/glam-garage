import styles from './Footer.module.css';

export default function Footer() {

    return (
        <div className={styles.footerContainer}>
            <footer className={styles.footer}>
                <div className={styles.footerColumn}>
                    <h3>Heading 1</h3>
                    <ul>
                        <li><a>Menu item 1</a></li>
                        <li><a>Menu item 2</a></li>
                        <li><a>Menu item 3</a></li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h3>Heading 2</h3>
                    <ul>
                        <li><a>Menu item 1</a></li>
                        <li><a>Menu item 2</a></li>
                        <li><a>Menu item 3</a></li>
                    </ul>
                </div>

                <p>Copyright © Lauren Easter 2024</p>
            
            </footer>
        </div>
        
    )

}