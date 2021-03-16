const pty = require('node-pty')
const defaultShell = require('default-shell')
const fs = require('fs')

const {parseSSHCommand} = require('../utils/parseSSHCommand')

class Pty {
  constructor (connection) {
    this.connection = connection
    this.pty = null
    // 标记进程执行完毕
    this.prompt = ''
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
  }

  /**
   * 重连
   */
  reconnect () {
    this.kill()
    this.connect()
  }

  onData (cb) {
    this.pty.onData(cb)
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
   * terminal 输入
   *
   * @param {String} code
   */
  input (code) {
    this.pty.write(code)
  }
}

module.exports = {
  Pty,
}
