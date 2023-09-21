import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './HeaderLogo.jsx';
import menuOpenImg from '../assets/menu-open.svg';
import menuCloseImg from '../assets/menu-close.png';
import './Header.css';

const menuItems = [
  { text: 'Home', link: '/home' },
  { text: 'Skills', link: '/#Skills' },
  { text: 'Portfolio', link: '/portfolio' },
  { text: 'Contact', link: '/#Contact' },
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
        <img
          src={isMobileNavVisible ? menuCloseImg : menuOpenImg}
          alt="Toggle menu"
        />
      </button>

      <nav
        id="Header__mobile-nav"
        style={{ left: isMobileNavVisible ? '0' : '-100vw' }}
        onClick={(e) => {
          toggleMenu();
        }}
      >
        {menuItems.map((menuItem, i) => {
          return (
            <Link key={i} to={menuItem.link}>
              {menuItem.text}
            </Link>
          );
        })}
      </nav>

      <nav id="Header__desktop-nav">
        {menuItems.map((menuItem, i) => {
          return (
            <Link key={i} to={menuItem.link}>
              {menuItem.text}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
