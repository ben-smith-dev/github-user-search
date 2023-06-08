import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { UserCard, UserCardSkeleton } from '../../../common/components';
import { UserSearchForm } from '../index';

export const SearchedUserContainer: React.FC = () => {
  const searchResult = useSelector((state: RootState) => {
    return state.users.searchResult;
  });

  return (
    <div className="w-full flex flex-col justify-center">
      <div className=" w-[90%] min-w-fit max-w-[100ch] m-auto">
        <UserSearchForm />

        <div
          className={`
            flex justify-between flex-wrap py-1 font-light
            dark:text-gray-500
            ${!searchResult && '[visibility:hidden]'}`}
        >
          <p>Showing result for: {searchResult?.searchedUsername}</p>

          <p>
            {searchResult?.status === 'found'
              ? 'user found'
              : searchResult?.status === 'fetching'
              ? 'fetching user'
              : 'no user found'}
          </p>
        </div>
      </div>

      <div className={`w-full`}>
        {searchResult?.status === 'fetching' ? (
          <UserCardSkeleton />
        ) : searchResult?.user ? (
          <UserCard user={searchResult?.user ?? null} />
        ) : (
          <div
            className={`${
              searchResult === null ? '[visibility:hidden]' : 'animate-h-shake'
            }`}
            title="No user found."
          >
            <UserCardSkeleton enableAnimation={false} />
          </div>
        )}
      </div>
    </div>
  );
};
