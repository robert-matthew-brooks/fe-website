import { useState } from 'react';
import './ScrollToTopBtn.css';

export default function ScrollToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);

  window.onscroll = () => {
    if (document.documentElement.scrollTop > 100) {
      setIsVisible(true);
    } else setIsVisible(false);
  };

  return (
    <button
      id="ScrollToTopBtn"
      style={{ opacity: isVisible ? 1 : 0 }}
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
