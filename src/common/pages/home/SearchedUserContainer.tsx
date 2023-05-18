import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import UserCard from '../../components/userCard/UserCard';

const SearchedUserContainer: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <UserCard user={user} />
    </div>
  );
};

export default SearchedUserContainer;
