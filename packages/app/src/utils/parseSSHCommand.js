/**
 * parse ssh command string via connection
 *
 * @param {Object} connection
 * @returns {string}
 */
const parseSSHCommand = connection => {
  const args = [
    'ssh',
  ]

  if (connection.ssh_port) {
    args.push(`-p${connection.ssh_port}`)
  }

  if (connection.ssh_key) {
    args.push(`-i${connection.ssh_key}`)
  }

  args.push(`${connection.ssh_user}@${connection.ssh_server}`)

  if (connection.path) {
    args.push(`-t 'cd ${connection.path};bash --login'`)
  }

  return args.join(' ')
}

module.exports = {
  parseSSHCommand,
}
