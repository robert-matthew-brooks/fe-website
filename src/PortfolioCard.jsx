import LanguageIcon from './LanguageIcon.jsx';
import commentIcon from './assets/comment-icon.png';
import heartIcon from './assets/heart-icon.png';
import './PortfolioCard.css';

export default function PortfolioCard({ title, imgUrl, languages }) {
  return (
    <div className="PortfolioCard">
      <a href="#">
        <img className="PortfolioCard__image" src={imgUrl} />
        <h2 className="PortfolioCard__title">{title}</h2>
      </a>

      <div className="PortfolioCard__bottom-bar">
        <a href="#">
          <img src={commentIcon} alt="comments" />1
        </a>
        <a href="#">
          <img src={heartIcon} alt="likes" />1
        </a>
        <div className="PortfolioCard__bottom-bar__language-icons">
          {languages.map((language, i) => (
            <a key={i} href={`/portfolio/${language.name.toLowerCase()}`}>
              <LanguageIcon src={language.icon_url} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
