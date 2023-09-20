import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { baseUrl } from './js/base-url.js';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ScrollToTopBtn from './ScrollToTopBtn.jsx';
import Home from './Home.jsx';
import Portfolio from './Portfolio.jsx';
import Project from './Project.jsx';
import './App.css';

export default function App() {
  return (
    <div id="App">
      <Helmet>
        <meta property="og:title" content="Robert Matthew Brooks" />
        <meta
          property="og:description"
          content="Portfolio // Full Stack - Javascript, Node.js, HTML, CSS, Express.js, PostgreSQL, Jest"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseUrl}/`} />
        <meta
          property="og:image"
          content="https://i.ibb.co/hFm4S94/meta-image.png"
        />
      </Helmet>

      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Navigate to="/portfolio/all" />} />
          <Route path="/skills" element={<Navigate to="/#Skills" />} />
          <Route path="/portfolio/:language" element={<Portfolio />} />
          <Route path="/projects/:project_slug" element={<Project />} />
          <Route path="/contact" element={<Navigate to="/#Contact" />} />
        </Routes>
      </main>

      <Footer />

      <ScrollToTopBtn />
    </div>
  );
}
