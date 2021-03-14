const {EventEmitter} = require('events')

const {getStringBetween} = require('../utils/getStringBetween')

class PtyEvent {
  constructor() {
    this.event = new EventEmitter()

    // 标记进程执行完毕
    this.prompt = ''

    // 存储正在执行的代码
    this.code = ''

    this.res = ''
    this.connected = false
  }

  handlePtyData(data) {
    this.event.emit('data', data)

    this.res += data

    if (!this.connected && data.startsWith(this.prompt)) {
      this.connected = true
      this.event.emit('connected')
      this.res = ''
    }

    if (this.res.indexOf(this.prompt) >= 0) {
      if (this.code) {
        // 输入的代码拆分成片段
        const snippets = this.code.split('\n').filter(v => !!v.trim())
        // 提取最后一段代码和提示符之间的数据
        const res = getStringBetween(this.res, `${snippets[snippets.length - 1]}\r\n`, `\r\n${this.prompt}`)
        // 触发已执行事件
        this.event.emit('executed', res)
        // 重置代码
        this.code = ''
      }
      // 重置 res
      this.res = ''
    }
  }

  /**
   * terminal 模式下返回全部数据
   *
   * @param {function} cb
   */
  onData(cb) {
    this.event.on('data', cb)
    return {
      dispose: () => this.event.off('data', cb)
    }
  }

  /**
   * 代码已经执行
   *
   * @param {function} cb
   */
  onExecuted(cb) {
    this.event.on('executed', cb)
    return {
      dispose: () => this.event.off('executed', cb)
    }
  }

  /**
   * 已连接
   *
   * @param {function} cb
   */
  onConnected(cb) {
    this.event.once('connected', cb)
  }
}

module.exports = {
  PtyEvent,
}