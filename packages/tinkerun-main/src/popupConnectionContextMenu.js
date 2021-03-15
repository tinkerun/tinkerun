const {Menu, MenuItem} = require('electron')

const {createEditorWindow} = require('./createEditorWindow')
const {getIntl} = require('./locale')
const {deleteConnectionConfirm, getConnection} = require('./services/connections')

const popupConnectionContextMenu = id => {
  const menu = new Menu()

  menu.append(new MenuItem({
    label: getIntl().formatMessage({id: 'connections.connect'}),
    click: () => createEditorWindow(getConnection(id)),
  }))

  menu.append(new MenuItem({
    type: 'separator',
  }))

  menu.append(new MenuItem({
    label: getIntl().formatMessage({id: 'connections.delete'}),
    accelerator: 'Cmd+Delete',
    click: () => deleteConnectionConfirm(id),
  }))

  return menu
}

module.exports = {
  popupConnectionContextMenu,
}
