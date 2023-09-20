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

export function replaceProjectTags(projectBody) {
  for (const tagReplacement of tagReplaceList) {
    projectBody = projectBody.replaceAll(tagReplacement[0], tagReplacement[1]);
  }

  return projectBody;
}
