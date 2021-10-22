const {Menu, MenuItem} = require('electron')

const {getIntl} = require('./locale')
const {deleteSnippetConfirm} = require('./services/snippets')

const snippetContextMenu = (connectionId, snippetId) => {
  const menu = new Menu()

  menu.append(new MenuItem({
    label: getIntl().formatMessage({id: 'delete'}),
    click: () => deleteSnippetConfirm(connectionId, snippetId),
  }))

  return menu
}

module.exports = {
  snippetContextMenu,
}
