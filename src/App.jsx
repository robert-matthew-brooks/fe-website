import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Portfolio from './components/Portfolio.jsx';
import Project from './components/Project.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTopBtn from './components/ScrollToTopBtn.jsx';
import './App.css';

export default function App() {
  return (
    <div id="App">
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
