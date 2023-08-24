import SortDescImg from './assets/sort-desc.svg';
import LanguageIcon from './LanguageIcon';
import './Portfolio.css';

const projects = [
  {
    project_id: 1,
    created_at: '2023-08-24 00:39:12.143703',
    title: 'Kata: Sum Consecutive Digits',
    body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati aliquam eaque modi aperiam cumque sunt, incidunt officiis illo quasi omnis dolorem quia praesentium numquam perferendis ducimus culpa distinctio ipsa magni.',
    img_url:
      'https://lh3.googleusercontent.com/pw/AIL4fc_N06qR3GhoDlR2Ak_O1OuQTmf2U9h1d8ISPn4Ha-qYd6lZdAmIsnkOSuZhdR3JZPQr-kXjaPCgt0RVX_p9Rl99U6yQNmEfkq7rm77CFNmZubGzmVjaPdXGmh8KxEDRL3JawVteCzrLrDCFG2nN9tI=w599-h246-s-no',
    video_url: 'https://www.youtube.com/watch?v=feOudajBVOc',
    languageIcons: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
    ],
  },
];

export default function Portfolio() {
  return (
    <section className="Portfolio">
      <div className="Portfolio__inner">
        <h2>All Projects</h2>
        <div class="project-sort-options">
          Sort by:
          <select>
            <option>All Languages</option>
            <option>Javascript</option>
            <option>Etc</option>
          </select>
          <button>
            <img src={SortDescImg} />
          </button>
        </div>

        <div className="ProjectsList">
          {projects.map((project) => {
            return (
              <div className="Project">
                <div className="Project__info-bar">
                  <span>Posted 10 days ago</span>
                  <div className="Project__info-bar__language-icons">
                    {project.languageIcons.map((icon) => (
                      <LanguageIcon src={icon} size="1.5em" />
                    ))}
                  </div>
                </div>
                <h3>{project.title}</h3>
                <img src={project.img_url} />

                <div>
                  <span>1 comment</span>
                  <span>1 like</span>
                  <span>share</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
