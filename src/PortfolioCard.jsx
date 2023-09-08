import { Link } from 'react-router-dom';
import LanguageIcon from './LanguageIcon.jsx';
import commentIcon from './assets/comment-icon.png';
import heartIcon from './assets/heart-icon.png';
import { placeholderProjectImg } from './js/placeholders';
import './PortfolioCard.css';

export default function PortfolioCard({ project, changeRequestParams }) {
  return (
    <div className="PortfolioCard">
      <Link to={`/projects/${project.id}`}>
        <img
          className="PortfolioCard__image"
          src={project.img_url || placeholderProjectImg}
          alt={project.img_alt}
        />
        <h2 className="PortfolioCard__title">{project.title}</h2>
      </Link>

      <div className="PortfolioCard__bottom-bar">
        <span>
          <img src={commentIcon} alt="Number of comments" />0
        </span>
        <span>
          <img src={heartIcon} alt="Number of likes" />0
        </span>
        <div className="PortfolioCard__bottom-bar__language-icons">
          {project.languages.map((language, i) => (
            <LanguageIcon
              key={i}
              language={language}
              onClick={() => {
                changeRequestParams({ language: language.slug });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
