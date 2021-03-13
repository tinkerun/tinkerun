const {Pty} = require('./Pty')

class PsySH extends Pty {
  constructor (connection) {
    super(connection)

    // PsySH 的默认提示
    // https://github.com/bobthecow/psysh/blob/main/src/Shell.php#L53
    this.prompt = '>>>'

    // 默认执行使用 laravel 的 tinker 命令
    this.commandDeafult = 'php artisan tinker'
  }
}

module.exports = {
  PsySH,
}
