import styles from "./CatalogueItem.module.css";
import React, { useState } from "react";
import Button from "../Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import { Product } from "../../data/types";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AnimatePresence, motion } from "framer-motion";

interface CatalogueItemProps {
  product: Product;
}

const CatalogueItem: React.FC<CatalogueItemProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link className={styles.catalogueItem} to={`/product/${product.id}`}>
        <div className={styles.productImgContainer}>
          <motion.img
            className={styles.productImage}
            src={product.imageUrls[0]}
            loading="lazy"
          ></motion.img>
          <AnimatePresence>
            {isHovered && (
              <motion.img
                className={`${styles.productImage} ${styles.secondImage}`}
                src={product.imageUrls[1]}
                initial={{ opacity: 0}}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0}}
                loading="lazy"
              ></motion.img>
            )}
          </AnimatePresence>
        </div>

        <button>
          <div className={styles.saveButton}>
            <span className="material-symbols-outlined">favorite</span>
          </div>
        </button>

        <div className={styles.itemInfo}>
          <div>
            <h4>{product.name}</h4>
            <p>{product.category}</p>
          </div>
          <h4 className={styles.price}>${product.price}</h4>
        </div>
      </Link>
    </motion.div>
  );
};

export default CatalogueItem;
