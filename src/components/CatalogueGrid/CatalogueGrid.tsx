import styles from "./CatalogueGrid.module.css";
import Button from "../Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import dummyImg from "../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg";
import { CartItem, Product } from "../../data/types";
import { AnimatePresence, motion } from "framer-motion";
import CatalogueItem from "../CatalogueItem/CatalogueItem";

interface CatalogueGridProps {
  products: Product[];
  addProductToFavourites: (newProduct: Product) => void;
  removeProductFromFavourites: (removedProduct: Product) => void;
  checkIfProductInFavourites: (product: Product) => boolean;
}

const CatalogueGrid: React.FC<CatalogueGridProps> = ({
  products,
  addProductToFavourites,
  removeProductFromFavourites,
  checkIfProductInFavourites,
}) => {
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 * index,
      },
    }),
    exit: {
      opacity: 0,
      y: 100,
    },
  };

  const catalogueItems = products.map((product, index) => (
    <motion.div
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      exit={{opacity: 0}}
      key={product.id}
      viewport={{ once: true }}
      custom={index}
    >
      <CatalogueItem
        key={product.id}
        product={product}
        addProductToFavourites={addProductToFavourites}
        removeProductFromFavourites={removeProductFromFavourites}
        checkIfProductInFavourites={checkIfProductInFavourites}
      />
    </motion.div>
  ));

  return (
    <AnimatePresence>
      <motion.div className={styles.catalogueGrid} layout>{catalogueItems}</motion.div>
    </AnimatePresence>
  );
};

export default CatalogueGrid;
