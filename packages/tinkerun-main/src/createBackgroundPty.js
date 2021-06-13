const {BackgroundPty} = require('./pty/BackgroundPty')

const {setBackgroundPtyProcess} = require('./processes')

const createBackgroundPty = connection => {
  const {id} = connection

  const pty = new BackgroundPty(connection)
  pty.connect()

  setBackgroundPtyProcess(id, pty)
}

module.exports = {
  createBackgroundPty,
}
