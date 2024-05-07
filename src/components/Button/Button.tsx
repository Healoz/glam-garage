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
  isCircle: boolean;
  fillsSpace: boolean;
  customPadding?: number;
  onClickFunction?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  buttonText,
  colourScheme,
  iconCode,
  buttonLink,
  fontSize,
  isCircle,
  fillsSpace,
  customPadding,
  onClickFunction,
}) => {
  const colourSchemeClass =
    colourScheme === ColourScheme.Primary
      ? styles.primaryColour
      : colourScheme === ColourScheme.Secondary
      ? styles.secondaryColour
      : colourScheme === ColourScheme.White
      ? styles.white
      : styles.defaultColour;

  // check if custom font size or padding have been provided
  const fontSizeStyle = fontSize ? { fontSize: fontSize } : {};
  const paddingStyle = customPadding ? { padding: customPadding } : {};

  const combinedStyles = { ...fontSizeStyle, ...paddingStyle };

  return (
    <div
      className={`${isCircle ? styles.isCircle : ""} ${
        fillsSpace ? styles.fillsSpace : ""
      } ${styles.button}`}
      onClick={onClickFunction}
    >
      <Link
        className={colourSchemeClass}
        to={buttonLink}
        style={combinedStyles}
      >
        {buttonText}
        <span className="material-symbols-outlined">{iconCode}</span>
      </Link>
    </div>
  );
};

export default Button;
