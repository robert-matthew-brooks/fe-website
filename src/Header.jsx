import { useState } from 'react';
import Logo from './HeaderLogo.jsx';
import menuOpenImg from './assets/menu-open.svg';
import menuCloseImg from './assets/menu-close.png';
import './Header.css';

const menuItems = [
  { text: 'Home', link: '/' },
  { text: 'Skills', link: '#' },
  { text: 'Portfolio', link: '/portfolio/all' },
  { text: 'Contact', link: '/contact' },
];

export default function Header() {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  function toggleMenu() {
    if (!isMobileNavVisible) {
      window.scrollTo(0, 0);
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
    setIsMobileNavVisible(!isMobileNavVisible);
  }

  return (
    <header id="Header">
      <Logo />

      <button id="Header__mobile-nav-btn" onClick={() => toggleMenu()}>
        <img src={isMobileNavVisible ? menuCloseImg : menuOpenImg} />
      </button>

      <nav
        id="Header__mobile-nav"
        style={{ left: isMobileNavVisible ? '0' : '-100vw' }}
        onClick={(e) => {
          // don't toggle menu on link clicked, only on bg clicked
          if (e.target === e.currentTarget) {
            toggleMenu();
          }
        }}
      >
        {menuItems.map((menuItem, i) => {
          return (
            <a key={i} href={menuItem.link}>
              {menuItem.text}
            </a>
          );
        })}
      </nav>

      <nav id="Header__desktop-nav">
        {menuItems.map((menuItem, i) => {
          return (
            <a key={i} href={menuItem.link}>
              {menuItem.text}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
