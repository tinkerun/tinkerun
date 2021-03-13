const {PsySH} = require('./pty/PsySH')

const {getEditorWindow, setPtyProcess} = require('./processes')

const createPty = connection => {
  const {id} = connection

  const pty = new PsySH(connection)
  pty.connect()

  pty.onExecuted(res => {
    getEditorWindow(id).webContents.send('executeConnection', res)
  })

  pty.onConnected(() => {
    getEditorWindow(id).webContents.send('connectedConnection')
  })

  pty.onData(data => {
    const win = getEditorWindow(id)
    if (win) {
      win.webContents.send('outputConnection', data)
    }
  })

  setPtyProcess(id, pty)
}

module.exports = {
  createPty,
}
