import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PortfolioCard from './PortfolioCard';
import PortfolioPagination from './PortfolioPagination';
import { fetchProjects, fetchLanguages } from './js/api';
import './Portfolio.css';

const sortOptions = [
  { sortBy: 'date', order: 'desc' },
  { sortBy: 'date', order: 'asc' },
  { sortBy: 'title', order: 'asc' },
  { sortBy: 'title', order: 'desc' },
];

const getSortOption = (sortBy, order) => {
  for (const i in sortOptions) {
    if (sortOptions[i].sortBy === sortBy && sortOptions[i].order === order) {
      return i;
    }
  }
};

export default function Portfolio() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const params = useParams();

  const [projects, setProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [languages, setLanguages] = useState([]);

  const [language, setLanguage] = useState(params.language);
  const [sortBy, setSortBy] = useState(searchParams.get('sort_by') || 'date');
  const [order, setOrder] = useState(searchParams.get('order') || 'desc');
  const [sortOption, setSortOption] = useState(getSortOption(sortBy, order));
  const limit = 6;
  const [page, setPage] = useState(+searchParams.get('page') || 1);

  const [requestParams, setRequestParams] = useState({
    language,
    sort_by: sortBy,
    order,
    limit,
    page,
  });

  const changeRequestParams = ({
    language = null,
    sortBy = null,
    order = null,
    page = null,
  }) => {
    const newParams = { ...requestParams };

    let newUrl;
    let newUrlPath = window.location.pathname;
    let newUrlSearchParams = new URLSearchParams(window.location.search);

    if (language) {
      newParams.language = language;
      setLanguage(newParams.language);
      newUrlPath = `/portfolio/${newParams.language}`;

      newParams.page = 1;
      setPage(newParams.page);
      newUrlSearchParams.delete('page');
    }

    if (sortBy) {
      newParams.sort_by = sortBy;
      setSortBy(newParams.sort_by);
      newUrlSearchParams.set('sort_by', newParams.sort_by);
    }

    if (order) {
      newParams.order = order;
      setOrder(newParams.order);
      newUrlSearchParams.set('order', newParams.order);
    }

    if (page) {
      newParams.page = page;
      setPage(newParams.page);
      newUrlSearchParams.set('page', newParams.page);
    }

    // update dropdown menu AFTER setting individual states
    if (sortBy || order) {
      setSortOption(getSortOption(newParams.sort_by, newParams.order));
    }

    // update URL
    newUrl = newUrlPath;
    if (newUrlSearchParams.size) {
      newUrl += `?${newUrlSearchParams.toString()}`;
    }
    history.replaceState(null, '', newUrl); // update URL without rendering page

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

          // set drop down menus
          setLanguage(language);
          setSortOption(getSortOption(sortBy, order));

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
            value={language}
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

          <select
            value={sortOption}
            onChange={(event) => {
              changeRequestParams(sortOptions[+event.target.value]);
            }}
          >
            <option value="0">Newest first</option>
            <option value="1">Oldest first</option>
            <option value="2">Alphabetical A-Z</option>
            <option value="3">Alphabetical Z-A</option>
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
