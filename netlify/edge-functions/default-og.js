export default async (request, context) => {
  const response = await context.next();
  let updatedPage = await response.text();

  updatedPage = updatedPage.replaceAll(/\$URL/g, request.url);
  updatedPage = updatedPage.replaceAll(/\$TYPE/g, 'webpage');
  updatedPage = updatedPage.replaceAll(
    /\$TITLE/g,
    'RBM - Full Stack Developer'
  );
  updatedPage = updatedPage.replaceAll(
    /\$DESCRIPTION/g,
    'Portfolio // Full Stack Dev - Javascript, Node.js, HTML, CSS, Express.js, PostgreSQL, Jest'
  );
  updatedPage = updatedPage.replaceAll(
    /\$IMAGE/g,
    'https://i.ibb.co/hFm4S94/meta-image.png'
  );

  return new Response(updatedPage, response);
};
