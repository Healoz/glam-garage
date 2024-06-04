import styles from "./SearchBar.module.css";
import React, {
  useEffect,
  useRef,
  useState,
  FC,
  useContext,
  RefObject,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

interface SearchBarProps {
  searchShowing: boolean;
  setSearchShowing: (isShowing: boolean) => void;
}

const SearchBar: ForwardRefRenderFunction<HTMLDivElement, SearchBarProps> = (
  { searchShowing, setSearchShowing },
  ref
) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  const checkIsDesktop = () => {
    if (window.screen.width >= 1200) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  };

  const handleSearchBtn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchQuery === "") return;

    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);

    return;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const openSearch = () => {
    setSearchShowing(true);
  };

  const localRef = useRef<HTMLDivElement>(null);
  const searchBarRef = ref || localRef;

  const searchBarVariants = {
    initial: {
      paddingRight: 0,
      scaleX: 0,
      borderColor: "var(--transparent)",
    },
    animate: {
      paddingRight: "1.3rem",
      scaleX: 1,
      transition: { duration: 0.3 },
      borderColor: "var(--black)",
    },
    exit: {
      paddingRight: 0,
      scaleX: 0,
      transition: { duration: 0.3 },
      borderColor: "var(--transparent)",
    },
  };

  return (
    <div className={styles.searchBarContainer}>
      <AnimatePresence>
        {isDesktop || searchShowing ? (
          <motion.div
            className={styles.searchBar}
            transition={{ duration: 0.3 }}
            style={{ transformOrigin: "right" }}
            ref={searchBarRef}
            variants={searchBarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            key="searchBar"
          >
            <form onSubmit={handleSearchBtn}>
              <AnimatePresence>
                <motion.input
                  value={searchQuery}
                  key="searchBarInput"
                  onChange={handleSearchChange}
                  placeholder="Search"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                ></motion.input>
              </AnimatePresence>
              <div className={styles.searchBtns}>
                <AnimatePresence>
                  {searchQuery !== "" && (
                    <motion.button
                      className={`${styles.searchBarBtn} ${styles.clearTextBtn}`}
                      type="button"
                      onClick={clearSearch}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      <span
                        className={`material-symbols-outlined ${styles.iconSmall} ${styles.searchBarIcon}`}
                      >
                        close
                      </span>
                    </motion.button>
                  )}
                </AnimatePresence>
                <button className={styles.searchBarBtn} type="submit">
                  <span
                    className={`material-symbols-outlined ${styles.iconSmall} ${styles.searchBarIcon}`}
                  >
                    search
                  </span>
                </button>
              </div> 
            </form>
          </motion.div>
        ) : (
          // shown if search is closed
          <motion.button
            className={styles.searchBarBtnClosed}
            onClick={openSearch}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            transition={{ duration: 0, delay: 0.3 }}
            key="searchBarBtnClosed"
          >
            <span
              className={`material-symbols-outlined ${styles.iconSmall} ${styles.searchBarIcon}`}
            >
              search
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default forwardRef(SearchBar);
