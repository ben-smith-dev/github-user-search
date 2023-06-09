import {
  SearchedUserContainer,
  StoredUsersContainer,
} from '../../../features/userSearch';

export const Home: React.FC = () => {
  return (
    <div className="centerChildrenHorizontal">
      <SearchedUserContainer />
      <StoredUsersContainer />
    </div>
  );
};
