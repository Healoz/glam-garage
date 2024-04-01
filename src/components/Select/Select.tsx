import styles from './Select.module.css';
import React from 'react';

interface SelectProps {
    selectOptions: string[];
}

const Select: React.FC<SelectProps> = ({selectOptions}) => {

    const selectOptionsContainer = selectOptions.map((selectOption, index) => {
        return (
            <option key={index}>{selectOption}</option>
        )
    })

    return (
        <div className={styles.selectContainer}>
          <select>
            {selectOptionsContainer}
          </select>
          <span className={styles.customArrow}>
            <span className="material-symbols-outlined">arrow_drop_down</span>
          </span>
        </div>
    )
}

export default Select;