const {app} = require('electron')
const Store = require('electron-store')

const {allLocales} = require('../utils/allLocales')

const config = new Store({
  defaults: {
    locale: allLocales.indexOf(app.getLocale()) >= 0 ? app.getLocale() : 'en',
  },
})

module.exports = {
  config,
}
