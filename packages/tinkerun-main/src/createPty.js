const {PsySH} = require('./pty/PsySH')

const {getEditorWindow, setPtyProcess} = require('./processes')

const createPty = connection => {
  const {id} = connection

  const pty = new PsySH(connection)
  pty.connect()

  pty.onConnected(() => {
    getEditorWindow(id).webContents.send('connectedConnection')
  })

  const onExecuted = pty.onExecuted(res => {
    getEditorWindow(id).webContents.send('executeConnection', res)
  })

  const onData = pty.onData(data => {
    const win = getEditorWindow(id)
    if (win) {
      win.webContents.send('outputConnection', data)
    }
  })

  pty.onExit(() => {
    onExecuted.dispose()
    onData.dispose()
  })

  setPtyProcess(id, pty)
}

module.exports = {
  createPty,
}
