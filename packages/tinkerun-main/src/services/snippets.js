const {snippets} = require('../database/snippets')
const {getEditorWindow} = require('../processes')

const getSnippet = (connectionId, snippetId) => {
  return snippets(connectionId).get(snippetId, {})
}

const createSnippet = (connectionId, snippet) => {
  snippets(connectionId).set(snippet.id, snippet)
}

const updateSnippet = (connectionId, snippet) => {
  snippets(connectionId).set(snippet.id, snippet)
}

const allSnippets = connectionId => {
  return snippets(connectionId).store
}

const deleteSnippet = (connectionId, snippetId) => {
  snippets(connectionId).delete(snippetId)
}

/**
 * @param {String} connectionId
 * @param {String} snippetId
 */
const deleteSnippetConfirm = (connectionId, snippetId) => {
  console.log(connectionId)
  getEditorWindow(connectionId)
    .webContents
    .send('deleteSnippetConfirm', getSnippet(connectionId, snippetId))
}

module.exports = {
  createSnippet,
  updateSnippet,
  allSnippets,
  deleteSnippet,
  deleteSnippetConfirm,
}