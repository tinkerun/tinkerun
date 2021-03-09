const fs = require('fs')
const path = require('path')

const allLocales = (() => {
  return fs.readdirSync(path.resolve(__dirname, '../lang')).map(v => path.basename(v, '.json'))
})()

module.exports = {
  allLocales,
}
