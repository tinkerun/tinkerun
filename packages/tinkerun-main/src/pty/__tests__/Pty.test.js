const {Pty} = require('../Pty')

describe('test Pty', () => {
  test('constructor should be correctly', () => {
    const connection = 'connection'
    const p = new Pty(connection)

    expect(p.connection).toBe(connection)
    expect(p.pty).toBeNull()
    expect(p.commandDefault).toBe('')
  })
})
