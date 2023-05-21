import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../../app/store';
import UserCard from '../../components/userCard/UserCard';
import UserSearchForm from '../../../features/userSearch/UserSearchForm';
import styles from './searchedUserContainer.module.css';

const SearchedUserContainer: React.FC = () => {
  const [hadPreviousUser, setHadPreviousUser] = useState(false);
  const [fadeOutStyle, setFadeOutStyle] = useState('');

  const searchResult = useSelector((state: RootState) => {
    return state.users.searchResult;
  });

  useEffect(() => {
    setHadPreviousUser((prev) => {
      setFadeOutStyle(prev ? styles.scaleVisibilityOut : '');

      return searchResult?.user != null;
    });
  }, [searchResult]);

  return (
    <div className={styles.searchedUserContainer}>
      <div className={`${styles.userSearchForm}`}>
        <UserSearchForm />

        {searchResult && (
          <div className={styles.searchResultText}>
            <p>Showing result for: {searchResult?.searchedUsername}</p>

            <p>{searchResult?.user ? 'user found' : 'no user found'}</p>
          </div>
        )}
      </div>

      <div
        className={`centerChildrenHorizontal 
        ${!hadPreviousUser && 'visibilityHidden'}
        ${searchResult?.user ? styles.scaleVisibilityIn : fadeOutStyle}`}
      >
        <UserCard user={searchResult?.user ?? null} />
      </div>
    </div>
  );
};

export default SearchedUserContainer;
