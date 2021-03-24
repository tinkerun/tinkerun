const lernaJson = require('../lerna.json')

module.exports = {
  productName: 'Tinkerun',
  synopsis: 'A new way to run code. Whether you’re Laravel artisan or not.',
  description: 'An application that lets you run and manage your Tinker code either locally or via SSH.',
  githubOrg: 'tinkerun',
  githubRepo: 'tinkerun',
  version: lernaJson.version,
}