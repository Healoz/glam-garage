import styles from "./SearchBar.module.css";
import React, {
  useEffect,
  useRef,
  useState,
  FC,
  useContext,
  RefObject,
} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const SearchBar: FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const [isDesktop, setIsDesktop] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  useEffect(() => {
    console.log(isDesktop);
    setSearchOpen(true);
  }, [isDesktop]);

  const checkIsDesktop = () => {
    if (window.screen.width >= 1200) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  };

  const handleSearchBtn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isDesktop) {
      if (searchQuery === "") return;

      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);

      return;
    }

    if (searchOpen) {
      if (searchQuery === "") return;

      // navigate if search open
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      return;
    }

    // if neither desktop or searchOpen, just open the search input
    setSearchOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <motion.div
      className={styles.searchBar}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ transformOrigin: "right" }}
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
  );
};

export default SearchBar;
