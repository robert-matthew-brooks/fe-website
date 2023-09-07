import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchLanguages } from './js/api';
import Loading from './Loading';
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

export default function Languages() {
  const [isLoading, setIsLoading] = useState(false);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const { languages } = await fetchLanguages();
        setLanguages(languages);

        setIsLoading(false);
      } catch (err) {
        // HANDLE DB ERROR
      }
    })();
  }, []);

  useEffect(() => {}, []);

  return (
    <div id="Languages">
      <Loading isLoading={isLoading}>
        {languages.map((language, i) => {
          return (
            <LanguageIcon
              key={i}
              language={language}
              onMouseOver={() => {
                showTooltip(language.name, language.project_count);
              }}
              onMouseOut={() => {
                hideTooltip();
              }}
              onClick={() => {
                hideTooltip();
              }}
            />
          );
        })}
      </Loading>
    </div>
  );
}
