import PortfolioCard from './PortfolioCard';
import SortDescImg from './assets/sort-desc.svg';
import './Portfolio.css';

const exampleProject = {
  project_id: 1,
  created_at: '2023-08-24 00:39:12.143703',
  title: 'Kata: Sum Consecutive Digits',
  body: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati aliquam eaque modi aperiam cumque sunt, incidunt officiis illo quasi omnis dolorem quia praesentium numquam perferendis ducimus culpa distinctio ipsa magni.',
  img_url:
    'https://lh3.googleusercontent.com/pw/AIL4fc-PqNdbdRbGNoabPptE4q2yF23Q5uma_2RZif8krFMjJ9cg570XX6-A0-hqiqDL09oS9Fj75x4OUAF5GZ_Lh1IIL6LZpMJLw5qqATwzYJyGzcL80zWd8kzdoQbdLYWhwkeCpUpMYcRcrwFW2WA2-dGtUoXMqjeXD-uqEIWyojbESHKY0V37Q7DSUkMj1e5OMVaH7eTiXf3erQrf-Moyzhe7t_51kHbrkeCe6dV3yX2mRwTkczMmqxX7-_ssZbzOqVxRMfI-dzNwSNctkYakngle7AeGINntIdBZFtzET_m80x3_Tyi2qh2Vw-L5kbvmGrHH-BMIicBXUdbJwzjVUEp3fN1AYAMYVjn364iVg_7enZ0k-iSefmVppMUexslYQjOKvYc85NUk1bfzhI5yiHjzQhMxqd_dKV21VxF3g4PIMdIGXlIHFuM4vt922UBkcizCQu7yQJzTMskT_qZkkfJxh-JYApOWl_-L6PDSWyg0r3OCKm6nS0BJ5Y3M0ux6N90IvlSPNhkqN8-dndH2I6KTtPSHCziSJSnOmIPJIRecXPCm4rHFnPyAxn3yL_WYdzBG7NPmTOfyYtW9Gc-WGx0sVdPTuz9Z1AjhsHA3UvyYWvwt6k-o-a4EA08ectjGJRSIrdNlUqdNI8-xGom8h2H5qaIE8ILc9fUHWy3KIyV_M8YjRY_C_UCDuL7H3F1f-4oU2GGIinHjMIlDTfjTNNE9ESBlk-CJigURb5Upc9r6bnYoJZ_0xlFHS31ieOE3pSf_QVcRHmZUuvABtprurUqiJKvVIyVFN9rOMNl77uQH9-NFSkpXKqxa1N-igxMUjOUQDKfsEQZ9MRe-_iBLssC0chdTE6HmFN-dxOuEXov8cTMwlJrizpS-lqXpG__aXmDkuWXu1fYNlKdNu6FruSryHGfvT9jm44FE5v_sHUgjc_hg4gCWkeDp4WQaBw=w500-h302-s-no',
  video_url: 'https://www.youtube.com/watch?v=feOudajBVOc',
  languageIcons: [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
  ],
};
const projects = [];
for (let i = 0; i < 10; i++) projects.push(exampleProject);

export default function Portfolio() {
  return (
    <section className="Portfolio">
      <div className="Portfolio__inner">
        <h1>All Projects</h1>
        <div className="project-sort-options">
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

        <div className="PortfolioList">
          {projects.map((project, i) => {
            return (
              <PortfolioCard
                key={i}
                title={project.title}
                imgUrl={project.img_url}
                languageIcons={project.languageIcons}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
