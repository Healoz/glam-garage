import styles from "./Accordion.module.css";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
          <span className="material-symbols-outlined">
            {isShowing ? "remove" : "add"}
          </span>
        </div>
      </button>
      <AnimatePresence>
        {isShowing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={styles.content}
          >
            <p>{accordionContent}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
