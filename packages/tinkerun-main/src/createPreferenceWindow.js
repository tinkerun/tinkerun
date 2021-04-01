const {BrowserWindow} = require('electron')
const {is} = require('electron-util')

const {getEntryUrl, getPreloadEntryUrl} = require('./utils/entryUrl')

const createPreferenceWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    parent: BrowserWindow.getFocusedWindow(),
    resizable: false,
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
