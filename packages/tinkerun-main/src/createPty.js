const {Pty} = require('./pty/Pty')

const {getEditorWindow, setPtyProcess} = require('./processes')

const createPty = connection => {
  const {id} = connection

  const pty = new Pty(connection)
  pty.connect()

  const onData = pty.onData(data => {
    const win = getEditorWindow(id)
    if (win) {
      win.webContents.send('outputConnection', data)
    }
  })

  pty.onExit(() => {
    if (onData) {
      onData.dispose()
    }
  })

  setPtyProcess(id, pty)
}

module.exports = {
  createPty,
}
