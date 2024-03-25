import styles from './Button.module.css';
import ColourScheme from '../../enums/ColourScheme';
import React from 'react';

interface ButtonProps {
    buttonText: String;
    colourScheme: ColourScheme;
    iconCode: String;
}

const Button: React.FC<ButtonProps> = ({ buttonText, colourScheme, iconCode }) => {

    return (
        <a className={styles.button}>
            <p className={colourScheme === ColourScheme.Primary ? styles.primaryColour : styles.defaultColour}>
                {buttonText}<span className="material-symbols-outlined">{iconCode}</span>
            </p>
        </a>
    )
}

export default Button;