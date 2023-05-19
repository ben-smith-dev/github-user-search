import { PublicGitHubUser } from '../../services/publicGitHubApi';
import UserCard from '../userCard/UserCard';
import styles from './userCardContainer.module.css';

export interface UserCardContainerProps {
  users: PublicGitHubUser[];
  title: string;
  clearContainer: () => void;
  clearContainerPrompt: string;
}

const UserCardContainer: React.FC<UserCardContainerProps> = ({
  users,
  title,
  clearContainerPrompt,
  clearContainer,
}) => {
  return (
    <div>
      <div className={styles.containerHeader}>
        <h3>
          {title} [{users.length}]
        </h3>

        <button
          onClick={clearContainer}
          className={styles.containerClearButton}
        >
          {clearContainerPrompt}
        </button>
      </div>
      <hr />
      <div className={styles.gridContainer}>
        {users.map((user) => (
          <div key={user.login} className="centerChildrenHorizontal">
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCardContainer;
