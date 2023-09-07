import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import parser from 'html-react-parser';
import Loading from './Loading';
import LanguageIcon from './LanguageIcon';
import { fetchProject } from './js/api';
import { getShortDate } from './js/date';
import linkNewWindowIcon from './assets/link-new-window-icon.png';
import { placeholderProjectImg } from './js/placeholders';
import './Project.css';

export default function Project() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { project_id } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const { project } = await fetchProject(project_id);
        setProject(project);

        setIsLoading(false);
        window.scrollTo({ top: 0 });
      } catch (err) {
        setIsError(true);
        console.log(err);
      }
    })();
  }, []);

  return (
    <section id="Project">
      <Loading isLoading={isLoading}>
        <div id="Project__inner">
          <article>
            <h1 id="Project__title">{project.title}</h1>

            <div id="Project__details">
              <a
                id="Project__details__live-link"
                href={project.link}
                target="_new"
              >
                Live version <img src={linkNewWindowIcon} />
              </a>

              <div id="Project__details__date">
                {getShortDate(project.created_at)}
              </div>

              <div id="Project__details__languages">
                {project.languages &&
                  project.languages.map((language, i) => (
                    <Link key={i} to={`/portfolio/${language.slug}`}>
                      <LanguageIcon src={language.icon_url} />
                    </Link>
                  ))}
              </div>
            </div>

            <div id="Project__media">
              {project.video_url ? (
                <iframe src={project.video_url}></iframe>
              ) : (
                <img src={project.img_url || placeholderProjectImg} />
              )}
            </div>

            <div id="Project__body">
              {project.body && parser(project.body)}{' '}
              <p>
                Live version: <a href={project.link}>{project.link}</a>
              </p>
            </div>
          </article>
          {/* <aside>side</aside> */}
        </div>
      </Loading>
    </section>
  );
}
