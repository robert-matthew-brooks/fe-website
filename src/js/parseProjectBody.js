const tagReplaceList = [
  //header
  ['<h>', '<h3>'],
  ['</h>', '</h3>'],

  // link open in new window
  ['<a href=', '<a target="_blank" href='],

  // note
  ['<note>', '<p class="note">'],
  ['</note>', '</p>'],

  // quote
  ['<quote>', '<p class="quote">'],
  ['</quote>', '</p>'],

  // caption
  ['<caption>', '<p class="caption">'],
  ['</caption>', '</p>'],

  // bold
  ['<b>', '<span class="hl bold">'],
  ['</b>', '</span>'],

  // language
  ['<l>', '<span class="hl language">'],
  ['</l>', '</span>'],

  // function
  ['<f>', '<span class="hl function">'],
  ['</f>', '</span>'],

  // code snippet
  ['<c>', '<span class="hl snippet">'],
  ['</c>', '</span>'],
];

export function parseProjectBody(projectBody) {
  // remove excess spaces inside tags added by prettier
  projectBody = projectBody.replace(/(<\w+)(\s+)/g, '$1 ');

  // replace tags
  for (const tagReplacement of tagReplaceList) {
    projectBody = projectBody.replaceAll(tagReplacement[0], tagReplacement[1]);
  }

  // replace formatted code
  const codeMatches = projectBody.matchAll(/<!--code[\s\S]+?code-->/g);

  for (const codeMatch of codeMatches) {
    const codeBlock = codeMatch[0];

    const innerCodeBlock = codeBlock
      // strip pre tags
      .replace(/^<!--code/, '')
      .replace(/\s+code-->$/, '')
      // strip the leading space on each line that is added by Prettier
      .replaceAll(codeBlock.match(/\n\s+/), '\n')
      // replace < > so no interpreted as html
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');

    const formattedCodeBlock = `<div class="code-block-wrapper"><pre class="prettyprint linenums">${PR.prettyPrintOne(
      innerCodeBlock
    )}</pre></div>`;

    projectBody = projectBody.replaceAll(codeBlock, formattedCodeBlock);
  }

  return projectBody;
}
