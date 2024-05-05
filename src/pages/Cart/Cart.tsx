import styles from "./Cart.module.css";
import React from "react";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { Product } from "../../data/types";

interface CartProps {
  cartItems: Product[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {

    return (
        <h1>Cart Page</h1>
    )
};

export default Cart;
