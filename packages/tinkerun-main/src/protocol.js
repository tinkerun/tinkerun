const {app} = require('electron')
const path = require('path')
const {URL} = require('url')

const {getConnection, connectConnection} = require('./services/connections')
const {protocol} = require('./constants')

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(protocol, process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient(protocol)
}

app.on('open-url', (event, url) => {
  const urlInstance = new URL(url)
  const id = urlInstance.host

  app.whenReady().then(async () => {
    await connectConnection(getConnection(id))
  })
})
