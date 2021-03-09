const {app} = require('electron')
const path = require('path')
const fs = require('fs')

class PtyLog {
  constructor (connection) {
    const dir = path.resolve(app.getPath('userData'), 'pty-logs')

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true})
    }

    const filename = `${connection.id}.log`

    this.fd = fs.openSync(path.resolve(dir, filename), 'w')
  }

  append (data) {
    fs.appendFileSync(this.fd, data)
  }

  close () {
    fs.closeSync(this.fd)
  }
}

module.exports = {
  PtyLog,
}
