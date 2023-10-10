import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import './LanguageIcon.css';

export default function LanguageIcon({ language, height, ...actionProps }) {
  return (
    <Link
      className="LanguageIcon__link"
      style={{ height }}
      to={`/portfolio/${language.slug}`}
      {...actionProps} // allow onClick to be passed
    >
      {parser(language.icon)}
    </Link>
  );
}
