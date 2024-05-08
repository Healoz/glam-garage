import styles from "./SizeSelect.module.css";
import React, { useState } from "react";
import { Size } from "../../data/types";

interface SizeSelectProps {
  setSelectedSize: (size: Size) => void;
}

const SizeSelect: React.FC<SizeSelectProps> = ({ setSelectedSize }) => {

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // whenever the user changes the select option, the state of the selectedSize changes
    const newSize = event.target.value as Size;
    setSelectedSize(newSize);
  }

  // Gets array of enums as String
  const selectOptions = Object.values(Size);

  const selectOptionsContainer = selectOptions.map((selectOption, index) => {
    return <option key={index}>{selectOption}</option>;
  });

  return (
    <div className={styles.selectContainer}>
      <select onChange={handleSizeChange}>{selectOptionsContainer}</select>
      <span className={styles.customArrow}>
        <span className="material-symbols-outlined">arrow_drop_down</span>
      </span>
    </div>
  );
};

export default SizeSelect;
