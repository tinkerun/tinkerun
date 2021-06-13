const {DynamicPhpForm} = require('../dynamicPhpForm')

const parsePhpForm = async (connectionId, code) => {
  const form = await DynamicPhpForm.instance()
  return form.parse(connectionId, code)
}

const stringifyPhpForm = async fields => {
  const form = await DynamicPhpForm.instance()
  return form.stringify(fields)
}

module.exports = {
  parsePhpForm,
  stringifyPhpForm,
}
