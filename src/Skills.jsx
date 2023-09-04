import Languages from './Languages';
import './Skills.css';

export default function Skills() {
  return (
    <section id="Skills">
      <div id="Skills__inner">
        <h3>Projects built using:</h3>
        <Languages />

        <ul id="Skills__soft-skills-list">
          <li>
            <strong>Agile</strong> - responding to change during a project's
            lifecycle, communicating with the dev team via stand-ups, Kanban
            boards and retros
          </li>
          <li>
            <strong>Test Driven Development</strong> - coding to satisfy
            expected behaviour, unit and end-to-end testing, "successfully
            failing" tests using red-green-refactor
          </li>
          <li>
            <strong>CI/CD</strong> - integrating updates quickly to avoid large
            codebase changes, automated testing within git and version control
            software
          </li>
          <li>
            <strong>Pair Programming</strong> - driving and navigating to
            collaborate ideas, continual personal development and
            knowedge-sharing, trying new approaches and perspectives
          </li>
          <li>
            <strong>Frontend</strong> - creating engaging and stylish
            interfaces, putting the client's experience first, responsive and
            mobile-first design, considering accessibility requirements
          </li>
          <li>
            <strong>Backend</strong> - creating RESTful apis, managing and
            querying relational databases, using the MVC server design pattern
          </li>
        </ul>
      </div>
    </section>
  );
}
