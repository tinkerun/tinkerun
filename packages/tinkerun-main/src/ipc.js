const {ipcMain} = require('electron')
const {is} = require('electron-util')

const {selectDirectory, selectFile} = require('./utils/selectFileOrDirectory')
const {allLocales} = require('./utils/allLocales')
const {quickConnection} = require('./constants')
const {getIntlConfig} = require('./locale')
const {createEditorWindow} = require('./createEditorWindow')
const {createIndexWindow} = require('./createIndexWindow')
const {getIndexWindow} = require('./processes')
const {popupConnectionContextMenu} = require('./popupConnectionContextMenu')
const {Inspiring} = require('./Inspiring')
const {
  deleteConnection,
  createConnection,
  updateConnection,
  allConnections,
  getConnection,
  inputConnection,
  closeConnection,
} = require('./services/connections')
const {setLocale, getLocale} = require('./services/config')

ipcMain.on('selectDirectory', (event, defaultPath) => {
  event.returnValue = selectDirectory(defaultPath)
})

ipcMain.on('selectFile', (event, defaultPath) => {
  event.returnValue = selectFile(defaultPath)
})

ipcMain.on('setLocale', (event, lang) => {
  setLocale(lang)
})

ipcMain.on('getLocale', event => {
  event.returnValue = getLocale()
})

ipcMain.on('allLocales', event => {
  event.returnValue = allLocales
})

ipcMain.on('getIntlConfig', event => {
  event.reply('setIntlConfig', getIntlConfig())
})

ipcMain.on('createConnection', event => {
  const connection = createConnection()
  event.returnValue = connection.id
})

ipcMain.on('getConnection', (event, id) => {
  event.returnValue = getConnection(id)
})

ipcMain.on('deleteConnection', (event, id) => {
  deleteConnection(id)
})

ipcMain.on('allConnections', event => {
  event.returnValue = allConnections()
})

ipcMain.on('updateConnection', (event, connection) => {
  updateConnection(connection)
})

ipcMain.on('connectConnection', async (event, connection) => {
  updateConnection(connection)

  if (is.macos) {
    // 如果是苹果系统则关闭 indexWindow
    const win = getIndexWindow()
    if (win) {
      win.close()
    }
  }

  await createEditorWindow(connection)
})

ipcMain.on('inputConnection', (event, id, code) => {
  inputConnection(id, code)
})

ipcMain.on('closeConnection', async (event, id) => {
  closeConnection(id)

  if (!getIndexWindow()) {
    await createIndexWindow()
  }
})

ipcMain.on('quickConnect', async event => {
  const path = selectDirectory()
  if (path) {
    await createEditorWindow({
      ...quickConnection,
      path,
    })
  }
})

ipcMain.on('inspire', event => {
  event.returnValue = Inspiring.quote()
})

ipcMain.on('popupConnectionContextMenu', (event, id) => {
  const menu = popupConnectionContextMenu(id)
  menu.popup()
})
