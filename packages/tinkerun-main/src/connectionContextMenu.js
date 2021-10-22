const {Menu, MenuItem} = require('electron')

const {getIntl} = require('./locale')
const {
  deleteConnectionConfirm,
  getConnection,
  connectConnection,
  cloneConnection,
} = require('./services/connections')

const connectionContextMenu = id => {
  const menu = new Menu()

  menu.append(new MenuItem({
    label: getIntl().formatMessage({id: 'connections.connect'}),
    click: () => connectConnection(getConnection(id)),
  }))

  menu.append(new MenuItem({
    label: getIntl().formatMessage({id: 'connections.clone'}),
    click: () => cloneConnection(id),
  }))

  menu.append(new MenuItem({
    type: 'separator',
  }))

  menu.append(new MenuItem({
    label: getIntl().formatMessage({id: 'delete'}),
    click: () => deleteConnectionConfirm(id),
  }))

  return menu
}

module.exports = {
  connectionContextMenu,
}
