import { useState, useEffect } from 'react';
import PortfolioCard from './PortfolioCard';
import PortfolioPagination from './PortfolioPagination';
import { fetchProjects, fetchLanguages } from './js/api';
import './Portfolio.css';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [totalProjects, setTotalProjects] = useState(30);
  const projectsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      const { languages } = await fetchLanguages();
      setLanguages(languages);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { projects } = await fetchProjects();
      setProjects(projects);
    })();
  }, []);

  return (
    <section className="Portfolio">
      <div className="Portfolio__inner">
        <h1 className="Portfolio__title">Portfolio Projects</h1>

        <div className="Portfolio__sort-options">
          <select>
            <option>Any Language</option>
            {languages.map((language, i) => {
              return (
                <option
                  key={i}
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
          totalProjects={totalProjects}
          projectsPerPage={projectsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
}
