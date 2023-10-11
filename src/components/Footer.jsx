import linkedinLogo from '../assets/sm-icons/linkedin-logo.png';
import githubLogo from '../assets/sm-icons/github-logo.png';
import youtubeLogo from '../assets/sm-icons/youtube-logo.png';
import './Footer.css';

const smIcons = [
  {
    image: linkedinLogo,
    link: 'https://www.linkedin.com/in/robert-matthew-brooks/',
    alt: 'LinkedIn',
  },
  {
    image: githubLogo,
    link: 'https://github.com/robert-matthew-brooks/',
    alt: 'GitHub',
  },
  { image: youtubeLogo, link: '#', alt: 'YouTube' },
];

export default function Footer() {
  return (
    <footer id="Footer">
      <div id="Footer__inner">
        <div id="Footer__email">
          <a href="mailto:robert.matthew.brooks@gmail.com?subject=Hello!">
            Robert.Matthew.Brooks@gmail.com
          </a>
        </div>
        <div id="Footer__sm-icons">
          {smIcons.map((smIcon, i) => {
            return (
              <a key={i} href={smIcon.link}>
                <img className="sm-icon" src={smIcon.image} alt={smIcon.alt} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
