import { useState } from 'react';
import './ContactForm.css';

export default function ContactForm() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const validateInput = (input, isOnChange = false) => {
    const id = input.id;
    const value = input.value;
    let error = null;

    if (id === 'formName' && value.length > 50) {
      error = `Cannot be over 50 characters (${value.length})`;
    } else if (id === 'formEmail' && value.length > 320) {
      error = `Cannot be over 320 characters (${value.length})`;
    } else if (id === 'formMessage' && value.length > 2000) {
      error = `Cannot be over 2,000 characters (${value.length})`;
    }

    // more important errors - these will overwrite 'error'
    // but only check when user has stopped typing (onBlur the input box)
    if (!isOnChange) {
      if (!value) {
        error = 'Cannot be blank';
      } else if (id === 'formEmail' && !/[\w\d]+@[\w\d]+\.\w/.test(value)) {
        error = 'Must be a valid email address';
      }
    }

    if (error) {
      input.classList.add('Contact__form__input--error');
      input.nextSibling.innerHTML = `&#9888; ${error}`;
      input.nextSibling.style.visibility = 'visible';

      return false;
    } else {
      input.classList.remove('Contact__form__input--error');
      input.nextSibling.style.visibility = 'hidden';

      return true;
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    let isErrorFound = false;

    // validate all inputs
    const formInputs = [
      ...event.target.getElementsByTagName('input'),
      ...event.target.getElementsByTagName('textarea'),
    ];
    for (const formInput of formInputs) {
      if (!validateInput(formInput)) isErrorFound = true;
    }

    if (!isErrorFound) {
      // lock out form
      formInputs.push(...event.target.getElementsByTagName('button'));
      for (const formInput of formInputs) {
        formInput.disabled = true;
      }

      // submit form

      // feedback to user
      document.getElementById(
        'Contact__form__success-overlay'
      ).style.visibility = 'visible';
    }

    document
      .getElementById('Contact__form')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <form
      id="ContactForm"
      autoComplete="on"
      onSubmit={(event) => {
        submitForm(event);
      }}
    >
      <h3>...or send me a message:</h3>

      <label htmlFor="formName">Your Name</label>
      <input
        id="formName"
        name="firstName"
        className="ContactForm__input"
        type="text"
        autoComplete="given-name"
        value={formName}
        onChange={(event) => {
          setFormName(event.target.value);
          validateInput(event.target, true);
        }}
        onBlur={(event) => {
          validateInput(event.target);
        }}
      />
      <p className="ContactForm__error-msg" style={{ visibility: 'hidden' }}>
        &nbsp;
      </p>

      <label htmlFor="formEmail">Your Email Address</label>
      <input
        id="formEmail"
        name="email"
        className="ContactForm__input"
        type="text"
        autoComplete="email"
        value={formEmail}
        onChange={(event) => {
          setFormEmail(event.target.value);
          validateInput(event.target, true);
        }}
        onBlur={(event) => {
          validateInput(event.target);
        }}
      />
      <p className="ContactForm__error-msg" style={{ visibility: 'hidden' }}>
        &nbsp;
      </p>

      <label htmlFor="formMessage">Your Message</label>
      <textarea
        id="formMessage"
        className="ContactForm__input"
        value={formMessage}
        onChange={(event) => {
          setFormMessage(event.target.value);
          validateInput(event.target, true);
        }}
        onBlur={(event) => {
          validateInput(event.target);
        }}
      ></textarea>
      <p className="ContactForm__error-msg" style={{ visibility: 'hidden' }}>
        &nbsp;
      </p>

      <button className="subtle-box-shadow" type="submit">
        Send
      </button>

      <div id="ContactForm__success-overlay">
        <h2>Thank You!</h2>
        <p>Your message has been sent</p>
      </div>
    </form>
  );
}
