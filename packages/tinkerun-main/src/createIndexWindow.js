const {BrowserWindow} = require('electron')

const {setIndexWindow} = require('./processes')
const {getEntryUrl, getPreloadEntryUrl} = require('./utils/entryUrl')
const {appName} = require('./constants')

let hash = ''

const createIndexWindow = async () => {
  const win = new BrowserWindow({
    width: 750,
    height: 500,
    minWidth: 750,
    minHeight: 500,
    title: appName,
    webPreferences: {
      preload: getPreloadEntryUrl(),
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: true,
    },
  })

  let asset = 'index.html'
  if (hash) {
    asset = `${asset}#${hash}`
  }

  await win.loadURL(getEntryUrl(asset))

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('close', () => {
    // 保存上一次的 url hash 地址
    hash = win.webContents.getURL().split('#')[1]
  })

  win.on('closed', () => {
    setIndexWindow(null)
  })

  setIndexWindow(win)
}

module.exports = {
  createIndexWindow,
}
