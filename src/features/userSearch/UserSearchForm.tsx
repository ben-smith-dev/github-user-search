import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchUser } from './usersSlice';
import SearchForm from '../../common/components/searchForm/SearchForm';
import styles from './userSearchForm.module.css';

enum InitialAnimationRequiredState {
  None,
  InitialRender,
  NotRequired,
}

class PatternRequirementPart {
  constructor(
    public readonly pattern: RegExp,
    public readonly message: string
  ) {}
}

const usernamePatternRequirements: PatternRequirementPart[] = [
  new PatternRequirementPart(
    new RegExp(/^[a-z\d]/i),
    'Can only start with a letter or number.'
  ),
  new PatternRequirementPart(
    new RegExp(/^[a-z\d-]+$/i),
    'Can only include letter, numbers, and hyphens.'
  ),
  new PatternRequirementPart(
    new RegExp(/^(?!.*--)/, 'i'),
    'Cannot include consecutive hyphens'
  ),
  new PatternRequirementPart(
    new RegExp(/[a-z\d]$/i),
    'Can only end with a letter or number.'
  ),
  new PatternRequirementPart(
    new RegExp(/^.{1,39}$/),
    'Has to be 1-39 characters long.'
  ),
];

const isValidUsername = (username: string): boolean => {
  // Check search term against username pattern requirements.
  for (let index = 0; index < usernamePatternRequirements.length; index++) {
    const { pattern } = usernamePatternRequirements[index];

    if (!pattern.test(username)) {
      return false;
    }
  }
  return true;
};

const UserSearchForm: React.FC = () => {
  const userSearch = useRef<HTMLInputElement | null>(null);
  const [hasUsernamePatternError, setHasUsernamePatternError] = useState(false);
  const [addRateLimitAnimation, setAddRateLimitAnimation] = useState(
    InitialAnimationRequiredState.None
  );

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

  useEffect(() => {
    if (
      rateLimit &&
      addRateLimitAnimation === InitialAnimationRequiredState.None
    ) {
      setAddRateLimitAnimation(InitialAnimationRequiredState.InitialRender);
    } else if (
      addRateLimitAnimation === InitialAnimationRequiredState.InitialRender
    ) {
      setAddRateLimitAnimation(InitialAnimationRequiredState.NotRequired);
    }

    // eslint thinks that we are depending on addRateLimitAnimation to re-render.
    // eslint-disable-next-line
  }, [rateLimit]);

  let rateLimitWarningStyle = '';
  if (rateLimit && rateLimit.remaining <= 0) {
    rateLimitWarningStyle = `
      ${
        !(addRateLimitAnimation === InitialAnimationRequiredState.InitialRender)
          ? styles.rateLimitCardError
          : ''
      }
      ${styles.limitReached}`;
  } else if (rateLimit && rateLimit.remaining <= 10) {
    rateLimitWarningStyle = styles.limitClose;
  } else if (rateLimit && rateLimit.remaining <= 30) {
    rateLimitWarningStyle = styles.warning;
  }

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
          <p>
            Username may only contain alphanumeric characters or single hyphens,
            and cannot begin or end with a hyphen. Max length of 39 characters.
          </p>
        </div>
      </div>

      {rateLimit && (
        <div
          key={searchResult?.searchedUsername}
          className={`
                centerChildren
                ${styles.rateLimitCard}
                ${rateLimitWarningStyle}
                ${
                  addRateLimitAnimation ===
                  InitialAnimationRequiredState.InitialRender
                    ? styles.easeRateLimitIn
                    : ''
                }`}
        >
          <p>Remaining</p>
          <p>{rateLimit?.remaining ?? 0}</p>
        </div>
      )}
    </div>
  );
};

export default UserSearchForm;
