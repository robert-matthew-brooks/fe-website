import SplashImage from './SplashImage.jsx';
import './Splash.css';
import ElevatedButton from './ElevatedButton.jsx';

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

          <ElevatedButton
            text="Let's Chat On WhatsApp"
            href="https://wa.me/447444239651?text=Hello!"
          />
        </div>
      </div>
    </section>
  );
}
