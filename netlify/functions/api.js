import express, { Router } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fetchProject } from '../../src/js/api.js';

const api = express();
const router = Router();
router.use(cors());

api.get(express.static(path.resolve(__dirname, '../../../../../../dist')));

/* project (update og data) */

router.get('/projects/:project_slug', async (req, res) => {
  const { project_slug: projectSlug } = req.params;

  console.log('trying to fetch project');
  const { project } = await fetchProject(projectSlug);

  const filePath = path.resolve(
    __dirname,
    '../../../../../../dist',
    'index.html'
  );

  let data = await fs.readFile(filePath, 'utf8');
  // try/catch

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

/* all other endpoints (no dynamic og data) */

router.get('*', async (req, res) => {
  const filePath = path.resolve(
    __dirname,
    '../../../../../../dist',
    'index.html'
  );

  let data = await fs.readFile(filePath, 'utf8');
  // try/catch

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
  data = data.replace(/\$OG_IMAGE/g, 'https://i.ibb.co/hFm4S94/meta-image.png');
  res.send(data);
});

api.use('/api', router);

export const handler = serverless(api);
