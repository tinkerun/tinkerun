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
  inputConnection: code => ipcRenderer.send(`inputConnection.${connectionId()}`, code),
  onSetIntlConfig: cb => ipcRenderer.on('setIntlConfig', (event, arg) => cb(arg)),
  offSetIntlConfig: () => ipcRenderer.removeAllListeners('setIntlConfig'),
  onUpdateConnection: cb => ipcRenderer.on('updateConnection', (event, arg) => cb(arg)),
  offUpdateConnection: () => ipcRenderer.removeAllListeners('updateConnection'),
  onDeleteConnection: cb => ipcRenderer.on('deleteConnection', (event, arg) => cb(arg)),
  offDeleteConnection: () => ipcRenderer.removeAllListeners('deleteConnection'),
  onOutputConnection: cb => ipcRenderer.on(`outputConnection.${connectionId()}`, (event, arg) => cb(arg)),
  offOutputConnection: () => ipcRenderer.removeAllListeners(`outputConnection.${connectionId()}`),
  onConnectedConnection: cb => ipcRenderer.once(`connectedConnection.${connectionId()}`, (event, args) => cb(args)),
  offConnectedConnection: () => ipcRenderer.removeAllListeners(`connectedConnection.${connectionId()}`),
})