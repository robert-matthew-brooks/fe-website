import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header.jsx';
import Home from './Home.jsx';
import Portfolio from './Portfolio.jsx';
import Footer from './Footer.jsx';
import './App.css';

export default function App() {
  return (
    <div id="App">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Navigate to="/portfolio/all" />} />
          <Route path="/portfolio/:language" element={<Portfolio />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
