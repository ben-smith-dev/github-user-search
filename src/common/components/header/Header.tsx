import styles from './header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1>GitHub User Search</h1>
    </header>
  );
};

export default Header;
