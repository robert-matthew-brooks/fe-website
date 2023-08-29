import LanguageIcon from './LanguageIcon.jsx';
import commentIcon from './assets/comment-icon.png';
import heartIcon from './assets/heart-icon.png';
import './PortfolioCard.css';

export default function PortfolioCard({ title, imgUrl, languages }) {
  return (
    <div className="PortfolioCard">
      <a href="#">
        <div className="PortfolioCard__time-ago">
          <span>Posted 10 days ago</span>
        </div>
        <h2 className="PortfolioCard__title">{title}</h2>
        <img className="PortfolioCard__image" src={imgUrl} />
      </a>

      <div className="PortfolioCard__bottom-bar">
        <a href="#">
          <img src={commentIcon} alt="comments" />1
        </a>
        <a href="#">
          <img src={heartIcon} alt="likes" /> 1
        </a>
        <a href="#">Share</a>
        <div className="PortfolioCard__bottom-bar__language-icons">
          {languages.map((language, i) => (
            <a key={i} href="#">
              <LanguageIcon src={language.icon_url} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
