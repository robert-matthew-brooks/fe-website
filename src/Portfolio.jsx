import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import PortfolioCard from './PortfolioCard';
import PortfolioPagination from './PortfolioPagination';
import { fetchProjects, fetchLanguages } from './js/api';
import './Portfolio.css';

export default function Portfolio() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [languages, setLanguages] = useState([]);

  const limit = 6;
  const [page, setPage] = useState(+searchParams.get('page') || 1);
  const { language } = useParams();

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [requestParams, setRequestParams] = useState({ language, limit, page });

  const changeRequestParams = ({
    language = null,
    limit = null,
    page = null,
  }) => {
    const newParams = { ...requestParams };

    let newUrl;
    let newUrlPath = window.location.pathname;
    let newUrlSearchParams = new URLSearchParams(window.location.search);

    if (language) {
      newParams.language = language;
      setSelectedLanguage(newParams.language);
      newUrlPath = `/portfolio/${newParams.language}`;
      page = 1;
    }

    if (page) {
      newParams.page = page;
      setPage(newParams.page);

      if (newParams.page === 1) newUrlSearchParams.delete('page');
      else newUrlSearchParams.set('page', newParams.page);
    }

    // update URL
    if (newUrlSearchParams.size) {
      newUrl = newUrlPath + `?${newUrlSearchParams.toString()}`;
    } else {
      newUrl = newUrlPath;
    }
    history.replaceState(null, '', newUrl);

    setRequestParams(newParams);
  };

  // load data to display in grid
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        if (isInitialLoad) {
          const { languages } = await fetchLanguages();
          setLanguages(languages);
          setIsInitialLoad(false);
        }

        const { projects, project_count } = await fetchProjects(requestParams);
        setProjects(projects);
        setTotalProjects(project_count);

        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        setIsError(true);
        // UNABLE TO REACH DATABASE
      }
    })();
  }, [requestParams]);

  return (
    <section id="Portfolio">
      <div id="Portfolio__inner">
        <h1 id="Portfolio__title">Portfolio Projects</h1>

        <div id="Portfolio__sort-options">
          <select
            value={selectedLanguage}
            onChange={(event) => {
              changeRequestParams({ language: event.target.value });
            }}
          >
            <option value="all">All Languages</option>
            {languages.map((language, i) => {
              return (
                <option
                  key={i}
                  value={language.slug}
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

        <div id="Portfolio__project-grid">
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
          changeRequestParams={changeRequestParams}
        />
      </div>
    </section>
  );
}
