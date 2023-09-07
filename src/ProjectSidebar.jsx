import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from './js/api';
import { placeholderProjectImg } from './js/placeholders';
import './ProjectSidebar.css';

export default function ProjectSidebar() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const { projects } = await fetchProjects({ limit: 10 });

        setProjects(projects);

        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        console.log(err);
      }
    })();
  }, []);

  return (
    <aside id="ProjectSidebar">
      <h2>Recent Projects:</h2>
      {projects.map((project, i) => (
        <Link key={i} to={`/projects/${project.id}`}>
          <div
            className="ProjectSidebar__card"
            style={{
              backgroundImage: `url(${
                project.img_url || placeholderProjectImg
              })`,
            }}
          >
            <div className="ProjectSidebar__card__title">
              <h3>{project.title}</h3>
            </div>
          </div>
        </Link>
      ))}
    </aside>
  );
}
