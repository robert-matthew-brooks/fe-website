import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Splash from './Splash';
import Skills from './Skills';
import Contact from './Contact';

export default function Home() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // scroll to #Skills only when page loaded
    // because #Skills doesn't exist until React creates it
    // cannot link straight to it

    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pathname, hash, key]);

  return (
    <>
      <Splash />
      <Skills />
      <Contact />
    </>
  );
}
