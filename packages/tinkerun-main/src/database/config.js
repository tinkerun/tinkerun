const {app} = require('electron')
const Store = require('electron-store')

const {allLocales} = require('../utils/allLocales')

const config = new Store({
  name: 'app/config',
  defaults: {
    locale: allLocales.indexOf(app.getLocale()) >= 0 ? app.getLocale() : 'en',
    command_default: 'php artisan tinker',
    shortcut_run: ['Control', 'r'],
    shortcut_new_connection: ['Meta', 'Shift', 'n'],
  },
})

module.exports = {
  config,
}
