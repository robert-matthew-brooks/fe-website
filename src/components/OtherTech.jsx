import figmaIcon from '../assets/other-tech-icons/figma-icon.svg';
import githubIcon from '../assets/other-tech-icons/github-icon.svg';
import linuxIcon from '../assets/other-tech-icons/linux-icon.svg';
import nodeIcon from '../assets/other-tech-icons/node-icon.svg';
import npmIcon from '../assets/other-tech-icons/npm-icon.svg';
import trelloIcon from '../assets/other-tech-icons/trello-icon.svg';
import vscodeIcon from '../assets/other-tech-icons/vscode-icon.svg';
import windowsIcon from '../assets/other-tech-icons/windows-icon.svg';
import './OtherTech.css';

export default function OtherTech() {
  return (
    <div id="OtherTech">
      <div id="OtherTech__inner">
        <div id="OtherTech__icon-wrapper">
          <img src={vscodeIcon} alt="VS Code" />
          <img src={npmIcon} alt="npm" />
          <img src={nodeIcon} alt="node.js" />
          <img src={githubIcon} alt="GitHub" />
          <img src={windowsIcon} alt="Windows" />
          <img src={linuxIcon} alt="Linux" />
          <img src={figmaIcon} alt="Figma" />
          <img src={trelloIcon} alt="Trello" />
        </div>
      </div>
    </div>
  );
}
