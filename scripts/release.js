const path = require('path')
const fs = require('fs')
const glob = require('fast-glob')
const {Octokit} = require('@octokit/rest')

const config = require('./config')

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
})

const getOrCreateRelease = async version => {
  const tag = `v${version}`
  const releaseName = `${config.productName} ${version} 📦`

  try {
    return await octokit.repos.getReleaseByTag({
      owner: config.githubOrg,
      repo: config.githubRepo,
      tag,
    })
  } catch ( err ) {
    // Doesn't exist
  }

  return octokit.repos.createRelease({
    owner: config.githubOrg,
    repo: config.githubRepo,
    tag_name: tag,
    name: releaseName,
    body: `Full changelog ⇒ https://tinke.run/changelog`,
    draft: false,
    prerelease: true,
  })
}

const start = async () => {
  const version = config.version

  console.log(`[release] Creating release for ${version}`)

  // globs should only use forward slash, so force use of path.posix
  const distGlob = ext => path.posix.join('build', '**', `*${ext}`)

  const assetGlobs = {
    darwin: [
      distGlob('.zip'),
      distGlob('.dmg'),
      path.posix.join('build/latest-mac.yml'),
    ],
    win32: [path.posix.join('build', 'squirrel-windows', '*'), path.posix.join('build', '*.exe')],
    linux: [
      distGlob('.snap'),
      distGlob('.rpm'),
      distGlob('.deb'),
      distGlob('.AppImage'),
      distGlob('.tar.gz'),
    ],
  }

  const paths = await glob(assetGlobs[process.platform])

  const {data} = await getOrCreateRelease(version)

  for (const p of paths) {
    const name = path.basename(p)

    console.log(`[release] Uploading ${name}`)
    await octokit.request({
      method: 'POST',
      url: 'https://uploads.github.com/repos/:owner/:repo/releases/:id/assets{?name,label}"',
      id: data.id,
      name: name,
      owner: config.githubOrg,
      repo: config.githubRepo,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      data: fs.readFileSync(p),
    })
  }

  console.log(`[release] Release created ${data.url}`)
}

if (require.main === module) {
  process.nextTick(async () => {
    try {
      await start()
    } catch ( err ) {
      console.log('[release] ERROR:', err)
      process.exit(1)
    }
  })
}
