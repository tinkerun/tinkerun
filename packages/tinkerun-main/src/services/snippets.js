const {snippets} = require('../database/snippets')

const createSnippet = (connectionId, snippet) => {
  snippets(connectionId).set(snippet.id, snippet)
}

const updateSnippet = (connectionId, snippet) => {
  snippets(connectionId).set(snippet.id, snippet)
}

const allSnippets = connectionId => {
  return snippets(connectionId).store
}

module.exports = {
  createSnippet,
  updateSnippet,
  allSnippets,
}