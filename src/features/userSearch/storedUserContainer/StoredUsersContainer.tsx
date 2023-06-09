import { useDispatch, useSelector } from 'react-redux';
import { PublicGitHubUser } from '../../../common/services/publicGitHubApi';
import { AppDispatch, RootState } from '../../../app/store';
import { clearUsers } from '../index';
import { UserCardContainer } from '../../../common/components';

export const StoredUsersContainer: React.FC = () => {
  const users: PublicGitHubUser[] = useSelector(
    (state: RootState) => state.users.searchedUsers
  );

  const dispatch = useDispatch<AppDispatch>();

  const clearContainerHandler = () => {
    dispatch(clearUsers());
  };

  return (
    <div>
      <UserCardContainer
        users={users}
        title="Recent Searches"
        clearContainerPrompt="Clear Recent Searches"
        clearContainer={clearContainerHandler}
      />
    </div>
  );
};
