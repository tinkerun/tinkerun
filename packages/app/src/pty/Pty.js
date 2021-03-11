const pty = require('node-pty')
const {EventEmitter} = require('events')
const defaultShell = require('default-shell')
const fs = require('fs')

const {Log} = require('./Log')
const {parseSSHCommand} = require('../utils/parseSSHCommand')
const {getStringBetween} = require('../utils/getStringBetween')

const ON_EXECUTED = 'onExecuted'
const ON_CONNECTED = 'onConnected'

class Pty {
  constructor (connection) {
    this.connection = connection
    // 自定义事件触发器
    this.event = new EventEmitter()
    // 用于存储 log
    this.log = new Log(this.connection)

    this.pty = null

    // 标记进程执行完毕
    this.prompt = ''
    // 默认初始化命令
    this.commandDefault = ''
    // 存储正在执行的代码
    this.code = ''
  }

  /**
   * 初始化 connection pty 进程
   */
  connect () {
    const shell = defaultShell
    const options = {
      cwd: process.env.HOME,
      env: process.env,
      encoding: 'utf-8',
    }

    if (!this.connection.is_over_ssh) {
      try {
        fs.accessSync(this.connection.path)
        options.cwd = this.connection.path
      } catch (e) {}
    }

    this.pty = pty.spawn(shell, [], options)

    if (this.connection.is_over_ssh) {
      // TODO 如果是 ssh，需要去检查 ssh 的连接是否断开。
      this.pty.write(`${parseSSHCommand(this.connection)}\r`)
    }

    const command = this.connection.command || this.commandDefault
    if (command) {
      this.pty.write(`${command}\r`)
    }

    this._onData()
  }

  /**
   * 监听 pty 的 onData 事件
   *
   * @private
   */
  _onData () {
    let res = ''
    let connected = false

    this.pty.onData(data => {
      if (this.log) {
        this.log.append(data)
      }

      res += data
      if (res.indexOf(this.prompt) >= 0) {
        if (!connected) {
          this.event.emit(ON_CONNECTED)
          connected = true
        } else {
          // 触发已执行事件
          this.event.emit(ON_EXECUTED, this.result(res))

          // 重置代码
          this.code = ''
        }

        // 重置 `res`
        res = ''
      }
    })
  }

  /**
   * 代码已经执行
   *
   * @param {function} cb
   * @returns {void}
   */
  onExecuted (cb) {
    this.event.on(ON_EXECUTED, cb)
  }

  /**
   * 已连接
   *
   * @param {function} cb
   * @returns {void}
   */
  onConnected (cb) {
    this.event.once(ON_CONNECTED, cb)
  }

  /**
   * 重连
   */
  reconnect () {
    this.kill()
    this.connect()
  }

  /**
   * 清理
   */
  kill () {
    this.pty.kill()
    this.pty = null

    this.log.close()
    this.log = null

    this.event.removeAllListeners([
      ON_EXECUTED,
      ON_CONNECTED,
    ])
  }

  /**
   * 执行代码
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
   * 处理执行结果
   *
   * @param {string} res
   * @returns {string}
   */
  result (res) {
    const snippets = this.code.split('\n').filter(v => !!v.trim())
    return getStringBetween(res, `${snippets[snippets.length - 1]}\r\n`, this.prompt)
  }
}

module.exports = {
  Pty,
}
