import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import styles from './userCard.module.css';

const UserCard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const joinedDate = new Date(user?.created_at ?? '');
  const joinedYear = joinedDate.getFullYear();

  return (
    <a
      href={user?.html_url}
      target="_blank"
      rel="noreferrer"
      className={`
      ${styles.userCard}
      ${styles.limitedStyle}
      `}
    >
      <div className={styles.cardHeader}>
        <img
          src={user?.avatar_url}
          alt="GitHub user's avatar."
          className={styles.userAvatar}
        ></img>
        <div>
          <h1>{user?.name}</h1>
          <h2>{user?.login}</h2>
        </div>
      </div>

      <div className={styles.cardContent}>
        <p>{user?.bio ?? 'No bio available.'}</p>
      </div>

      <div className={styles.cardFooter}>
        <p>Followers: {user?.followers ?? 0}</p>
        <p>Following: {user?.following ?? 0}</p>
        <p>Public Repos: {user?.public_repos ?? 0}</p>
        <p>Joined {joinedYear}</p>
      </div>
    </a>
  );
};

export default UserCard;
