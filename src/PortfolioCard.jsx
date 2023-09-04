import { Link } from 'react-router-dom';
import LanguageIcon from './LanguageIcon.jsx';
import commentIcon from './assets/comment-icon.png';
import heartIcon from './assets/heart-icon.png';
import './PortfolioCard.css';

export default function PortfolioCard({
  title,
  imgUrl,
  languages,
  changeRequestParams,
}) {
  return (
    <div className="PortfolioCard">
      <Link to={'/'}>
        <img className="PortfolioCard__image" src={imgUrl} />
        <h2 className="PortfolioCard__title">{title}</h2>
      </Link>

      <div className="PortfolioCard__bottom-bar">
        <a href="#">
          <img src={commentIcon} alt="comments" />1
        </a>
        <a href="#">
          <img src={heartIcon} alt="likes" />1
        </a>
        <div className="PortfolioCard__bottom-bar__language-icons">
          {languages.map((language, i) => (
            <button
              key={i}
              onClick={() => {
                changeRequestParams({ language: language.slug });
              }}
            >
              <LanguageIcon src={language.icon_url} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
