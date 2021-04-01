const {app, Menu, shell} = require('electron')
const {
  is,
  appMenu,
  openUrlMenuItem,
  openNewGitHubIssue,
  debugInfo,
} = require('electron-util')

const {config} = require('./database/config')
const {getIntl} = require('./locale')
const {createPreferenceWindow} = require('./createPreferenceWindow')

const showPreferences = () => {
  createPreferenceWindow()
}

const helpSubmenu = [
  openUrlMenuItem({
    label: getIntl().formatMessage({id: 'menu.website'}),
    url: 'https://github.com/tinkerun/tinkerun',
  }),
  openUrlMenuItem({
    label: getIntl().formatMessage({id: 'menu.source_code'}),
    url: 'https://github.com/tinkerun/tinkerun',
  }),
  {
    label: getIntl().formatMessage({id: 'menu.report_an_issue'}),
    click () {
      const body = `
<!-- Please succinctly describe your issue and steps to reproduce it. -->


---

${debugInfo()}`

      openNewGitHubIssue({
        user: 'tinkerun',
        repo: 'tinkerun',
        body,
      })
    },
  },
]

const debugSubmenu = [
  {
    label: getIntl().formatMessage({id: 'menu.show_settings'}),
    click () {
      config.openInEditor()
    },
  },
  {
    label: getIntl().formatMessage({id: 'menu.show_app_data'}),
    click () {
      return shell.openPath(app.getPath('userData'))
    },
  },
  {
    type: 'separator',
  },
  {
    label: getIntl().formatMessage({id: 'menu.delete_settings'}),
    click () {
      config.clear()
      app.relaunch()
      app.quit()
    },
  },
  {
    label: getIntl().formatMessage({id: 'menu.delete_app_data'}),
    click () {
      shell.moveItemToTrash(app.getPath('userData'))
      app.relaunch()
      app.quit()
    },
  },
]

const macosTemplate = [
  appMenu([
    {
      label: getIntl().formatMessage({id: 'menu.preferences'}),
      accelerator: 'Command+,',
      click () {
        showPreferences()
      },
    },
  ]),
  {
    role: 'fileMenu',
    submenu: [
      {
        role: 'close',
      },
    ],
  },
  {
    role: 'editMenu',
  },
  {
    role: 'viewMenu',
  },
  {
    role: 'windowMenu',
  },
  {
    role: 'help',
    submenu: helpSubmenu,
  },
]

// Linux and Windows
const otherTemplate = [
  {
    role: 'fileMenu',
    submenu: [
      {
        label: getIntl().formatMessage({id: 'menu.settings'}),
        accelerator: 'Control+,',
        click () {
          showPreferences()
        },
      },
      {
        type: 'separator',
      },
      {
        role: 'quit',
      },
    ],
  },
  {
    role: 'editMenu',
  },
  {
    role: 'viewMenu',
  },
  {
    role: 'help',
    submenu: helpSubmenu,
  },
]

const template = process.platform === 'darwin' ? macosTemplate : otherTemplate

if (is.development) {
  template.push({
    label: getIntl().formatMessage({id: 'menu.debug'}),
    submenu: debugSubmenu,
  })
}

const menu = Menu.buildFromTemplate(template)

module.exports = {
  menu,
}
