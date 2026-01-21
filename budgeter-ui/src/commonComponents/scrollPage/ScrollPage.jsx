import styles from './ScrollPage.module.css';

function ScrollPage({ children }) {
	return <div className={styles.scrollPage}>{children}</div>;
}

export default ScrollPage;