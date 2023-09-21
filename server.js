import express, { Router } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchProject } from './src/js/api.js';

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, './dist')));

app.get('/projects/:project_slug', async function (req, res) {
  const { project_slug: projectSlug } = req.params;

  const { project } = await fetchProject(projectSlug);

  const filePath = path.resolve(__dirname, './dist', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.error();
      err;
    }

    data = data.replace(
      /\$OG_URL/g,
      req.protocol + '://' + req.get('host') + req.originalUrl
    );
    data = data.replace(/\$OG_TYPE/g, 'article');
    data = data.replace(/\$OG_TITLE/g, project.title);
    data = data.replace(/\$OG_DESCRIPTION/g, 'TODO: Project description');
    data = data.replace(/\$OG_IMAGE/g, project.img_url);
    res.send(data);
  });
});

app.get('*', function (req, res) {
  const filePath = path.resolve(__dirname, './dist', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.error(err);
    }

    data = data.replace(
      /\$OG_URL/g,
      req.protocol + '://' + req.get('host') + req.originalUrl
    );
    data = data.replace(/\$OG_TYPE/g, 'website');
    data = data.replace(/\$OG_TITLE/g, 'RMB - Full Stack Developer');
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      'Portfolio // Full Stack Dev - Javascript, Node.js, HTML, CSS, Express.js, PostgreSQL, Jest'
    );
    data = data.replace(
      /\$OG_IMAGE/g,
      'https://i.ibb.co/hFm4S94/meta-image.png'
    );
    res.send(data);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
