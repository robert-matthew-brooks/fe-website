import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Splash from './Splash';
import Languages from './Languages';
import Skills from './Skills';
import Featured from './Featured';
import OtherTech from './OtherTech';
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
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash, key]);

  return (
    <>
      <Helmet>
        <title>RBM - Full Stack Developer</title>
      </Helmet>

      <Splash />
      <Languages />
      <Skills />
      <Featured />
      <OtherTech />
      <Contact />
    </>
  );
}
