const {app, Menu} = require('electron')
const {is} = require('electron-util')
const unhandled = require('electron-unhandled')
const debug = require('electron-debug')
const contextMenu = require('electron-context-menu')
const {default: installExtension, REACT_DEVELOPER_TOOLS} = require('electron-devtools-installer')

const {createIndexWindow} = require('./createIndexWindow')
const {getIndexWindow} = require('./processes')
const {menu} = require('./menu')
require('./ipc')

unhandled()
debug()
contextMenu()

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
  if (!getIndexWindow()) {
    await createIndexWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))

  Menu.setApplicationMenu(menu)
  await createIndexWindow()
})
