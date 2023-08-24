import LanguageIcon from './LanguageIcon';
import './Languages.css';

// add tooltip to body (x/y needs to be relative to whole document)
let tooltip;
addEventListener('load', (e) => {
  tooltip = document.createElement('div');
  tooltip.id = 'Languages__tooltip';
  tooltip.classList.add('Languages__tooltip');
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
// order by # projects
const languages = [
  {
    name: 'React',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    projectCount: 2,
    href: '#',
  },
  {
    name: 'Postgresql',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    projectCount: 1,
    href: '#',
  },
  {
    name: 'JavaScript',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    projectCount: 1,
    href: '#',
  },
  {
    name: 'HTML',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    projectCount: 1,
    href: '#',
  },
  {
    name: 'CSS',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    projectCount: 1,
    href: '#',
  },
  {
    name: 'Jest',
    iconSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
    projectCount: 1,
    href: '#',
  },
];

export default function Languages() {
  return (
    <section className="Languages">
      <h3>Experience in:</h3>
      <div className="Languages__icon-grid">
        {languages.map((language, i) => {
          return (
            <a
              key={i}
              className="Languages__link"
              href="#"
              onMouseOver={() => {
                showTooltip(language.name, language.projectCount);
              }}
              onMouseOut={() => {
                hideTooltip();
              }}
            >
              <LanguageIcon src={language.iconSrc} />
            </a>
          );
        })}
      </div>
    </section>
  );
}
