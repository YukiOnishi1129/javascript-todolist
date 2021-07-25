export function searchResult(searchTitle, targetTitle) {
  const regexp = new RegExp('^' + searchTitle, 'i');
  return targetTitle.match(regexp);
}
