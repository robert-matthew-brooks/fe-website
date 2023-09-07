import { Link } from 'react-router-dom';
import './LanguageIcon.css';

export default function LanguageIcon({ language, ...actionProps }) {
  return (
    <Link
      className="LanguageIcon__link"
      to={`/portfolio/${language.slug}`}
      {...actionProps} // allow onClick to be passed
    >
      <img src={language.icon_url} alt={language.name} />
    </Link>
  );
}
