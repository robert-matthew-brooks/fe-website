import axiod from 'https://deno.land/x/axiod@0.26.2/mod.ts';
import { prodBackendUrl } from '../../src/js/backend-urls.js';

export default async (request, context) => {
  const slug = request.url.split('/').pop();

  const { data } = await axiod.get(`${prodBackendUrl}/api/projects/${slug}`);
  const project = data.project;

  const response = await context.next();
  let updatedPage = await response.text();

  updatedPage = updatedPage.replaceAll(/\$URL/g, request.url);
  updatedPage = updatedPage.replaceAll(/\$TYPE/g, 'article');
  updatedPage = updatedPage.replaceAll(/\$TITLE/g, project.title);
  updatedPage = updatedPage.replaceAll(/\$DESCRIPTION/g, project.description);
  updatedPage = updatedPage.replaceAll(/\$IMAGE/g, project.img_url);

  return new Response(updatedPage, response);
};
