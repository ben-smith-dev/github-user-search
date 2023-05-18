import UserCard from '../../features/userSearch/UserCard';
import UserSearchForm from '../../features/userSearch/UserSearchForm';

const Home: React.FC = () => {
  return (
    <div className="centerChildrenHorizontal">
      <h1>GitHub User Search</h1>
      <UserSearchForm />
      <UserCard />
    </div>
  );
};

export default Home;
