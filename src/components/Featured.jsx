import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../js/api';
import FeaturedProject from './FeaturedProject';
import './Featured.css';

const observer = new IntersectionObserver(
  (intersections) => {
    intersections.forEach(({ target, isIntersecting }) => {
      if (isIntersecting)
        target.firstChild.style.animationPlayState = 'running';
    });
  },
  { threshold: 0.3 }
);

export default function Featured() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const { projects } = await fetchProjects({ featured: 'true' });
      setProjects(projects);
    })();
  }, []);

  useEffect(() => {
    // observe project images after placed in DOM
    // to animate them sliding when they scroll into view
    document.querySelectorAll('.FeaturedProject').forEach((div) => {
      observer.observe(div);
    });
  }, [projects]);

  return (
    <section id="Featured">
      <div id="Featured__inner">
        <h2 id="Featured__title">Recent Work:</h2>

        <div id="Featured__project-wrapper">
          {projects.map((project, i) => {
            return <FeaturedProject key={i} project={project} />;
          })}
        </div>

        <Link
          to={'/portfolio'}
          onClick={() => {
            document.documentElement.scrollTo({
              top: 0,
              left: 0,
              behavior: 'instant',
            });
          }}
        >
          More In My Portfolio
        </Link>
      </div>
    </section>
  );
}
