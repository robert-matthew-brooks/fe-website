import { useEffect, useState } from 'react';
import { fetchLanguages } from '../js/api';
import Loading from './Loading';
import LanguageIcon from './LanguageIcon';
import './Languages.css';

// add tooltip to body, not this component
// (x/y needs to be relative to whole document)
let tooltip;
addEventListener('load', (_evt) => {
  tooltip = document.createElement('div');
  tooltip.id = 'Languages__tooltip';
  tooltip.classList.add('Languages__tooltip');
  tooltip.style.display = 'none';
  document.body.appendChild(tooltip);
});

// move tooltip when mouse moves
document.addEventListener('mousemove', (evt) => {
  if (tooltip) {
    let left = evt.pageX;
    let top = evt.pageY;
    tooltip.style.left = `${left + 12}px`;
    tooltip.style.top = `${top + window.scrollX}px`;
  }
});

const showTooltip = (languageName, projectCount) => {
  tooltip.innerHTML = `${languageName} <br /> ${projectCount} ${
    projectCount > 1 ? 'projects' : 'project'
  }`;
  tooltip.style.display = 'block';
};

const hideTooltip = () => {
  tooltip.style.display = 'none';
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
    <section id="Languages">
      <div id="Languages__inner">
        <h2 id="Languages__title">Experience with:</h2>

        <div id="Languages__icon-wrapper">
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
      </div>
    </section>
  );
}
