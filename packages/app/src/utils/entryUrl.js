const {app} = require('electron')
const path = require('path')
const {is} = require('electron-util')

const getEntryUrl = asset => {
  if (is.development) {
    return `http://localhost:${process.env.WEB_PORT || 8080}/${asset}`
  }

  return `file://${path.resolve(__dirname, app.getAppPath(), 'renderer', asset)}`
}

const getPreloadEntryUrl = () => {
  return path.resolve(__dirname, '../rendererPreload.js')
}

module.exports = {
  getEntryUrl,
  getPreloadEntryUrl,
}
