import { SplashImage } from './SplashImage.jsx';
import './Splash.css';

export function Splash() {
  return (
    <section className="Splash">
      <div className="Splash__inner">
        <SplashImage />
        <div className="Splash__text">
          <h3>Programming // Electronics // Music</h3>
          <h2 className="temp">
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
          <div className="contact-links">
            <a className="contact-links__whatsapp" href="#">
              Let's Chat On WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
