import SplashImage from './SplashImage.jsx';
import './Splash.css';

export default function Splash() {
  return (
    <section id="Splash">
      <div id="Splash__inner">
        <SplashImage />
        <div id="Splash__text">
          <h3>Programming // Electronics // Music</h3>
          <h2>
            Hi, I'm a
            <br />
            <span className="fullstack-highlight">
              full stack
              <br />
              developer
            </span>
            <br />
            and
            <br />
            app designer
          </h2>
          <p>
            My mission is to help make <em>your</em> software work great and
            look professional.
          </p>
          <div id="whatsapp-btn__wrapper">
            <a id="whatsapp-btn" href="#">
              Let's Chat On WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
