import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import parser from 'html-react-parser';
import Loading from './Loading';
import ProjectSidebar from './ProjectSidebar';
import LanguageIcon from './LanguageIcon';
import { fetchProject } from './js/api';
import { getShortDate } from './js/date';
import { parseProjectBody } from './js/parseProjectBody';
import { baseUrl } from './js/base-url';
import linkNewWindowIcon from './assets/link-new-window-icon.png';
import placeholderArticleImg from './assets/placeholder-article-image.jpeg';
import './Project.css';

export default function Project() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { project_slug } = useParams();
  const [project, setProject] = useState({});

  useEffect(() => {
    (async () => {
      window.scrollTo({ top: 0 });
      setIsLoading(true);
      setIsError(false);

      try {
        const { project } = await fetchProject(project_slug);

        project.body = parseProjectBody(project.body);
        setProject(project);

        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        console.log(err);
      }
    })();
  }, [project_slug]);

  return (
    <section id="Project">
      <Loading isLoading={isLoading}>
        <Helmet>
          <meta property="og:title" content={project.title} />
          <meta
            property="og:url"
            content={`${baseUrl}/projects/${project.slug}/`}
          />
          <meta property="og:image" content={project.img_url} />
        </Helmet>

        <div id="Project__inner">
          <article>
            <h1 id="Project__title">{project.title}</h1>

            <div id="Project__details">
              <div id="Project__details__date">
                {getShortDate(project.created_at)}
              </div>

              <div id="Project__details__languages">
                {project.languages &&
                  project.languages.map((language, i) => (
                    <LanguageIcon key={i} language={language} />
                  ))}
              </div>
            </div>

            <div id="Project__media">
              {project.video_url ? (
                <iframe src={project.video_url}></iframe>
              ) : (
                <img
                  src={project.img_url || placeholderArticleImg}
                  alt={project.img_alt || 'Placeholder'}
                />
              )}
            </div>

            <div id="Project__details__links__wrapper">
              {project.live_link && (
                <a
                  className="Project__details__link"
                  href={project.live_link}
                  target="_blank"
                >
                  Live Version <img src={linkNewWindowIcon} />
                </a>
              )}

              {project.github_link && (
                <a
                  className="Project__details__link"
                  href={project.github_link}
                  target="_blank"
                >
                  Github Project <img src={linkNewWindowIcon} />
                </a>
              )}
            </div>

            <div id="Project__body">{project.body && parser(project.body)}</div>
          </article>

          <ProjectSidebar currentProjectSlug={project_slug} />
        </div>
      </Loading>
    </section>
  );
}
