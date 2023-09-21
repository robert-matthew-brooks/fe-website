import { Link } from 'react-router-dom';
import './HeaderLogo.css';

export default function HeaderLogo() {
  return (
    <Link to={'/'} id="Logo">
      <ul>
        <li>Robert</li>
        <li>Matthew</li>
        <li>Brooks</li>
      </ul>
    </Link>
  );
}
