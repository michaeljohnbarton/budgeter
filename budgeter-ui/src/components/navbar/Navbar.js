import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav class="navbar">
      <div class="navbar-logo">
        <Link to="/">Budgeter</Link>
      </div>
      <ul class="nav-links">
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
