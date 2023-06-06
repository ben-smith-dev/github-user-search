import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { fetchUser } from '../index';
import { SearchForm } from '../../../common/components';

const usernameRequirements: RegExp[] = [
  new RegExp(/^[a-z\d]/i), // Can only start with a letter or number.
  new RegExp(/^[a-z\d-]+$/i), // Can only include letter, numbers, and hyphens.
  new RegExp(/^(?!.*--)/, 'i'), // Cannot include consecutive hyphens.
  new RegExp(/[a-z\d]$/i), // Can only end with a letter or number.
  new RegExp(/^.{1,39}$/), // Has to be 1-39 characters long.
];

const usernameRequirementDescription: string = `
  Username may only contain alphanumeric characters or single hyphens,
  and cannot begin or end with a hyphen. Max length of 39 characters.`;

const isValidUsername = (username: string): boolean => {
  // Check search term against username pattern requirements.
  for (let index = 0; index < usernameRequirements.length; index++) {
    const regex = usernameRequirements[index];

    if (!regex.test(username)) {
      return false;
    }
  }
  return true;
};

const createRateLimitWarningStyle = (
  remainingRateLimit: number,
  playedRateLimitAnimation: boolean
): string => {
  const errorStyle: string =
    (playedRateLimitAnimation && 'animate-h-shake') || '';

  if (remainingRateLimit <= 0)
    return `${'border-red-500 text-red-500'} ${errorStyle}`;

  if (remainingRateLimit <= 10) return 'border-orange-500 text-orange-500';

  if (remainingRateLimit <= 30) return 'border-yellow-500 text-yellow-500';

  return 'border-black text-black';
};

export const UserSearchForm: React.FC = () => {
  const userSearch = useRef<HTMLInputElement | null>(null);
  const playedRateLimitAnimation = useRef<boolean | null>(false);
  const [hasUsernamePatternError, setHasUsernamePatternError] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const rateLimit = useSelector((state: RootState) => state.users.rateLimit);
  const searchResult = useSelector(
    (state: RootState) => state.users.searchResult
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const username = userSearch.current?.value;

    if (username && isValidUsername(username)) {
      dispatch(fetchUser(username));

      // Clear search value.
      if (userSearch.current) {
        userSearch.current.value = '';
      }

      setHasUsernamePatternError(false);
    } else {
      setHasUsernamePatternError(true);
    }
  };

  let rateLimitWarningStyle: string = createRateLimitWarningStyle(
    rateLimit?.remaining ?? 0,
    playedRateLimitAnimation.current ?? false
  );

  return (
    <div className="w-full h-[3rem] flex gap-2">
      <div className="w-full h-full relative">
        <SearchForm
          onSubmit={onSubmit}
          searchRef={userSearch}
          searchPreviewText="Username"
        />

        <div
          className={`
          absolute top-[3.5rem] left-0 z-10 p-2 w-[75vw] min-w-[25ch] max-w-[40ch] bg-white border-red-500 border-2 rounded-md
          ${!hasUsernamePatternError && 'hidden'}`}
        >
          <p>{usernameRequirementDescription}</p>
        </div>
      </div>

      {rateLimit && (
        <div
          key={searchResult?.searchedUsername}
          onAnimationEnd={() => {
            playedRateLimitAnimation.current = true;
          }}
          className={`
                h-full flex flex-col justify-center items-center p-4 border-2 rounded-md [contain:content]
                ${!playedRateLimitAnimation.current && 'animate-w-scale-in'}
                ${createRateLimitWarningStyle(
                  rateLimit?.remaining,
                  playedRateLimitAnimation?.current ?? false
                )}`}
        >
          <p>Remaining</p>
          <p>{rateLimit?.remaining ?? 0}</p>
        </div>
      )}
    </div>
  );
};
