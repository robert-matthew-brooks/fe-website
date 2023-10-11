import { Link } from 'react-router-dom';
import LanguageIcon from './LanguageIcon';
import './FeaturedProject.css';

export default function FeaturedProject({ project }) {
  return (
    <div className="FeaturedProject">
      <div className="FeaturedProject__img-wrapper">
        <Link to={`/projects/${project.slug}`}>
          <div className="FeaturedProject__img-wrapper__overlay">
            View Project &#9658;
          </div>
          <img src={project.img_url} />
        </Link>
      </div>

      <div className="FeaturedProject__details">
        <Link to={`/projects/${project.slug}`}>
          <h3 className="FeaturedProject__title">{project.title}</h3>
        </Link>

        <div className="FeaturedProject__language-icons">
          {project.languages.map((language, i) => {
            return <LanguageIcon key={i} language={language} />;
          })}
        </div>

        <p className="FeaturedProject__description">"{project.description}"</p>
      </div>
    </div>
  );
}
