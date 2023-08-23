import Logo from './HeaderLogo.jsx';
import './Header.css';

const menuItems = [
  { text: 'Skills', link: '#' },
  { text: 'Portfolio', link: '#' },
  { text: 'Contact', link: '#' },
];

export default function Header() {
  return (
    <header className="Header">
      <Logo />
      <nav className="desktop-nav">
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

/* <img src="./public/hex.svg" className="hex-img"/> */
