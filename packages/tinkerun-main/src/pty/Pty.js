const pty = require('node-pty')
const defaultShell = require('default-shell')
const osLocale = require('os-locale')
const fs = require('fs')
const {is} = require('electron-util')

const {name: productName, version} = require('../../package.json')
const {config} = require('../database/config')
const {parseSSHCommand} = require('../utils/parseSSHCommand')

class Pty {
  constructor (connection) {
    this.connection = connection
    this.pty = null
    // 标记进程执行完毕
    this.prompt = ''
  }

  /**
   * 初始化 connection pty 进程
   */
  connect () {
    const shell = defaultShell
    const args = [
      '--login',
    ]

    const env = Object.assign(
      {},
      process.env,
      {
        LANG: `${osLocale.sync().replace(/-/, '_')}.UTF-8`,
        TERM: 'xterm-256color',
        COLORTERM: 'truecolor',
        TERM_PROGRAM: productName,
        TERM_PROGRAM_VERSION: version
      },
    )

    const options = {
      cwd: env.HOME,
      env,
      encoding: 'utf-8',
    }

    if (!this.connection.is_over_ssh) {
      try {
        fs.accessSync(this.connection.path)
        options.cwd = this.connection.path
      } catch (e) {
      }
    }

    this.pty = pty.spawn(shell, args, options)

    if (this.connection.is_over_ssh) {
      // TODO 如果是 ssh，需要去检查 ssh 的连接是否断开。
      this.pty.write(`${parseSSHCommand(this.connection)}\r`)
    }

    // 默认使用配置中的 default command
    const command = this.connection.command || config.get('command_default')
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

  /**
   * terminal 清空当前行
   */
  clearLine () {
    if (!is.windows) {
      // 执行 ctrl+u
      this.pty.write('\x15')
    }

    // windows 似乎沒有这样的命令
  }
}

module.exports = {
  Pty,
}
