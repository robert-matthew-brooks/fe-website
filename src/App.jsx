import Header from './Header.jsx';
import { Splash } from './Splash.jsx';
import Footer from './Footer.jsx';
import './App.css';

// add tooltip to body (x/y need to be relative to whole document)
let tooltip;
addEventListener('load', (e) => {
  tooltip = document.createElement('div');
  tooltip.id = 'languages__tooltip';
  tooltip.classList.add('languages__tooltip');
  tooltip.style.visibility = 'hidden';
  document.body.appendChild(tooltip);
});

// move tooltip when mouse moves
document.addEventListener('mousemove', (e) => {
  if (tooltip) {
    let left = e.pageX;
    let top = e.pageY;
    tooltip.style.left = `${left + 12}px`;
    tooltip.style.top = `${top + window.scrollX}px`;
  }
});

const showTooltip = (languageName, projectCount) => {
  tooltip.innerHTML = `${languageName} <br /> ${projectCount} ${
    projectCount > 1 ? 'projects' : 'project'
  }`;
  tooltip.style.visibility = 'visible';
};

const hideTooltip = () => {
  tooltip.style.visibility = 'hidden';
};

// GET THESE FROM BACKEND DB
const languages = [
  {
    name: 'React',
    icon: 'devicon-react-plain colored',
    projectCount: 2,
    href: '#',
  },
  {
    name: 'Postgresql',
    icon: 'devicon-postgresql-plain colored',
    projectCount: 1,
    href: '#',
  },
  {
    name: 'JavaScript',
    icon: 'devicon-javascript-plain colored',
    projectCount: 1,
    href: '#',
  },
  {
    name: 'HTML',
    icon: 'devicon-html5-plain colored',
    projectCount: 1,
    href: '#',
  },
  {
    name: 'CSS',
    icon: 'devicon-css3-plain colored',
    projectCount: 1,
    href: '#',
  },
  {
    name: 'Jest',
    icon: 'devicon-jest-plain colored',
    projectCount: 1,
    href: '#',
  },
];

export default function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Splash />

        <section className="languages">
          <h3>Experience in:</h3>
          <div className="languages__icon-grid">
            {languages.map((language, i) => {
              return (
                <a
                  key={i}
                  className="languages__link"
                  href="#"
                  onMouseOver={() => {
                    showTooltip(language.name, language.projectCount);
                  }}
                  onMouseOut={() => {
                    hideTooltip();
                  }}
                >
                  <i className={`languages__icon ${language.icon}`}></i>
                </a>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
