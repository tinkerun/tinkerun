const electronBuilder = require('electron-builder')
const rimraf = require('rimraf')
const path = require('path')

const electronBuilderConfig = require('./electronBuilderConfig')

const PLATFORM_MAP = {
  darwin: 'mac',
  linux: 'linux',
  win32: 'win',
}

const pkg = () => {
  const config = electronBuilderConfig
  const targetPlatform = PLATFORM_MAP[process.platform]

  const target = process.env.BUILD_TARGETS
    ? process.env.BUILD_TARGETS.split(',')
    : config[targetPlatform].target

  return electronBuilder.build({
    config,
    [targetPlatform]: target,
  })
}

const emptyDir = async dir => {
  return new Promise((resolve, reject) => {
    rimraf(dir, err => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

module.exports.start = async () => {
  console.log('[package] Removing existing directories')
  await emptyDir(path.join(__dirname, '../build/**/*'))
  console.log('[package] Packaging app')
  await pkg()
  console.log('[package] Complete!')
}

if (require.main === module) {
  process.nextTick(async () => {
    try {
      await module.exports.start()
    } catch ( err ) {
      console.error('[package] ERROR:', err)
      process.exit(1)
    }
  })
}
