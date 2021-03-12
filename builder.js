const path = require('path')

const appPkg = path.join(__dirname, 'packages/app')
const webPkg = path.join(__dirname, 'packages/web')
const assetsDir = path.join(__dirname, 'assets')

module.exports = {
  appId: 'com.tinkerun.Tinkerun',
  productName: 'Tinkerun',
  copyright: 'Copyright © 2021 billyct',

  extraMetadata: {
    name: 'Tinkerun',
    description: 'An application that lets you run code within your favorite PHP application - either locally or via SSH.',
    homepage: 'https://github.com/tinkerun/tinkerun',
    author: {
      name: 'billyct',
      email: 'billyct2012@gmail.com',
    },
    repository:{
      url: 'https://github.com/tinkerun/tinkerun',
    },
  },

  directories: {
    buildResources: assetsDir,
    app: appPkg,
    output: 'build',
  },
  mac: {
    category: 'public.app-category.developer-tools',
    icon: path.join(assetsDir, 'icons/mac/icon.icns'),
    electronLanguages: ['en', 'zh', 'zh-CN'],
    target: 'zip',
  },
  files: [
    '!**/*',
    {from: appPkg, filter: ['package.json']},
    {from: path.join(appPkg, 'node_modules/node-pty/build/'), to: 'main/build'},
    {from: path.join(appPkg, 'build'), to: 'main', filter: ['!build/']},
    {from: path.join(webPkg, 'build'), to: 'renderer'},
  ],
  electronDownload: {
    mirror: process.env.ELECTRON_MIRROR,
  },
}