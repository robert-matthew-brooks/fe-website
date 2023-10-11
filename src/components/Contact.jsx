import whatsAppIcon from '../assets/contact-icons/whatsapp-icon.svg';
import emailIcon from '../assets/contact-icons/email-icon.svg';
import linkedInIcon from '../assets/contact-icons/linkedin-icon.svg';
// import ContactForm from './ContactForm';
import './Contact.css';

export default function Contact() {
  return (
    <section id="Contact">
      <div id="Contact__inner">
        <h2 id="Contact__title">Contact Me...</h2>

        <div id="Contact__methods">
          <a
            href="mailto:robert.matthew.brooks@gmail.com?subject=Hello!"
            className="Contact__method"
          >
            <img
              src={emailIcon}
              style={{
                filter:
                  'invert(45%) sepia(52%) saturate(2265%) hue-rotate(15deg) brightness(102%) contrast(105%)',
              }}
            />
            <h3>...By Email</h3>
            <p>Send me your questions in an email</p>
            <span className="Contact__method__cta-btn">Send Email</span>
          </a>

          <a
            href="https://wa.me/447444239651?text=Hello!"
            className="Contact__method"
          >
            <img
              src={whatsAppIcon}
              style={{
                filter:
                  'invert(39%) sepia(89%) saturate(570%) hue-rotate(74deg) brightness(104%) contrast(92%)',
              }}
            />
            <h3>...On WhatsApp</h3>
            <p>
              Message me on WhatsApp and I'll get back to you as soon as
              possible
            </p>
            <span className="Contact__method__cta-btn">Use WhatsApp</span>
          </a>

          <a
            href="https://www.linkedin.com/in/robert-matthew-brooks/"
            className="Contact__method"
          >
            <img
              src={linkedInIcon}
              style={{
                filter:
                  'invert(25%) sepia(25%) saturate(1745%) hue-rotate(191deg) brightness(90%) contrast(90%)',
              }}
            />
            <h3>...Via LinkedIn</h3>
            <p>Leave a message on my LinkedIn profile</p>
            <span className="Contact__method__cta-btn">View Profile</span>
          </a>
        </div>

        {/* <ContactForm /> */}
      </div>
    </section>
  );
}
