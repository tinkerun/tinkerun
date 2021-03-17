const {Pty} = require('./Pty')

class PsySH extends Pty {
  constructor (connection) {
    super(connection)

    // 默认执行使用 laravel 的 tinker 命令
    this.commandDefault = 'php artisan tinker'
  }
}

module.exports = {
  PsySH,
}
