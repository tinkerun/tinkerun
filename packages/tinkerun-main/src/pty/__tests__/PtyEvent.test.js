const {EventEmitter} = require('events')

const {PtyEvent} = require('../PtyEvent')

describe('test PtyEvent', () => {

  test('constructor should be correctly',  () => {
    const p = new PtyEvent()
    expect(p.event).toBeInstanceOf(EventEmitter)
    expect(p.prompt).toBe('')
    expect(p.code).toBe('')
    expect(p.res).toBe('')
    expect(p.connected).toBeFalsy()
  })

  describe('test handlePtyData method', () => {
    it('should emit data event', function () {
      const p = new PtyEvent()

      const fn = jest.fn()
      p.onData(fn)

      const arg = 'data'
      p.handlePtyData(arg)

      expect(fn).toBeCalledTimes(1)
      expect(fn).toBeCalledWith(arg)
    })

    it('should emit connected event', function () {
      const p = new PtyEvent()
      p.prompt = '>>>'

      const fn = jest.fn()
      p.onConnected(fn)

      const ss = [
        '>>>',
        '>>>',
        '>>>'
      ]

      for (let s of ss){
        p.handlePtyData(s)
      }

      expect(fn).toBeCalledTimes(1)
    })

    it('should emit executed event', function () {
      const p = new PtyEvent()
      p.prompt = '>>>'
      p.code = 'User::all()'
      p.connected = true

      const fn = jest.fn()
      p.onExecuted(fn)

      const ss = [
        `${p.code}\r\n`,
        'result\r\n',
        '>>> '
      ]

      for (let s of ss) {
        p.handlePtyData(s)
      }

      expect(fn).toBeCalledTimes(1)
      expect(fn).toBeCalledWith('result')
    })

    it('should reset res', function () {
      const p = new PtyEvent()
      p.prompt = '>>>'

      const ss = [
        '>>>',
        '>>>',
        '>>>'
      ]

      for (let s of ss){
        p.handlePtyData(s)
      }

      expect(p.res).toBe('')

    })
  })

  test('test onData method', () => {
    const p = new PtyEvent()

    const fn = jest.fn()
    const e = p.onData(fn)

    p.event.emit('data')
    expect(fn).toBeCalledTimes(1)

    jest.resetAllMocks()
    e.dispose()
    p.event.emit('data')
    expect(fn).not.toBeCalled()
  })

  test('test onExecuted method', () => {
    const p = new PtyEvent()

    const fn = jest.fn()
    const e = p.onExecuted(fn)

    p.event.emit('executed')
    expect(fn).toBeCalledTimes(1)

    jest.resetAllMocks()
    e.dispose()
    p.event.emit('executed')
    expect(fn).not.toBeCalled()
  })

  test('test onConnected method', () => {
    const p = new PtyEvent()

    const fn = jest.fn()
    p.onConnected(fn)
    p.event.emit('connected')
    p.event.emit('connected')

    expect(fn).toBeCalledTimes(1)
  })

})
