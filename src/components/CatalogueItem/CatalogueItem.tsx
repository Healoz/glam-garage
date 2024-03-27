import styles from './CatalogueItem.module.css';
import React from 'react';
import Button from '../Button/Button';
import ColourScheme from '../../enums/ColourScheme';

interface CatalogueItemProps {
    productImageUrl: string;
}

const CatalogueItem: React.FC<CatalogueItemProps> = ({ productImageUrl }) => {

    return (
        <a className={styles.catalogueItem}>
            <div 
                className={styles.productImage}
                style={{backgroundImage: `url(${productImageUrl})`}}
            >
                <div className={styles.catalogueAddToCartOverlay}>
                    <Button 
                        buttonText="Add to cart"
                        colourScheme={ColourScheme.White}
                        iconCode="arrow_forward"
                        buttonLink="#"
                        fontSize={12}
                    />
                </div>
                <div className={styles.saveButton}>
                    <span className="material-symbols-outlined">favorite</span>
                </div>
            </div>
            <div className={styles.itemInfo}>
                <div>
                    <h4>Pretty purple dress</h4>
                    <p>Womens Dresses</p>
                </div>
                <h4>$27</h4>
            </div>
            
        </a>
    )
}

export default CatalogueItem;


