import styles from "./Favourites.module.css";
import Button from "../Button/Button";
import ColourScheme from "../../enums/ColourScheme";
import dummyImg from "../../assets/images/carlos-vaz-KP4bxnxAilU-unsplash.jpg";
import { CartItem, Product } from "../../data/types";
import { motion } from "framer-motion";
import CatalogueItem from "../CatalogueItem/CatalogueItem";
import CatalogueGrid from "../CatalogueGrid/CatalogueGrid";

interface FavouritesProps {
  favourites: Product[];
  addProductToFavourites: (newProduct: Product) => void;
  removeProductFromFavourites: (removedProduct: Product) => void;
  checkIfProductInFavourites: (product: Product) => boolean;
}

const Favourites: React.FC<FavouritesProps> = ({
  favourites,
  addProductToFavourites,
  removeProductFromFavourites,
  checkIfProductInFavourites,
}) => {
  return (
    <section className={styles.favouritesContainer}>
      <h2>Saved Items</h2>
      {favourites.length > 0 ? (
        <CatalogueGrid
          products={favourites}
          addProductToFavourites={addProductToFavourites}
          removeProductFromFavourites={removeProductFromFavourites}
          checkIfProductInFavourites={checkIfProductInFavourites}
        />
      ) : (
        <h3>You have no saved items.</h3>
      )}
    </section>
  );
};

export default Favourites;
