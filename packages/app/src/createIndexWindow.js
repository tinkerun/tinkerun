const {BrowserWindow} = require('electron')
const {is} = require('electron-util')

const {setIndexWindow} = require('./processes')
const {getEntryUrl, getPreloadEntryUrl} = require('./utils/entryUrl')

const createIndexWindow = async () => {
  const win = new BrowserWindow({
    width: 600,
    height: 500,
    minWidth: 600,
    minHeight: 500,
    webPreferences: {
      preload: getPreloadEntryUrl(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  await win.loadURL(getEntryUrl('index.html'))

  if (is.development) {
    win.webContents.openDevTools()
  }

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('closed', () => {
    setIndexWindow(null)
  })

  setIndexWindow(win)
}

module.exports = {
  createIndexWindow,
}
