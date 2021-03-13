const {v4: uuid4} = require('uuid')

const {connections} = require('../database/connections')
const {getIndexWindow, getPtyProcess, getEditorWindow} = require('../processes')
const {getIntl} = require('../locale')
const {quickConnection} = require('../constants')

/**
 * @returns {Record<string, any>}
 */
const newConnection = () => ({
  id: uuid4(),
  tag: 'local',
  name: getIntl().formatMessage({id: 'connections.name_default'}),
  is_over_ssh: false,
  path: '',
  command: '',
})

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
  // send the `deleteConnection` event to the renderer
  getIndexWindow().webContents.send('deleteConnection', id)
}

/**
 * @returns {Record<string, any>}
 */
const createConnection = () => {
  const connection = newConnection()

  connections.set(connection.id, connection)
  getIndexWindow().webContents.send('createConnection', connection)

  return connection
}

/**
 * @param {Record<string, any>} connection
 */
const updateConnection = connection => {
  connections.set(connection.id, connection)
  getIndexWindow().webContents.send('updateConnection', connection)
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
 *
 * @param {String} id
 * @param {String } code
 */
const runConnection = (id, code) => {
  getPtyProcess(id).run(code)
}

/**
 * @param {String} id
 */
const closeConnection = id => {
  getEditorWindow(id).close()
}

module.exports = {
  allConnections,
  deleteConnection,
  createConnection,
  updateConnection,
  getConnection,
  inputConnection,
  runConnection,
  closeConnection,
}
