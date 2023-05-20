import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import UserCard from '../../components/userCard/UserCard';
import styles from './searchedUserContainer.module.css';

const SearchedUserContainer: React.FC = () => {
  const searchResult = useSelector((state: RootState) => {
    return state.users.searchResult;
  });

  const user = searchResult?.user ?? null;

  return (
    <div className={styles.searchedUserContainer}>
      <div className={`${styles.userSearchForm}`}>
        {searchResult && (
          <div className={styles.searchResultText}>
            <p>Showing result for: {searchResult?.searchedUsername}</p>

            <p>{user ? 'user found' : 'no user found'}</p>
          </div>
        )}
      </div>

      <div
        className={`centerChildrenHorizontal ${
          user ? styles.scaleVisibilityIn : styles.scaleVisibilityOut
        }`}
      >
        <UserCard user={user} />
      </div>
    </div>
  );
};

export default SearchedUserContainer;
