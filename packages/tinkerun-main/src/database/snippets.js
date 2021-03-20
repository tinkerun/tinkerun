const Store = require('electron-store')

let data = {}

const snippets = id => {
  if (data[id]) {
    return data[id]
  }

  const store = new Store({
    name: `app/snippets/${id}`
  })

  data[id] = store

  return store
}

module.exports = {
  snippets,
}