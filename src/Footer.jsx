import linkedinLogo from './assets/linkedin-logo.png';
import githubLogo from './assets/github-logo.png';
import youtubeLogo from './assets/youtube-logo.png';
import './Footer.css';

const smIcons = [
  {
    image: linkedinLogo,
    link: 'https://www.linkedin.com/in/robert-matthew-brooks/',
  },
  { image: githubLogo, link: 'https://github.com/robert-matthew-brooks/' },
  { image: youtubeLogo, link: '#' },
];

export default function Footer() {
  return (
    <footer id="Footer">
      <div id="Footer__email">
        <a href="mailto:robert.matthew.brooks@gmail.com?subject=Hello!">
          Robert.Matthew.Brooks@gmail.com
        </a>
      </div>
      <div id="Footer__sm-icons">
        {smIcons.map((smIcon, i) => {
          return (
            <a key={i} href={smIcon.link}>
              <img className="sm-icon" src={smIcon.image} />
            </a>
          );
        })}
      </div>
    </footer>
  );
}
