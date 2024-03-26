import styles from './Button.module.css';
import ColourScheme from '../../enums/ColourScheme';
import React from 'react';

interface ButtonProps {
    buttonText: string;
    colourScheme: ColourScheme;
    iconCode: string;
    buttonLink: string;
}

const Button: React.FC<ButtonProps> = ({ buttonText, colourScheme, iconCode, buttonLink }) => {

    return (
        <div className={styles.button}>
            <a 
                className={colourScheme === ColourScheme.Primary ? styles.primaryColour : styles.defaultColour}
                href={buttonLink}>
                {buttonText}<span className="material-symbols-outlined">{iconCode}</span>
            </a>
        </div>
    )
}

export default Button;