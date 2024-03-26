import styles from './CatalogueItem.module.css';
import React from 'react';

interface CatalogueItemProps {
    productImageUrl: string;
}

const CatalogueItem: React.FC<CatalogueItemProps> = ({ productImageUrl }) => {

    return (
        <div className={styles.catalogueItem}>
            <div 
                className={styles.productImage}
                style={{backgroundImage: `url(${productImageUrl})`}}
            >
                <div className={styles.saveButton}>
                    <span className="material-symbols-outlined">favorite</span>
                </div>
            </div>
            <div className={styles.itemInfo}>
                <h4>Pretty purple dress</h4>
                <p>Womens Dresses</p>
                <h4>$27</h4>
            </div>
            
        </div>
    )
}

export default CatalogueItem;


