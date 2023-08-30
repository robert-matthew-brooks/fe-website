import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PortfolioCard from './PortfolioCard';
import PortfolioPagination from './PortfolioPagination';
import { fetchProjects, fetchLanguages } from './js/api';
import './Portfolio.css';

function handleLanguageChange(language) {
  // if 'any' go to /portfolio#title, no smooth scroll

  window.location = `${
    window.location.origin
  }/portfolio/${language.toLowerCase()}`;
}

export default function Portfolio() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [projects, setProjects] = useState([]);
  const [languages, setLanguages] = useState([]);
  let languageLookup;

  const limit = 6;
  const [totalProjects, setTotalProjects] = useState(0);
  const [page, setPage] = useState(1);
  const { language } = useParams();

  // loading of project data
  useEffect(() => {
    (async () => {
      try {
        // initial loading languages data
        if (isInitialLoad) {
          const { languages } = await fetchLanguages();
          setLanguages(languages);
          setIsInitialLoad(false);
        }

        const params = { limit, page };
        if (language) params.language = language;

        const { projects, project_count } = await fetchProjects(params);
        setProjects(projects);
        setTotalProjects(project_count);
      } catch (err) {
        // UNABLE TO REACH DATABASE
      }
    })();
  }, [page]);

  return (
    <section className="Portfolio">
      <div className="Portfolio__inner">
        <h1 className="Portfolio__title">Portfolio Projects</h1>

        <div className="Portfolio__sort-options">
          <select
            onChange={(event) => {
              handleLanguageChange(event.target.value);
            }}
          >
            <option value="all">Any Language</option>
            {languages.map((language, i) => {
              return (
                <option
                  key={i}
                  value={language.name}
                >{`${language.name} (${language.project_count})`}</option>
              );
            })}
          </select>

          <select>
            <option>Newest first</option>
            <option>Oldest first</option>
            <option>Alphabetical A-Z</option>
            <option>Alphabetical Z-A</option>
          </select>
        </div>

        <div className="Portfolio__project-grid">
          {projects.map((project, i) => {
            return (
              <PortfolioCard
                key={i}
                title={project.title}
                imgUrl={project.img_url}
                languages={project.languages}
              />
            );
          })}
        </div>

        <PortfolioPagination
          limit={limit}
          totalProjects={totalProjects}
          page={page}
          setPage={setPage}
        />
      </div>
    </section>
  );
}
