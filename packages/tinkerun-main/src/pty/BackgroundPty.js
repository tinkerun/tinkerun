const escapeRegExp = require('lodash/escapeRegExp')

const {Pty} = require('./Pty')

class BackgroundPty extends Pty {
  jsonEncode (code) {
    return `json_encode((${code})())`
  }

  jsonResult (code) {
    return new Promise(resolve => {
      this.input(`${this.jsonEncode(code)}\r`)

      let result = ''
      const onData = this.onData(data => {
        result += data

        if (result.endsWith('>>> ')) {
          const prefix = escapeRegExp('\u001b[32m')
          const suffix = escapeRegExp('\u001b[39m')

          const reg = new RegExp(`${prefix}(.+)${suffix}`)
          const res = reg.exec(result)

          onData.dispose()

          resolve(res[1])
        }
      })
    })
  }
}

module.exports = {
  BackgroundPty,
}
