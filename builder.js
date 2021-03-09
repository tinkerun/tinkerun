const path = require('path')

const appPkg = path.join(__dirname, 'packages/app')
const webPkg = path.join(__dirname, 'packages/web')

module.exports = {
  productName: 'Tinkerun',
  copyright: 'Copyright © 2021 billyct',
  compression: 'store',
  directories: {
    app: appPkg,
    output: 'build',
  },
  mac:{
    electronLanguages: ['en', 'zh'],
  },
  files: [
    '!**/*',
    {from: appPkg, filter: ['package.json']},
    {from: path.join(appPkg, 'node_modules/node-pty'), to: 'node_modules/node-pty'},
    {from: path.join(appPkg, 'build'), to: 'main'},
    {from: path.join(webPkg, 'build'), to: 'renderer'},
  ],
  electronDownload: {
    mirror: process.env.ELECTRON_MIRROR,
  },
}