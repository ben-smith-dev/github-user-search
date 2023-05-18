import React from 'react';
import styles from './SearchForm.module.css';

export interface SearchFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  searchRef: React.MutableRefObject<HTMLInputElement | null>;
  searchPreviewText: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSubmit,
  searchRef,
  searchPreviewText,
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.searchContainer}>
      <input
        type="search"
        id="searchInput"
        autoComplete="off"
        autoCorrect="off"
        ref={searchRef}
        placeholder={searchPreviewText}
        className={styles.searchInput}
      />

      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
