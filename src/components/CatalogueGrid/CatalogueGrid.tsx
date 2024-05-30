import styles from "./CatalogueGrid.module.css";
import Button from "../Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import dummyImg from "../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg";
import { CartItem, Product } from "../../data/types";
import { motion } from "framer-motion";
import CatalogueItem from "../CatalogueItem/CatalogueItem";

interface CatalogueGridProps {
  products: Product[];
}

const CatalogueGrid: React.FC<CatalogueGridProps> = ({ products }) => {
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
  };

  const catalogueItems = products.map((product, index) => (
    <motion.div
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      custom={index}
    >
      <CatalogueItem key={product.id} product={product} />
    </motion.div>
  ));

  return <div className={styles.catalogueGrid}>{catalogueItems}</div>;
};

export default CatalogueGrid;
