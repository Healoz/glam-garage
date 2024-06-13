import styles from "./Search.module.css";
import React, { useContext } from "react";
import Button from "../../components/Button/Button";
import { Product } from "../../data/types";
import CartItemElement from "../../components/CartItem/CartItemElement";
import ColourScheme from "../../enums/ColourScheme";
import { CartContext } from "../../App";
import { CartItem } from "../../data/types";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import CatalogueGrid from "../../components/CatalogueGrid/CatalogueGrid";

interface SearchProps {
  products: Product[];
  addProductToFavourites: (newProduct: Product) => void;
  removeProductFromFavourites: (removedProduct: Product) => void;
  checkIfProductInFavourites: (product: Product) => boolean;
  //   searchQuery: string;
}

const Search: React.FC<SearchProps> = ({
  products,
  addProductToFavourites,
  removeProductFromFavourites,
  checkIfProductInFavourites,
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");

  const filteredProducts = products.filter((product) => {
    // return if no search query
    if (!searchQuery) return;

    const lowerCaseProductName = product.name.toLowerCase();

    return lowerCaseProductName.includes(searchQuery.toLowerCase());
  });

  return (
    <main className={styles.searchPage}>
      <div className={styles.title}>
        {filteredProducts.length > 0 ? (
          <h3>Your search results for:</h3>
        ) : (
          <h3>There are no search results for:</h3>
        )}

        <h1>{searchQuery}</h1>
      </div>

      <CatalogueGrid
        products={filteredProducts}
        addProductToFavourites={addProductToFavourites}
        removeProductFromFavourites={removeProductFromFavourites}
        checkIfProductInFavourites={checkIfProductInFavourites}
      />
    </main>
  );
};

export default Search;
