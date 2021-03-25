const path = require('path')

const config = require('./config')

const mainPkg = path.join(__dirname, '../packages/tinkerun-main')
const rendererPkg = path.join(__dirname, '../packages/tinkerun-renderer')
const assetsDir = path.join(__dirname, '../assets')

module.exports = {
  appId: 'com.tinkerun.app',
  productName: config.productName,
  copyright: `Copyright © ${new Date().getFullYear()} billyct`,

  extraMetadata: {
    name: config.productName,
    description: config.description,
    homepage: `https://github.com/${config.githubOrg}/${config.githubOrg}`,
    author: {
      name: 'billyct',
      email: 'billyct2012@gmail.com',
    },
    repository: {
      url: `https://github.com/${config.githubOrg}/${config.githubOrg}`,
    },
    version: config.version,
  },

  directories: {
    buildResources: assetsDir,
    app: mainPkg,
    output: 'build',
  },
  mac: {
    category: 'public.app-category.developer-tools',
    electronLanguages: ['en', 'zh', 'zh-CN'],
    target: [
      'dmg',
      'zip',
    ],
  },
  dmg: {
    window: {
      width: 540,
      height: 380,
    },
    contents: [
      {
        x: 130,
        y: 186,
      },
      {
        x: 409,
        y: 186,
        type: 'link',
        path: '/Applications',
      },
    ],
  },
  win: {
    target: [
      'squirrel',
      'portable',
    ],
  },
  linux: {
    synopsis: config.synopsis,
    category: 'Development',
    icon: 'icon.icns',
    target: [
      'AppImage',
      'deb',
      'tar.gz',
      'rpm',
      'snap'
    ],
  },
  files: [
    '!**/*',
    {from: mainPkg, filter: ['package.json']},
    {from: path.join(mainPkg, 'node_modules/node-pty/build/'), to: 'main/build'},
    {from: path.join(mainPkg, 'build'), to: 'main', filter: ['!build/']},
    {from: path.join(rendererPkg, 'build'), to: 'renderer'},
  ],
  electronDownload: {
    mirror: process.env.ELECTRON_MIRROR,
  },
}