const Store = require('electron-store')

const {quickConnection} = require('../constants')

const connections = new Store({
  name: 'app/connections',
  defaults: {
    [quickConnection.id]: quickConnection,
  },
})

module.exports = {
  connections,
}
