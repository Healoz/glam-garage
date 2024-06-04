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
  // const [searchIsOpen, setSearchIsOpen] = useState(false);

  const searchControls = useAnimationControls();

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

  return (
    <div className={styles.searchBarContainer}>
      {isDesktop || searchShowing ? (
        <motion.div
          className={styles.searchBar}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: "right" }}
          ref={searchBarRef}
        >
          <form onSubmit={handleSearchBtn}>
            <motion.input
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search"
            ></motion.input>
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
        <button className={styles.searchBarBtnClosed} onClick={openSearch}>
          <span
            className={`material-symbols-outlined ${styles.iconSmall} ${styles.searchBarIcon}`}
          >
            search
          </span>
        </button>
      )}
    </div>
  );
};

export default forwardRef(SearchBar);
