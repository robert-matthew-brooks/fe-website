export default async (request, context) => {
  const response = await context.next();
  let updatedPage = await response.text();

  updatedPage = updatedPage.replace(/\$OG_URL/g, request.url);
  updatedPage = updatedPage.replace(/\$OG_TYPE/g, 'webpage');
  updatedPage = updatedPage.replace(
    /\$OG_TITLE/g,
    'RBM - Full Stack Developer'
  );
  updatedPage = updatedPage.replace(
    /\$OG_DESCRIPTION/g,
    'Portfolio // Full Stack Dev - Javascript, Node.js, HTML, CSS, Express.js, PostgreSQL, Jest'
  );
  updatedPage = updatedPage.replace(
    /\$OG_IMAGE/g,
    'https://i.ibb.co/hFm4S94/meta-image.png'
  );

  return new Response(updatedPage, response);
};
