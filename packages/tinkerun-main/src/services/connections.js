const {is} = require('electron-util')

const {connections} = require('../database/connections')
const {getIndexWindow, getPtyProcess, getEditorWindow} = require('../processes')
const {quickConnection} = require('../constants')
const {createIndexWindow} = require('../createIndexWindow')
const {createEditorWindow} = require('../createEditorWindow')
const {createPty} = require('../createPty')

/**
 * @returns {Record<string, any>}
 */
const allConnections = () => {
  const data = connections.store
  delete data[quickConnection.id]

  return data
}

/**
 * @param {String} id
 */
const deleteConnection = id => {
  connections.delete(id)
}

/**
 * @param {String} id
 */
const deleteConnectionConfirm = id => {
  getIndexWindow().webContents.send('deleteConnectionConfirm', getConnection(id))
}

/**
 * @param {Record<string, any>} connection
 * @returns {Promise<void>}
 */
const connectConnection = async connection => {
  if (is.macos) {
    // 如果是苹果系统则关闭 indexWindow
    const win = getIndexWindow()
    if (win) {
      win.close()
    }
  }

  await createEditorWindow(connection)
}

const reconnectConnection = connection => {
  const pty = getPtyProcess(connection.id)
  if (pty) {
    pty.kill()
  }
  createPty(connection)
  getEditorWindow(connection.id).webContents.send('reconnectConnection')
}

/**
 * @returns {Record<string, any>}
 */
const createConnection = connection => {
  connections.set(connection.id, connection)
}

/**
 * @param {Record<string, any>} connection
 */
const updateConnection = connection => {
  if (connections.has(connection.id)) {
    connections.set(connection.id, connection)
  }
}

/**
 * @param {String} id
 * @returns {Record<string, any>}
 */
const getConnection = id => connections.get(id, {})

/**
 *
 * @param {String} id
 * @param {String } code
 */
const inputConnection = (id, code) => {
  getPtyProcess(id).input(code)
}

/**
 * @param {String} id
 */
const inputConnectionClearLine = id => {
  getPtyProcess(id).clearLine()
}

/**
 * @param {String} id
 */
const closeConnection = async id => {
  getEditorWindow(id).close()

  if (!getIndexWindow()) {
    await createIndexWindow()
  }
}

module.exports = {
  allConnections,
  deleteConnection,
  deleteConnectionConfirm,
  createConnection,
  updateConnection,
  getConnection,
  inputConnection,
  inputConnectionClearLine,
  closeConnection,
  connectConnection,
  reconnectConnection,
}
