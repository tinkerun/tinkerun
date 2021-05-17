const {BrowserWindow} = require('electron')
const {is} = require('electron-util')

const {getEntryUrl, getPreloadEntryUrl} = require('./utils/entryUrl')
const {appName} = require('./constants')
const {getIntl} = require('./locale')

const createPreferenceWindow = () => {
  const win = new BrowserWindow({
    width: 500,
    height: 400,
    parent: BrowserWindow.getFocusedWindow(),
    resizable: false,
    title: `${appName} - ${getIntl().formatMessage({id: 'preference.preferences'})}`,
    webPreferences: {
      preload: getPreloadEntryUrl(),
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: true,
    },
  })

  win.loadURL(getEntryUrl('preference.html'))

  if (is.development) {
    win.webContents.openDevTools()
  }

  win.on('ready-to-show', () => {
    win.show()
  })
}

module.exports = {
  createPreferenceWindow,
}
