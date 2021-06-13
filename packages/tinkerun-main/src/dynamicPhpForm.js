const isString = require('lodash/isString')
const trim = require('lodash/trim')
const set = require('lodash/set')
const {instance} = require('php-form')

const {getBackgroundPtyProcess} = require('./processes')
const {getFormPrefix} = require('./services/config')

class DynamicPhpForm {
  /**
   * @param {PHPForm} phpForm
   */
  constructor (phpForm) {
    this.phpForm = phpForm
  }

  /**
   * @param {string} connectionId
   * @param {string} code
   * @return {Promise<PHPFormField[]>}
   */
  async parse (connectionId, code) {
    const fields = await this.phpForm.parse(code)

    for (let i = 0; i < fields.length; i++) {
      const keys = Object.keys(fields[i])

      for (let j = 0; j < keys.length; j++) {
        const value = fields[i][keys[j]]
        if (isString(value) && value.match(/^(function|fn)/)) {
          const pty = getBackgroundPtyProcess(connectionId)
          const res = await pty.jsonResult(value)

          set(fields, [i, keys[j]], this.parseJsonResult(res))
        }
      }
    }

    return fields
  }

  /**
   * @param {string} jsonString
   * @return {any}
   */
  parseJsonResult (jsonString) {
    try {
      let res = JSON.parse(jsonString)
      if (isString(res)) {
        res = trim(res, '"')
      }

      return res
    } catch (e) {
      return ''
    }
  }

  /**
   * @param {PHPFormField[]} fields
   * @return {Promise<string>}
   */
  stringify (fields) {
    return this.phpForm.stringify(fields)
  }

  /**
   * @return {Promise<DynamicPhpForm>}
   */
  static async instance () {
    if (!DynamicPhpForm.dynamicPhpForm) {
      const phpForm = await instance(getFormPrefix())
      DynamicPhpForm.dynamicPhpForm = new DynamicPhpForm(phpForm)
    }

    return DynamicPhpForm.dynamicPhpForm
  }
}

DynamicPhpForm.dynamicPhpForm = null

module.exports = {
  DynamicPhpForm,
}
