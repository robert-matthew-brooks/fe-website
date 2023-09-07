import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Loading from './Loading';
import PortfolioSortOptions from './PortfolioSortOptions';
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

    // update dropdown menu AFTER setting individual states
    if (sortBy || order) {
      setSortOption(getSortOption(newParams.sort_by, newParams.order));

      newParams.page = 1;
      setPage(newParams.page);
      newUrlSearchParams.delete('page');
    }

    if (page && !language && !sortBy && !order) {
      newParams.page = page;
      setPage(newParams.page);
      newUrlSearchParams.set('page', newParams.page);
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
        console.log(err);
      }
    })();
  }, [requestParams]);

  return (
    <section id="Portfolio">
      <Loading isLoading={isLoading}>
        <div id="Portfolio__inner">
          <h1 id="Portfolio__title">Portfolio Projects</h1>

          <PortfolioSortOptions
            language={language}
            languages={languages}
            sortOption={sortOption}
            sortOptions={sortOptions}
            changeRequestParams={changeRequestParams}
          />

          <div id="Portfolio__project-grid">
            {projects.map((project, i) => {
              return (
                <PortfolioCard
                  key={i}
                  project={project}
                  changeRequestParams={changeRequestParams}
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
      </Loading>
    </section>
  );
}
