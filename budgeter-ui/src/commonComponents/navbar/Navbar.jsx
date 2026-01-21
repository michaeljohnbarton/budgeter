import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.navbarLogo}>
				<Link to="/">Budgeter</Link>
			</div>
			<ul className={styles.navLinks}>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/configuration">Configuration</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
