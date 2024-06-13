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
  addProductToFavourites: (newProduct: Product) => void;
  removeProductFromFavourites: (removedProduct: Product) => void;
  checkIfProductInFavourites: (product: Product) => boolean;
}

const CatalogueItem: React.FC<CatalogueItemProps> = ({
  product,
  addProductToFavourites,
  removeProductFromFavourites,
  checkIfProductInFavourites,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleFavClick = () => {
    if (checkIfProductInFavourites(product)) {
      removeProductFromFavourites(product);
    } else {
      addProductToFavourites(product);
    }
  };

  const favBtnAppearance = checkIfProductInFavourites(product)
    ? {
        fontVariationSettings: '"FILL" 1, "wght" 300, "GRAD" 0, "opsz" 24',
      }
    : {
        fontVariationSettings: '"FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24',
      };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={styles.catalogueItemContainer}
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                loading="lazy"
              ></motion.img>
            )}
          </AnimatePresence>
        </div>

        <div className={styles.itemInfo}>
          <div>
            <h4>{product.name}</h4>
            <p><Link to={`/category/${product.category}`}>{product.category}</Link></p>
          </div>
          <h4 className={styles.price}>${product.price}</h4>
        </div>
      </Link>

      <button onClick={handleFavClick}>
        <div className={styles.saveButton}>
          <span className="material-symbols-outlined" style={favBtnAppearance}>
            favorite
          </span>
        </div>
      </button>
    </motion.div>
  );
};

export default CatalogueItem;
