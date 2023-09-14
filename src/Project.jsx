import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import Loading from './Loading';
import ProjectSidebar from './ProjectSidebar';
import LanguageIcon from './LanguageIcon';
import { fetchProject } from './js/api';
import { getShortDate } from './js/date';
import linkNewWindowIcon from './assets/link-new-window-icon.png';
import { placeholderProjectImg } from './js/placeholders';
import './Project.css';

const tagReplaceList = [
  //header
  ['<h>', '<h3>'],
  ['</h>', '</h3>'],

  // link open in new window
  ['<a href=', '<a target="_blank" href='],

  // note
  ['<note>', '<span class="note">'],
  ['</note>', '</span>'],

  // bold
  ['<b>', '<span class="hl bold">'],
  ['</b>', '</span>'],

  // quote
  ['<quote>', '<p class="quote">'],
  ['</quote>', '</p>'],

  // language
  ['<l>', '<span class="hl language">'],
  ['</l>', '</span>'],

  // function
  ['<f>', '<span class="hl function">'],
  ['</f>', '</span>'],

  // code snippet
  ['<c>', '<span class="hl snippet">'],
  ['</c>', '</span>'],
];

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

        // remove excess spaces inside tags added by prettier
        project.body = project.body.replace(/(<\w+)(\s+)/g, '$1 ');

        // replace tags
        for (const tagReplacement of tagReplaceList) {
          project.body = project.body.replaceAll(
            tagReplacement[0],
            tagReplacement[1]
          );
        }

        // replace formatted code
        const codeMatches = project.body.matchAll(/<code>[\s\S]+?<\/code>/g);

        for (const codeMatch of codeMatches) {
          const codeBlock = codeMatch[0];
          const innerCodeBlock = codeBlock
            .replace(/^<code>/, '')
            .replace(/\s+<\/code>$/, '');

          const formattedCodeBlock = `<div class="code-block-wrapper"><pre class="prettyprint prettyprinted">${PR.prettyPrintOne(
            innerCodeBlock,
            'js'
          )}</pre></div>`;

          project.body = project.body.replaceAll(codeBlock, formattedCodeBlock);
        }

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
                  src={project.img_url || placeholderProjectImg}
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
