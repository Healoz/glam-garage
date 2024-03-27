import styles from "./Button.module.css";
import ColourScheme from "../../enums/ColourScheme";
import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  buttonText?: string;
  colourScheme: ColourScheme;
  iconCode: string;
  buttonLink: string;
  fontSize?: number;
}

const Button: React.FC<ButtonProps> = ({
  buttonText,
  colourScheme,
  iconCode,
  buttonLink,
  fontSize,
}) => {
  const colourSchemeClass =
    colourScheme === ColourScheme.Primary
      ? styles.primaryColour
      : colourScheme === ColourScheme.Secondary
      ? styles.secondaryColour
      : colourScheme === ColourScheme.White
      ? styles.white
      : styles.defaultColour;

  const fontSizeClass = { fontSize: fontSize };

  return (
    <div className={styles.button}>
      <Link className={colourSchemeClass} to={buttonLink} style={fontSizeClass}>
        {buttonText}
        <span className="material-symbols-outlined">{iconCode}</span>
      </Link>
    </div>
  );
};

export default Button;
