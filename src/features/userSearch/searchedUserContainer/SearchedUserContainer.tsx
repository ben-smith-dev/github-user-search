import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../../app/store';
import { UserCard } from '../../../common/components';
import { UserSearchForm } from '../index';

export const SearchedUserContainer: React.FC = () => {
  // Disable eslint incase this state variable is needed later.
  // eslint-disable-next-line
  const [hadPreviousUser, setHadPreviousUser] = useState(false);
  const [fadeOutStyle, setFadeOutStyle] = useState('[visibility:hidden]');

  const searchResult = useSelector((state: RootState) => {
    return state.users.searchResult;
  });

  useEffect(() => {
    setHadPreviousUser((prev) => {
      setFadeOutStyle(
        prev ? 'animate-scale-visibility-out' : '[visibility:hidden]'
      );

      return searchResult?.user != null;
    });
  }, [searchResult]);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className=" w-[90%] min-w-fit max-w-[100ch] m-auto">
        <UserSearchForm />

        <div
          className={`
            flex justify-between flex-wrap py-1
            ${!searchResult && '[visibility:hidden]'}`}
        >
          <p>Showing result for: {searchResult?.searchedUsername}</p>

          <p>{searchResult?.user ? 'user found' : 'no user found'}</p>
        </div>
      </div>

      <div
        className={`
           w-full
          ${
            searchResult?.user !== undefined
              ? 'animate-scale-visibility-in'
              : fadeOutStyle
          }`}
      >
        <UserCard user={searchResult?.user ?? null} />
      </div>
    </div>
  );
};
