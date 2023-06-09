import React from 'react';

export interface SearchFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  searchRef: React.MutableRefObject<HTMLInputElement | null>;
  searchPreviewText: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  onSubmit,
  searchRef,
  searchPreviewText,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-full grid grid-cols-[1fr_8ch] rounded-md border-black border-2
      dark:border-gray-400"
    >
      <div dir="ltr">
        <input
          type="search"
          id="searchInput"
          autoComplete="off"
          autoCorrect="off"
          ref={searchRef}
          placeholder={searchPreviewText}
          className="w-full h-full rounded-s-md bg-transparent p-[0.5em] outline-offset-0
          dark:text-gray-300"
        />
      </div>

      <div dir="rtl">
        <button
          type="submit"
          className="w-full h-full rounded-s-md transition-all ease-in-out active:text-sm
          hover:bg-gray-300 focus:bg-gray-300
            dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:text-gray-400"
        >
          Search
        </button>
      </div>
    </form>
  );
};
