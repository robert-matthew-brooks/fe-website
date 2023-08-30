import { useState, useEffect } from 'react';
import PortfolioCard from './PortfolioCard';
import SortDescImg from './assets/sort-desc.svg';
import { fetchProjects } from './js/api';
import './Portfolio.css';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);

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
            <option>HTML</option>
            <option>JavaScript</option>
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
      </div>
    </section>
  );
}
