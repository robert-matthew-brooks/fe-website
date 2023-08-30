import { useState, useEffect } from 'react';
import PortfolioCard from './PortfolioCard';
import PortfolioPagination from './PortfolioPagination';
import { fetchProjects, fetchLanguages } from './js/api';
import './Portfolio.css';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [languages, setLanguages] = useState([]);

  const projectsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);

  // initial loading languages data
  useEffect(() => {
    (async () => {
      const { languages } = await fetchLanguages();
      setLanguages(languages);
    })();
  }, []);

  // loading of project data
  useEffect(() => {
    (async () => {
      const { projects, project_count } = await fetchProjects(
        projectsPerPage,
        currentPage
      );
      setProjects(projects);
      setTotalProjects(project_count);
    })();
  }, [currentPage]);

  return (
    <section className="Portfolio">
      <div className="Portfolio__inner">
        <h1 className="Portfolio__title">Portfolio Projects</h1>

        <div className="Portfolio__sort-options">
          <select
            onChange={(event) => {
              console.log(event.target.value);
            }}
          >
            <option>Any Language</option>
            {languages.map((language, i) => {
              return (
                <option
                  key={i}
                  value={language.id}
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
          projectsPerPage={projectsPerPage}
          currentPage={currentPage}
          totalProjects={totalProjects}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
}
