import { Link } from 'react-router-dom';
import LanguageIcon from './LanguageIcon.jsx';
import commentIcon from '../assets/comment-icon.png';
import heartIcon from '../assets/heart-icon.png';
import placeholderArticleImg from '../assets/placeholder-article-image.jpeg';
import './PortfolioCard.css';

export default function PortfolioCard({ project, changeRequestParams }) {
  return (
    <div className="PortfolioCard">
      <Link to={`/projects/${project.slug}`}>
        <img
          className="PortfolioCard__image"
          src={project.img_url || placeholderArticleImg}
          alt={project.img_alt || 'Placeholder'}
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
