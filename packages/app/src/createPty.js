const {PsySH} = require('./pty/PsySH')

const {getEditorWindow, setPtyProcess} = require('./processes')

const createPty = connection => {
  const {id} = connection

  const pty = new PsySH(connection)
  pty.connect()

  pty.onExecuted(res => {
    getEditorWindow(id).webContents.send(`outputConnection`, res)
  })

  pty.onConnected(() => {
    getEditorWindow(id).webContents.send(`connectedConnection`)
  })

  setPtyProcess(id, pty)
}

module.exports = {
  createPty,
}
