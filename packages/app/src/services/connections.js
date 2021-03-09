const {connections} = require('../database/connections')
const {getIndexWindow} = require('../processes')
const {quickConnection} = require('../constants')

/**
 * @returns {Record<string, any>}
 */
const allConnections = () => {
  const data = connections.store
  delete data[quickConnection.id]

  return data
}

/**
 * @param {string} id
 */
const deleteConnection = id => {
  connections.delete(id)
  // send the `deleteConnection` event to the renderer
  getIndexWindow().webContents.send('deleteConnection', id)
}

/**
 * @param {Record<string, any>} connection
 */
const updateConnection = connection => {
  connections.set(connection.id, connection)
  getIndexWindow().contents.send('updateConnection', connection)
}

/**
 * @param {string} id
 * @returns {object}
 */
const getConnection = id => connections.get(id, {})

module.exports = {
  allConnections,
  deleteConnection,
  updateConnection,
  getConnection,
}
