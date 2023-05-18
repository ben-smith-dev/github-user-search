import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import UserCard from '../../components/userCard/UserCard';

const SearchedUserContainer: React.FC = () => {
  const user = useSelector((state: RootState) => {
    return state.users ? state.users[0] : null;
  });

  return (
    <div>
      <UserCard user={user} />
    </div>
  );
};

export default SearchedUserContainer;
