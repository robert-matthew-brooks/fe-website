import parser from 'html-react-parser';
import './ElevatedButton.css';

export default function ElevatedButton({ text, href }) {
  return (
    <div id="ElevatedButton">
      <a id="ElevatedButton__link" href={href} target="_new">
        {parser(text)}
      </a>
    </div>
  );
}
