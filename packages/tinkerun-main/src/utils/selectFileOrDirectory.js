const {dialog, BrowserWindow} = require('electron')

/**
 * select file or directory and return the selected path
 *
 * @param {OpenDialogSyncOptions} options
 * @returns {string}
 */
const selectFileOrDirectory = options => {
  const paths = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), options)
  return paths ? paths[0] : ''
}

/**
 * @param {string} defaultPath
 * @returns {string}
 */
const selectDirectory = (defaultPath = '') => selectFileOrDirectory({
  defaultPath,
  properties: [
    'openDirectory',
    'createDirectory',
  ],
})

/**
 * @param {string} defaultPath
 * @returns {string}
 */
const selectFile = (defaultPath = '') => selectFileOrDirectory({
  defaultPath,
  properties: [
    'openFile',
  ],
})

module.exports = {
  selectDirectory,
  selectFile,
}
