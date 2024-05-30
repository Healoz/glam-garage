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

const SearchBar: FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchQuery === "") return;

    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSearch}>
        <input value={searchQuery} onChange={handleSearchChange} placeholder="Search"></input>
        <button className={styles.searchBarBtn} type="submit">
          <span
            className={`material-symbols-outlined ${styles.iconSmall} ${styles.searchBarIcon}`}
          >
            search
          </span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
