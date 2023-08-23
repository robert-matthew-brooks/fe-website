import Header from './Header.jsx';
import Home from './Home.jsx';
import Footer from './Footer.jsx';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Home />
      </main>

      <Footer />
    </div>
  );
}
