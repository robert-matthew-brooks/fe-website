import axios from 'npm:axios@^1.5.0';
import { prodBackendUrl } from '../../src/js/backend-urls.js';

export default async (request, context) => {
  const slug = request.url.split('/').pop();

  const { data } = await axios.get(`${prodBackendUrl}/api/projects/${slug}`);
  const project = data.project;

  const response = await context.next();
  let updatedPage = await response.text();

  updatedPage = updatedPage.replace(/\$OG_URL/g, request.url);
  updatedPage = updatedPage.replace(/\$OG_TYPE/g, 'article');
  updatedPage = updatedPage.replace(/\$OG_TITLE/g, project.title);
  updatedPage = updatedPage.replace(/\$OG_DESCRIPTION/g, 'DESCRIPTION');
  updatedPage = updatedPage.replace(/\$OG_IMAGE/g, project.img_url);

  return new Response(updatedPage, response);
};
