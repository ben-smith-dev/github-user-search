import StoredUsersContainer from '../../../features/userSearch/StoredUsersContainer';
import SearchedUserContainer from './SearchedUserContainer';

const Home: React.FC = () => {
  return (
    <div className="centerChildrenHorizontal">
      <SearchedUserContainer />
      <StoredUsersContainer />
    </div>
  );
};

export default Home;
