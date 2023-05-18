import UserSearchForm from '../../../features/userSearch/UserSearchForm';
import SearchedUserContainer from './SearchedUserContainer';

const Home: React.FC = () => {
  return (
    <div className="centerChildrenHorizontal">
      <h1>GitHub User Search</h1>
      <UserSearchForm />
      <SearchedUserContainer />
    </div>
  );
};

export default Home;