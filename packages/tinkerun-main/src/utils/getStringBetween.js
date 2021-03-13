const escapeRegExp = require('lodash/escapeRegExp')
const get = require('lodash/get')

/**
 * get string between the start and the end
 *
 * @param {string} str
 * @param {string} start
 * @param {string} end
 * @return {string}
 */
const getStringBetween = (str, start, end) => {
  start = escapeRegExp(start)
  end = escapeRegExp(end)

  const reg = new RegExp(`(?:.*${start})(.+)${end}`, 's')
  return get(reg.exec(str), '1', '')
}

module.exports = {
  getStringBetween,
}
