import PortfolioCard from './PortfolioCard';
import SortDescImg from './assets/sort-desc.svg';
import { fetchTopics } from './js/api';
import './Portfolio.css';

const exampleProject = {
  project_id: 1,
  created_at: '2023-08-24 00:39:12.143703',
  title: 'Kata: Sum Consecutive Digits',
  body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati aliquam eaque modi aperiam cumque sunt, incidunt officiis illo quasi omnis dolorem quia praesentium numquam perferendis ducimus culpa distinctio ipsa magni.',
  img_url:
    'https://lh3.googleusercontent.com/pw/AIL4fc9G7dHOKn0MGGgShYrKC91PnJ0MYeSpBheOTQNqRWuGMtnnWGyv1wcWBGCDtnfcsUfqFFg6lm3Xn4D8zYmEIK_Tr4wn3jgfr2BQPjto0NUQTdFLMbP8HKulvDOfP062A8rLjKdde582j04j_1h65_Y=w500-h302-s-no?authuser=0',
  video_url: 'https://www.youtube.com/watch?v=feOudajBVOc',
  languages: [
    {
      language_id: 1,
      icon_url:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      language_id: 2,
      icon_url:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    },
    {
      language_id: 3,
      icon_url:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    },
    {
      language_id: 4,
      icon_url:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
    },
  ],
};
const projects = [];
for (let i = 0; i < 10; i++) projects.push(exampleProject);

async function doIt() {
  const data = await fetchTopics();
}

export default function Portfolio() {
  doIt();

  return (
    <section className="Portfolio">
      <div className="Portfolio__inner">
        <nav className="side-nav">Some side nav options</nav>

        <div className="PortfolioList">
          <h1 className="PortfolioList__title">All Projects</h1>

          <div className="project-sort-options">
            Sort by:
            <select>
              <option>Date</option>
              <option>Comments</option>
              <option>Likes</option>
            </select>
            <button>
              <img src={SortDescImg} />
            </button>
          </div>

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
