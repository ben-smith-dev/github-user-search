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
      className="w-full h-full grid grid-cols-[1fr_8ch] rounded-md border-black border-2"
    >
      <div dir="ltr">
        <input
          type="search"
          id="searchInput"
          autoComplete="off"
          autoCorrect="off"
          ref={searchRef}
          placeholder={searchPreviewText}
          className="w-full h-full rounded-s-md bg-transparent p-[0.5em] outline-offset-0"
        />
      </div>

      <div dir="rtl">
        <button
          type="submit"
          className="w-full h-full rounded-s-md transition-all ease-in-out hover:bg-gray-300 focus:bg-gray-300 active:text-sm"
        >
          Search
        </button>
      </div>
    </form>
  );
};
