import styles from './CatalogueItem.module.css';
import React from 'react';
import Button from '../Button/Button';
import ColourScheme from '../../enums/ColourScheme';
import { Product } from '../../data/types';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";

interface CatalogueItemProps {
    product: Product;
}

const CatalogueItem: React.FC<CatalogueItemProps> = ({ product }) => {

    return (
        <Link
            className={styles.catalogueItem}
            to={`product/${product.id}`}
        >
            <LazyLoadImage className={styles.productImage} src={product.imageUrls[0]} effect="blur"></LazyLoadImage>
            <div className={styles.saveButton}>
                    <span className="material-symbols-outlined">favorite</span>
                </div>
            <div className={styles.itemInfo}>
                <div>
                    <h4>{product.name}</h4>
                    <p>{product.category}</p>
                </div>
                <h4 className={styles.price}>${product.price}</h4>
            </div>
            
        </Link>
    )
}

export default CatalogueItem;


