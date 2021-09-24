const escapeRegExp = require('lodash/escapeRegExp')

const {Pty} = require('./Pty')

class BackgroundPty extends Pty {
  jsonEncode (code) {
    return `json_encode((${code})())`
  }

  jsonResult (code) {
    return new Promise((resolve, reject) => {
      this.input(`${this.jsonEncode(code)}\r`)

      let result = ''
      const onData = this.onData(data => {
        result += data

        const timer = setTimeout(() => {
          reject(new Error('Timeout, try to reconnect!'))
        }, 5000)

        if (result.endsWith('>>> ')) {
          let res = /=> "(.+)"/.exec(result)

          if (result.indexOf('\u001b[32m') !== -1) {
            const prefix = escapeRegExp('\u001b[32m')
            const suffix = escapeRegExp('\u001b[39m')

            const reg = new RegExp(`${prefix}(.+)${suffix}`)
            res = reg.exec(result)
          }

          onData.dispose()

          clearTimeout(timer)

          if (!res) {
            reject(new Error(result))
            return
          }

          resolve(res[1])
        }
      })
    })
  }
}

module.exports = {
  BackgroundPty,
}
