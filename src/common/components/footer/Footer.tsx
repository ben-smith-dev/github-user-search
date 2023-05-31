import invertocatLogo from '../../assets/github-invertocat-logo.svg';
import styles from './footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.repositoryLinkContainer}>
        <a
          href="https://github.com/ben-smith-dev/github-user-search"
          rel="noreferrer noopener"
          target="_blank"
          title="Opens this web apps GitHub Repository in a new tab."
        >
          <img
            className={styles.invertocatLogo}
            src={invertocatLogo}
            alt="GitHub invertocat logo."
          />
        </a>
      </div>
    </footer>
  );
};
