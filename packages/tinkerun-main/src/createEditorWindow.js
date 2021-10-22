const {BrowserWindow} = require('electron')

const {createPty} = require('./createPty')
const {createBackgroundPty} = require('./createBackgroundPty')
const {createIndexWindow} = require('./createIndexWindow')
const {
  setEditorWindow,
  isExistEditorWindow,
  getPtyProcess,
  setPtyProcess,
  getBackgroundPtyProcess,
  setBackgroundPtyProcess,
  getIndexWindow,
} = require('./processes')
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

  win.on('ready-to-show', () => {
    win.show()
  })

  win.on('closed', async () => {
    setEditorWindow(id, null)

    // 清理 pty
    if (getPtyProcess(id)) {
      getPtyProcess(id).kill()
      setPtyProcess(id, null)

      getBackgroundPtyProcess(id).kill()
      setBackgroundPtyProcess(id, null)
    }

    if (!isExistEditorWindow() && !getIndexWindow()) {
      await createIndexWindow()
    }
  })

  setEditorWindow(id, win)

  createPty(connection)
  createBackgroundPty(connection)
}

module.exports = {
  createEditorWindow,
}
