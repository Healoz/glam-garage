import styles from "./CategoryPage.module.css";
import React, { useContext } from "react";
import Button from "../../components/Button/Button";
import { Product } from "../../data/types";
import CartItemElement from "../../components/CartItem/CartItemElement";
import ColourScheme from "../../enums/ColourScheme";
import { CartContext } from "../../App";
import { CartItem } from "../../data/types";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CatalogueGrid from "../../components/CatalogueGrid/CatalogueGrid";

interface CategoryPageProps {
  products: Product[];
  addProductToFavourites: (newProduct: Product) => void;
  removeProductFromFavourites: (removedProduct: Product) => void;
  checkIfProductInFavourites: (product: Product) => boolean;
  
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  products,
  addProductToFavourites,
  removeProductFromFavourites,
  checkIfProductInFavourites,
}) => {

  const { id } = useParams();
  const currentCategory = id;

  const filteredProductsByCategory = products.filter((product) => product.category === currentCategory);

  const navigate = useNavigate();
  
  return (
    <main className={styles.searchPage}>
      <Button
        colourScheme={ColourScheme.Secondary}
        iconCode="arrow_back"
        onClickFunction={() => navigate(-1)}
        isCircle={true}
        fillsSpace={false}
      />
      <h1 className={styles.title}>{currentCategory}</h1>
      <CatalogueGrid
        products={filteredProductsByCategory}
        addProductToFavourites={addProductToFavourites}
        removeProductFromFavourites={removeProductFromFavourites}
        checkIfProductInFavourites={checkIfProductInFavourites}
      />
    </main>
  );
};

export default CategoryPage;
