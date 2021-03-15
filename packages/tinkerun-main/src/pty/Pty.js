const pty = require('node-pty')
const defaultShell = require('default-shell')
const fs = require('fs')

const {parseSSHCommand} = require('../utils/parseSSHCommand')
const {PtyEvent} = require('./PtyEvent')

class Pty extends PtyEvent {
  constructor (connection) {
    super()

    this.connection = connection
    this.pty = null
    // 默认初始化命令
    this.commandDefault = ''
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
      } catch (e) {
      }
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

    // 自定义事件触发器
    this.pty.onData(this.handlePtyData.bind(this))
  }

  /**
   * 重连
   */
  reconnect () {
    this.kill()
    this.connect()
  }

  /**
   * @param {Function} cb
   */
  onExit (cb) {
    this.pty.onExit(cb)
  }

  /**
   * 清理
   */
  kill () {
    this.pty.kill()
    this.pty = null
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
   * terminal 输入
   *
   * @param {String} code
   */
  input (code) {
    if (code !== '\r') {
      this.code += code
    }

    this.pty.write(code)
  }
}

module.exports = {
  Pty,
}
