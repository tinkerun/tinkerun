const {autoUpdater} = require('electron-updater')
const log = require('electron-log')

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'

const checkForUpdates = () => autoUpdater.checkForUpdatesAndNotify

module.exports = {
  checkForUpdates,
}