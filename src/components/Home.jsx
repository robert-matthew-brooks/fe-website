import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Splash from './Splash';
import Skills from './Skills';
import Contact from './Contact';
import ScrollToTopBtn from './ScrollToTopBtn';

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
      <Helmet>
        <title>RBM - Full Stack Developer</title>
      </Helmet>

      <Splash />
      <Skills />
      <Contact />
    </>
  );
}
