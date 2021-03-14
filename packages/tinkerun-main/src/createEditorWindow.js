const {BrowserWindow} = require('electron')
const {is} = require('electron-util')

const {createPty} = require('./createPty')
const {setEditorWindow, getPtyProcess, setPtyProcess} = require('./processes')
const {getEntryUrl, getPreloadEntryUrl} = require('./utils/entryUrl')
const {appName} = require('./constants')

const createEditorWindow = async connection => {
  const {id, name} = connection

  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 800,
    minHeight: 800,
    title: `${appName} - ${name}`,
    webPreferences: {
      preload: getPreloadEntryUrl(),
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: true,
    },
  })

  await win.loadURL(`${getEntryUrl('editor.html')}?id=${id}`)

  if (is.development) {
    win.webContents.openDevTools()
  }

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('closed', () => {
    setEditorWindow(id, null)

    // 清理 pty
    if (getPtyProcess(id)) {
      getPtyProcess(id).kill()
      setPtyProcess(id, null)
    }
  })

  setEditorWindow(id, win)

  createPty(connection)
}

module.exports = {
  createEditorWindow,
}
