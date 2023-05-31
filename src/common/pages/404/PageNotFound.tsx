import { useNavigate } from 'react-router';
import styles from './pageNotFound.module.css';

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`
        centerChildren
        ${styles.container}`}
    >
      <div className={styles.header}>
        <h1>{'OOPS'}</h1>
        <h2>404: Page not found.</h2>
      </div>
      <button
        className={styles.navigateHome}
        onClick={() => {
          navigate('/');
        }}
      >
        Go to Home
      </button>
    </div>
  );
};
