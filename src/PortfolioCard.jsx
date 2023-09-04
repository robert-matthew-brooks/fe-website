import { Link } from 'react-router-dom';
import LanguageIcon from './LanguageIcon.jsx';
import commentIcon from './assets/comment-icon.png';
import heartIcon from './assets/heart-icon.png';
import './PortfolioCard.css';

export default function PortfolioCard({ project, changeRequestParams }) {
  return (
    <div className="PortfolioCard">
      <Link to={`/projects/${project.id}`}>
        <img className="PortfolioCard__image" src={project.img_url} />
        <h2 className="PortfolioCard__title">{project.title}</h2>
      </Link>

      <div className="PortfolioCard__bottom-bar">
        <a href="#">
          <img src={commentIcon} alt="comments" />1
        </a>
        <a href="#">
          <img src={heartIcon} alt="likes" />1
        </a>
        <div className="PortfolioCard__bottom-bar__language-icons">
          {project.languages.map((language, i) => (
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
