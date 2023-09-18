import { useState } from 'react';
import './ScrollToTopBtn.css';

export default function ScrollToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  window.onscroll = () => {
    if (!isVisible && document.documentElement.scrollTop > window.innerHeight) {
      setIsVisible(true);
    } else if (isVisible && document.documentElement.scrollTop === 0)
      setIsVisible(false);
  };

  return (
    <button
      id="ScrollToTopBtn"
      className={
        isVisible ? 'ScrollToTopBtn--visible' : 'ScrollToTopBtn--hidden'
      }
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
    >
      &#x25B2; Top
    </button>
  );
}
