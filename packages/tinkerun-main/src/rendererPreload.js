const {contextBridge, ipcRenderer} = require('electron')
const queryString = require('query-string')

const connectionId = () => queryString.parse(global.location.search).id

contextBridge.exposeInMainWorld('api', {
  selectDirectory: defaultPath => ipcRenderer.sendSync('selectDirectory', defaultPath),
  selectFile: defaultPath => ipcRenderer.sendSync('selectFile', defaultPath),
  setLocale: locale => ipcRenderer.send('setLocale', locale),
  getLocale: () => ipcRenderer.sendSync('getLocale'),
  allLocales: () => ipcRenderer.sendSync('allLocales'),
  getIntlConfig: () => ipcRenderer.send('getIntlConfig'),
  inspire: () => ipcRenderer.sendSync('inspire'),
  createConnection: () => ipcRenderer.sendSync('createConnection'),
  getConnection: id => ipcRenderer.sendSync('getConnection', id),
  deleteConnection: id => ipcRenderer.send('deleteConnection', id),
  allConnections: () => ipcRenderer.sendSync('allConnections'),
  updateConnection: connection => ipcRenderer.send('updateConnection', connection),
  connectConnection: connection => ipcRenderer.send('connectConnection', connection),
  quickConnect: () => ipcRenderer.send('quickConnect'),
  popupConnectionContextMenu: id => ipcRenderer.send('popupConnectionContextMenu', id),
  inputConnection: code => ipcRenderer.send('inputConnection', connectionId(), code),
  runConnection: code => ipcRenderer.send('runConnection', connectionId(), code),
  closeConnection: () => ipcRenderer.send('closeConnection', connectionId()),

  onSetIntlConfig: cb => {
    const listener = (event, arg) => cb(arg)
    ipcRenderer.on('setIntlConfig', listener)
    return {
      dispose: () => ipcRenderer.off('setIntlConfig', listener),
    }
  },

  onUpdateConnection: cb => {
    const listener = (event, arg) => cb(arg)
    ipcRenderer.on('updateConnection', listener)
    return {
      dispose: () => ipcRenderer.off('updateConnection', listener),
    }
  },

  onCreateConnection: cb => {
    const listener = (event, arg) => cb(arg)
    ipcRenderer.on('createConnection', listener)
    return {
      dispose: () => ipcRenderer.off('createConnection', listener),
    }
  },

  onDeleteConnection: cb => {
    const listener = (event, arg) => cb(arg)
    ipcRenderer.on('deleteConnection', listener)
    return {
      dispose: () => ipcRenderer.off('deleteConnection', listener),
    }
  },

  onOutputConnection: cb => {
    const listener = (event, arg) => cb(arg)
    ipcRenderer.on('outputConnection', listener)
    return {
      dispose: () => ipcRenderer.off('outputConnection', listener),
    }
  },

  onExecuteConnection: cb => {
    const listener = (event, arg) => cb(arg)
    ipcRenderer.on('executeConnection', listener)
    return {
      dispose: () => ipcRenderer.off('executeConnection', listener),
    }
  },

  onConnectedConnection: cb => ipcRenderer.once('connectedConnection', cb),
})
