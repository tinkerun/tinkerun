const fs = require('fs')
const path = require('path')
const flatten = require('flat')
const {createIntl, createIntlCache} = require('@formatjs/intl')

const {getLocale} = require('./services/config')

const cache = createIntlCache()

/**
 * get the intl config
 *
 * @returns {{messages: any, locale: string}}
 */
const getIntlConfig = () => {
  const locale = getLocale()
  const messages = flatten(JSON.parse(
    fs.readFileSync(path.join(__dirname, `lang/${locale}.json`)).toString('utf8'),
  ))

  return {
    locale,
    messages,
  }
}

let intl = null

/**
 * get the global intl object
 *
 * @returns {IntlShape}
 */
const getIntl = () => {
  if (!intl) {
    setIntl()
  }

  return intl
}

/**
 * set intl object
 *
 * @param {Object} config
 */
const setIntl = (config = null) => {
  if (!config) {
    config = getIntlConfig()
  }

  intl = createIntl(config, cache)
}

module.exports = {
  getIntl,
  setIntl,
  getIntlConfig,
}
