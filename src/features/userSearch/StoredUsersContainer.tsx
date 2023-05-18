import { useSelector } from 'react-redux';
import { PublicGitHubUser } from '../../common/services/publicGitHubApi';
import { RootState } from '../../app/store';
import UserCardContainer from '../../common/components/userCardContainer/UserCardContainer';

const StoredUsersContainer: React.FC = () => {
  const users: PublicGitHubUser[] = useSelector(
    (state: RootState) => state.users
  );

  return (
    <div className="fillParentWidth">
      <UserCardContainer users={users} title="Recent Searches" />
    </div>
  );
};

export default StoredUsersContainer;
