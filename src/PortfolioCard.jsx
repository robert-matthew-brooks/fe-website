import { Link } from 'react-router-dom';
import LanguageIcon from './LanguageIcon.jsx';
import commentIcon from './assets/comment-icon.png';
import heartIcon from './assets/heart-icon.png';
import { placeholderProjectImg } from './js/placeholders';
import './PortfolioCard.css';

export default function PortfolioCard({ project }) {
  return (
    <div className="PortfolioCard">
      <Link to={`/projects/${project.id}`}>
        <img
          className="PortfolioCard__image"
          src={project.img_url || placeholderProjectImg}
        />
        <h2 className="PortfolioCard__title">{project.title}</h2>

        <div className="PortfolioCard__bottom-bar">
          <span>
            <img src={commentIcon} alt="comments" />1
          </span>
          <span>
            <img src={heartIcon} alt="likes" />1
          </span>
          <div className="PortfolioCard__bottom-bar__language-icons">
            {project.languages.map((language, i) => (
              <LanguageIcon key={i} src={language.icon_url} />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
