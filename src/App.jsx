import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import Portfolio from './Portfolio.jsx';
import Project from './Project.jsx';
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
          <Route path="/projects/:project_id" element={<Project />} />
          <Route path="/contact" element={<Navigate to="/#Contact" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
