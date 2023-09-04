import LanguageIcon from './LanguageIcon';
import './Languages.css';

// add tooltip to body, not this component
// (x/y needs to be relative to whole document)
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

export default function Languages({ languages }) {
  return (
    <div id="Languages">
      {languages.map((language, i) => {
        return (
          <a
            key={i}
            className="Languages__link"
            href={`/portfolio/${language.slug}`}
            onMouseOver={() => {
              showTooltip(language.name, language.project_count);
            }}
            onMouseOut={() => {
              hideTooltip();
            }}
          >
            <LanguageIcon src={language.icon_url} />
          </a>
        );
      })}
    </div>
  );
}
