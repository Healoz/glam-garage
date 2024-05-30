import styles from "./Search.module.css";
import React, { useContext } from "react";
import Button from "../../components/Button/Button";
import { Product } from "../../data/types";
import CartItemElement from "../../components/CartItem/CartItemElement";
import ColourScheme from "../../enums/ColourScheme";
import { CartContext } from "../../App";
import { CartItem } from "../../data/types";
import { motion, AnimatePresence } from "framer-motion";

interface SearchProps {
  products: Product[];
  //   searchQuery: string;
}

const Search: React.FC<SearchProps> = ({ products }) => {
  return <main></main>;
};

export default Search;
