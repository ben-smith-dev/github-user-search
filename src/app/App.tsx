import UserCard from '../features/userSearch/UserCard';
import UserSearchForm from '../features/userSearch/UserSearchForm';

const App: React.FC = () => {
  return (
    <div>
      <h1>GitHub User Search</h1>
      <UserSearchForm />
      <UserCard />
    </div>
  );
};

export default App;
