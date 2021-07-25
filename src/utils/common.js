/**
 * common.js
 * @package utils
 */

/**
 * Todoタイトルの部分一致判定
 * @param {string} searchTitle
 * @param {string} targetTitle
 * @returns
 */

export function searchResult(searchTitle, targetTitle) {
  const regexp = new RegExp('^' + searchTitle, 'i');
  return targetTitle.match(regexp);
}
