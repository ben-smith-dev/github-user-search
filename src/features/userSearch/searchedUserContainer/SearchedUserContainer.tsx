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
          <div
            title={`fetching ${searchResult.searchedUsername}.`}
            className="cursor-wait"
          >
            <UserCardSkeleton />
          </div>
        ) : searchResult?.status === 'found' ? (
          <UserCard user={searchResult.user} />
        ) : (
          <div
            className={`${
              searchResult === null ? '[visibility:hidden]' : 'animate-h-shake'
            }`}
            title={
              searchResult?.searchedUsername
                ? `${searchResult.searchedUsername} not found.`
                : 'User not found.'
            }
          >
            <UserCardSkeleton isError={true} />
          </div>
        )}
      </div>
    </div>
  );
};
