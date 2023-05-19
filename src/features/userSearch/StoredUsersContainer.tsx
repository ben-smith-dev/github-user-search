import { useDispatch, useSelector } from 'react-redux';
import { PublicGitHubUser } from '../../common/services/publicGitHubApi';
import { AppDispatch, RootState } from '../../app/store';
import UserCardContainer from '../../common/components/userCardContainer/UserCardContainer';
import { clearUsers } from './userSlice';

const StoredUsersContainer: React.FC = () => {
  const users: PublicGitHubUser[] = useSelector(
    (state: RootState) => state.users
  );

  const dispatch = useDispatch<AppDispatch>();

  const clearContainerHandler = () => {
    console.log('clearing cached users');

    dispatch(clearUsers());
  };

  return (
    <div className="fillParentWidth">
      <UserCardContainer
        users={users}
        title="Recent Searches"
        clearContainerPrompt="Clear Cached Users"
        clearContainer={clearContainerHandler}
      />
    </div>
  );
};

export default StoredUsersContainer;
