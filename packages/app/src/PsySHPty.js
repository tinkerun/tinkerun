const pty = require('node-pty')
const {EventEmitter} = require('events')

const {parseSSHCommand} = require('./utils/parseSSHCommand')
const {getStringBetween} = require('./utils/getStringBetween')
const {PtyLog} = require('./PtyLog')

const EVENT_ON_EXECUTED = 'onExecuted'
const EVENT_ON_CONNECTED = 'onConnected'
// the default prompt for psySH
// see https://github.com/bobthecow/psysh/blob/main/src/Shell.php#L53
const PROMPT = '>>>'
// the default command, if you use laravel
const COMMAND_DEFAULT = 'php artisan tinker'

class PsySHPty {

  constructor (connection) {
    this.connection = connection
    this.event = new EventEmitter()
    this.code = ''
    this.pty = null
    this.log = null
  }

  /**
   * connect the connection
   */
  connect () {
    const shell = process.env.SHELL
    const options = {}

    if (!this.connection.is_over_ssh) {
      options.cwd = this.connection.path
    }

    this.pty = pty.spawn(shell, [], options)

    if (this.connection.is_over_ssh) {
      this.pty.write(`${parseSSHCommand(this.connection)}\r`)
    }

    this.pty.write(`${this.connection.command || COMMAND_DEFAULT}\r`)

    this.log = new PtyLog(this.connection)
    this._onData()
  }

  _onData () {
    let res = ''
    let connected = false

    this.pty.onData(data => {
      if (this.log) {
        this.log.append(data)
      }

      res += data
      if (res.indexOf(PROMPT) >= 0) {
        if (!connected) {
          this.event.emit(EVENT_ON_CONNECTED)
          connected = true
        } else {
          // emit the result yet
          res = this.getExecutedResult(res)
          this.event.emit(EVENT_ON_EXECUTED, res)

          // reset code
          this.code = ''
        }

        // reset `res`
        res = ''
      }
    })
  }

  /**
   * listen the code is executed
   *
   * @param {function} cb
   * @returns {void}
   */
  onExecuted (cb) {
    this.event.on(EVENT_ON_EXECUTED, cb)
  }

  /**
   * listen the connection is connected
   *
   * @param {function} cb
   * @returns {void}
   */
  onConnected (cb) {
    this.event.once(EVENT_ON_CONNECTED, cb)
  }

  /**
   * re connect the connection
   */
  reconnect () {
    this.kill()
    this.connect()
  }

  /**
   * kill the pty process
   */
  kill () {
    this.pty.kill()
    this.pty = null

    this.log.close()
    this.log = null

    this.event.removeAllListeners([
      EVENT_ON_EXECUTED,
      EVENT_ON_EXECUTED,
    ])
  }

  /**
   * run the code
   *
   * @param {string} code
   * @returns {void}
   */
  run (code) {
    this.code = code

    code = code.replaceAll('\n', '\\\n')
    this.pty.write(`${code}\r`)
  }

  /**
   * get a clear executed result
   *
   * @param {string} res
   * @returns {string}
   */
  getExecutedResult (res) {
    const snippets = this.code.split('\n').filter(v => !!v.trim())
    return getStringBetween(res, `${snippets[snippets.length - 1]}\r\n`, PROMPT)
  }
}

module.exports = {
  PsySHPty,
}
