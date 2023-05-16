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
    <form onSubmit={onSubmit}>
      <input
        type="search"
        id="searchInput"
        autoComplete="off"
        autoCorrect="off"
        ref={searchRef}
        placeholder={searchPreviewText}
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
