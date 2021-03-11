const {app} = require('electron')
const path = require('path')
const fs = require('fs')

class Log {
  constructor (connection) {
    const dir = path.join(app.getPath('userData'), 'pty-logs')

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true})
    }

    this.filename = path.join(dir, `${connection.id}.log`)
    this.fd = fs.openSync(this.filename, 'w')
  }

  append (data) {
    fs.appendFileSync(this.fd, data)
  }

  close () {
    fs.closeSync(this.fd)
    // 关闭之后删除 log 文件
    fs.unlinkSync(this.filename)
  }
}

module.exports = {
  Log,
}
