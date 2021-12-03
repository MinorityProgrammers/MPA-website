import styles from "./header.module.css";

const Header = () => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <h1>EMPLOYERS DASHBOARD</h1>
      </div>
      <div className={styles.search}>
        <i className="fas fa-search"></i>
        <input type="text" placeholder="  Search" />
      </div>
    </div>
  );
};

export default Header;
