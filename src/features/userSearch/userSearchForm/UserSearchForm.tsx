import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { fetchUser } from '../index';
import { SearchForm } from '../../../common/components';

import styles from './userSearchForm.module.css';

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
    playedRateLimitAnimation && styles.rateLimitCardError;

  if (remainingRateLimit <= 0) return `${styles.limitReached} ${errorStyle}`;
  if (remainingRateLimit <= 10) return styles.limitClose;
  if (remainingRateLimit <= 30) return styles.warning;

  return '';
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
    <div className={`${styles.userSearchFormContainer}`}>
      <div className={`centerChildren ${styles.search}`}>
        <SearchForm
          onSubmit={onSubmit}
          searchRef={userSearch}
          searchPreviewText="Username"
        />

        <div
          className={`
          ${styles.searchInvalidPopup}
          ${!hasUsernamePatternError && 'visibilityHidden'}`}
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
                centerChildren
                ${styles.rateLimitCard}
                ${rateLimitWarningStyle}
                ${!playedRateLimitAnimation.current && styles.easeRateLimitIn}`}
        >
          <p>Remaining</p>
          <p>{rateLimit?.remaining ?? 0}</p>
        </div>
      )}
    </div>
  );
};
