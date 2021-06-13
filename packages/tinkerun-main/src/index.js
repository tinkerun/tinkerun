const {app, Menu, BrowserWindow} = require('electron')
const {is} = require('electron-util')
const {autoUpdater} = require('electron-updater')
const unhandled = require('electron-unhandled')
const debug = require('electron-debug')
const contextMenu = require('electron-context-menu')

const {createIndexWindow} = require('./createIndexWindow')
const {menu, dockMenu} = require('./menu')
require('./ipc')
require('./protocol')

unhandled()
debug()
contextMenu()

// 目前只有 Mac 的证书
if (!is.development && is.macos) {
  const FOUR_HOURS = 1000 * 60 * 60 * 4
  setInterval(() => autoUpdater.checkForUpdatesAndNotify(), FOUR_HOURS)
  autoUpdater.checkForUpdatesAndNotify()
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!is.macos) {
    app.quit()
  }
})

app.on('activate', async () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length <= 0) {
    await createIndexWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  Menu.setApplicationMenu(menu)

  if (is.macos) {
    app.dock.setMenu(dockMenu)
  }

  await createIndexWindow()
})
