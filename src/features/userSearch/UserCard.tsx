import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const UserCard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <a href={user?.html_url} target="_blank" rel="noreferrer">
        <h1>{user?.name}</h1>
        <h2>{user?.login}</h2>
        <img
          src={user?.avatar_url}
          height={100}
          width={100}
          alt="GitHub user's avatar."
        ></img>
        <p>Joined {new Date(user?.created_at ?? '').toDateString()}</p>
        <p>Followers: {user?.followers ?? 0}</p>
        <p>Following: {user?.following ?? 0}</p>
        <p>Public Repos: {user?.public_repos ?? 0}</p>
      </a>
    </div>
  );
};

export default UserCard;
