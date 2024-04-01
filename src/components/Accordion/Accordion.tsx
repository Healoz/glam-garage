import styles from "./Accordion.module.css";
import React, { useState } from "react";

interface AccordionProps {
  accordionTitle: string;
  accordionContent: string;
  contentShowing: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  accordionTitle,
  accordionContent,
  contentShowing,
}) => {
  const [isShowing, setIsShowing] = useState(false);

  const accordionClicked = () => {
    setIsShowing((prevState) => !prevState);
  };

  return (
    <div className={styles.accordion}>
      <button className={styles.accordionButton} onClick={accordionClicked}>
        <p>{accordionTitle}</p>
        <div>
          <span className="material-symbols-outlined">{isShowing ? 'remove' : 'add'}</span>
        </div>
      </button>
      <div className={`${styles.content} ${!isShowing ? styles.hideContent : ''}`}>
        <p>{accordionContent}</p>
      </div>
    </div>
  );
};

export default Accordion;
