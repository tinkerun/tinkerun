const {BrowserWindow, ipcMain} = require('electron')
const {is} = require('electron-util')

const {PsySHPty} = require('./PsySHPty')
const {getEditorWindow, setEditorWindow, getIndexWindow} = require('./processes')
const {getEntryUrl, getPreloadEntryUrl} = require('./utils/entryUrl')

const createPty = connection => {
  const pty = new PsySHPty(connection)
  pty.connect()

  const {id} = connection

  // bind events
  pty.onExecuted(res => {
    getEditorWindow(id).webContents.send(`outputConnection.${id}`, res)
  })

  // pty.onConnected(() => {
  //   getEditorWindow(id).webContents.send(`connectedConnection.${id}`, true)
  // })

  return pty
}

const createEditorWindow = async connection => {
  const mainWindow = getIndexWindow()

  if (mainWindow) {
    mainWindow.close()
  }

  const pty = createPty(connection)

  const {id, name} = connection

  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    title: name,
    webPreferences: {
      preload: getPreloadEntryUrl(),
      contextIsolation: true,
      nodeIntegration: false,
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

    if (pty) {
      pty.kill()
    }

    ipcMain.removeAllListeners(`inputConnection.${id}`)
  })

  // bind run code
  ipcMain.on(`inputConnection.${id}`, (event, code) => {
    pty.run(code)
  })

  setEditorWindow(id, win)
}

module.exports = {
  createEditorWindow,
}
