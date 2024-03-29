import { useEffect, useState } from 'react';
import splashComputer from '../assets/splash-img/computer.png';
import splashShadows from '../assets/splash-img/shadows.png';
import splashWisp from '../assets/splash-img/wisp.png';
import splashLights from '../assets/splash-img/lights.png';
import './SplashImg.css';

const colours = [
  '#ffffff',
  '#ffff00',
  '#dcd0ff',
  '#90ee90',
  '#add8e6',
  '#7fffd4',
  '#ffe4c4',
];
const tags = [
  '<html>',
  '<script defer>',
  '<div size="big">',
  '<span color="red">',
  '<header class="heading">',
  '<main>',
  '<footer>',
  '// some comment',
  '<!-- HTML comment-->',
];

const randomTag = () => {
  return tags[Math.floor(Math.random() * tags.length)];
};

const randomColour = () => {
  return colours[Math.floor(Math.random() * colours.length)];
};

const randomIndent = (codeArr) => {
  if (codeArr.length === 0) return 0;
  else {
    const prevIndent = codeArr[codeArr.length - 1].indent;

    if (prevIndent <= 2) return prevIndent + 1;
    else {
      return prevIndent - 1 + Math.floor(Math.random() * 2);
    }
  }
};

// handle the monitor animation update, return timer function for React to clear
const handleMonitorUpdate = (visibleTags, setVisibleTags) => {
  let interval;
  const lastTag = visibleTags[visibleTags.length - 1];

  // initial state - no lines on screen
  if (visibleTags.length === 0) {
    interval = addTag(visibleTags, setVisibleTags);
  }
  // got to end of typing line
  else if (lastTag.visibleLetters === lastTag.text.length) {
    interval = addTag(visibleTags, setVisibleTags);
  } else {
    interval = addLetter(visibleTags, setVisibleTags);
  }

  return interval;
};

// add a new line to the monitor animation
const addTag = (visibleTags, setVisibleTags) => {
  let newTags;

  if (visibleTags.length >= 13) {
    newTags = [
      {
        text: randomTag(),
        colour: randomColour(),
        indent: 0,
        visibleLetters: 0,
      },
    ];
  } else {
    newTags = [
      ...visibleTags,
      {
        text: randomTag(),
        colour: randomColour(),
        indent: randomIndent(visibleTags),
        visibleLetters: 0,
      },
    ];
  }

  const addTagDelay = 500 + Math.floor(Math.random() * 500);

  return setInterval(() => {
    setVisibleTags(newTags);
  }, addTagDelay);
};

// add letter - simulate typing of a tag on the monitor animation
const addLetter = (visibleTags, setVisibleTags) => {
  const lastTag = visibleTags.pop();
  lastTag.visibleLetters++;
  const newTags = [...visibleTags, lastTag];

  const addLetterDelay = 50 + Math.floor(Math.random() * 150);

  return setInterval(() => {
    setVisibleTags(newTags);
  }, addLetterDelay);
};

export default function SplashImage() {
  const initialTags = [];
  for (let i = 0; i < 3; i++) {
    const tag = randomTag();
    initialTags.push({
      text: tag,
      colour: randomColour(),
      indent: i,
      visibleLetters: tag.length,
    });
  }
  const [visibleTags, setVisibleTags] = useState(initialTags);

  useEffect(() => {
    const interval = handleMonitorUpdate(visibleTags, setVisibleTags);
    return () => clearInterval(interval);
  }, [visibleTags]);

  return (
    <div id="splash-image__outer">
      <div id="splash-image__inner">
        <img id="splash-image__shadows" src={splashShadows} alt="Shadows" />
        <img src={splashComputer} alt="Laptop, screen and mug of coffee" />
        <img id="splash-image__wisp" src={splashWisp} alt="Coffee wisp" />
        <img
          id="splash-image__lights"
          src={splashLights}
          alt="Flashing laptop lights"
        />
        <div id="splash-image__monitor-code">
          {visibleTags.map((tag, i) => {
            return (
              <div
                key={i}
                style={{ color: tag.colour, paddingLeft: tag.indent * 5 }}
              >
                {tag.text.substring(0, tag.visibleLetters)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
